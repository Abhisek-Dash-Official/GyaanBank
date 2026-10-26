import connectDB from "@/lib/db";
import { Resource } from "@/models/Resource";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { title, desc, category, subject, externalLink, price } = body;

        if (!title || !desc || !category || !subject || !externalLink) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        await connectDB();
        const user = await User.findById(session.user.id);

        if (price > 0 && !user.razorpayAccountId) {
            return NextResponse.json(
                { error: "Please set up your bank account (Payouts) before creating a paid resource." },
                { status: 400 }
            );
        }

        const newResource = await Resource.create({
            title,
            desc,
            category,
            subject,
            externalLink,
            price,
            creator: session.user.id,
        });

        return NextResponse.json(
            { message: "Resource uploaded successfully", resource: newResource },
            { status: 201 }
        );

    } catch (error) {
        console.error("Resource Upload Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = req.nextUrl;
        const search = searchParams.get("search");
        const category = searchParams.get("category");
        const subject = searchParams.get("subject");
        const priceType = searchParams.get("priceType"); // 'free' or 'paid'
        const sortBy = searchParams.get("sortBy") || "latest"; // 'latest', 'oldest', 'price-asc', 'price-desc'

        const limit = parseInt(searchParams.get("limit")) || 10;
        const cursor = searchParams.get("cursor");

        let query = {};

        if (category) query.category = category;
        if (subject) query.subject = { $regex: subject, $options: "i" };

        if (priceType === "free") query.price = 0;
        else if (priceType === "paid") query.price = { $gt: 0 };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { desc: { $regex: search, $options: "i" } },
                { subject: { $regex: search, $options: "i" } }
            ];
        }

        let sortOption = { createdAt: -1, _id: -1 };

        if (cursor) {
            if (sortBy === "oldest") {
                query.createdAt = { $gt: new Date(cursor) };
                sortOption = { createdAt: 1, _id: 1 };
            } else {
                query.createdAt = { $lt: new Date(cursor) };
            }
        }

        if (sortBy === "oldest") sortOption = { createdAt: 1, _id: 1 };
        else if (sortBy === "price-asc") sortOption = { price: 1, _id: 1 };
        else if (sortBy === "price-desc") sortOption = { price: -1, _id: -1 };

        const resources = await Resource.find(query)
            .select("-externalLink")
            .sort(sortOption)
            .limit(limit + 1);

        let hasMore = false;
        if (resources.length > limit) {
            hasMore = true;
            resources.pop();
        }

        const nextCursor = resources.length > 0 ? resources[resources.length - 1].createdAt : null;

        return NextResponse.json({
            success: true,
            hasMore,
            nextCursor,
            resources
        }, { status: 200 });

    } catch (error) {
        console.error("Fetch Resources Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}