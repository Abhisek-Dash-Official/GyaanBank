import connectDB from "@/lib/db";
import { Resource } from "@/models/Resource";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const myUploads = await Resource.find({ creator: session.user.id })
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, resources: myUploads }, { status: 200 });

    } catch (error) {
        console.error("Fetch My Uploads Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}