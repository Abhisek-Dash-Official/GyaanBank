import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { Resource } from "@/models/Resource";
import { Transaction } from "@/models/Transaction";
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

        const totalUsers = await User.countDocuments();
        const totalResources = await Resource.countDocuments();
        const totalTransactions = await Transaction.countDocuments({ status: "completed" });

        const revenueAggregation = await Transaction.aggregate([
            { $match: { status: "completed" } },
            { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
        ]);

        const totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].totalRevenue : 0;

        return NextResponse.json({
            success: true,
            statistics: {
                totalUsers,
                totalResources,
                totalTransactions,
                totalRevenue
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Admin Dashboard Stats Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}