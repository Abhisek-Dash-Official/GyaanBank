import connectDB from "@/lib/db";
import { Transaction } from "@/models/Transaction";
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

        const purchases = await Transaction.find({
            buyerId: session.user.id,
            status: "completed"
        })
            .populate("resourceId")
            .sort({ createdAt: -1 });

        const purchasedResources = purchases.map(t => t.resourceId).filter(r => r !== null);

        return NextResponse.json({ success: true, resources: purchasedResources }, { status: 200 });

    } catch (error) {
        console.error("Fetch Purchases Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}