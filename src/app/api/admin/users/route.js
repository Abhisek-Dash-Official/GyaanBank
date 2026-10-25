import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
        }

        await connectDB();

        const { searchParams } = req.nextUrl;
        const limit = parseInt(searchParams.get("limit")) || 10;
        const cursor = searchParams.get("cursor");

        let query = {};

        if (cursor) {
            query.createdAt = { $lt: new Date(cursor) };
        }

        const users = await User.find(query)
            .select("-password")
            .sort({ createdAt: -1, _id: -1 })
            .limit(limit + 1);

        let hasMore = false;
        if (users.length > limit) {
            hasMore = true;
            users.pop();
        }

        const nextCursor = users.length > 0 ? users[users.length - 1].createdAt : null;

        return NextResponse.json({
            success: true,
            hasMore,
            nextCursor,
            users
        }, { status: 200 });

    } catch (error) {
        console.error("Admin Fetch Users Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}