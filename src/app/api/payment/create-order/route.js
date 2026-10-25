import connectDB from "@/lib/db";
import { Resource } from "@/models/Resource";
import { Transaction } from "@/models/Transaction";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await connectDB();
        const { resourceId } = await req.json();

        const resource = await Resource.findById(resourceId);
        if (!resource) return NextResponse.json({ error: "Resource not found" }, { status: 404 });
        if (resource.price === 0) return NextResponse.json({ error: "This resource is free" }, { status: 400 });

        const existingTransaction = await Transaction.findOne({
            buyerId: session.user.id,
            resourceId: resourceId,
            status: "completed"
        });
        if (existingTransaction) {
            return NextResponse.json({ error: "Already purchased" }, { status: 400 });
        }

        const order = await razorpay.orders.create({
            amount: resource.price * 100,
            currency: "INR",
            receipt: `rcpt_${Date.now()}`
        });

        await Transaction.create({
            buyerId: session.user.id,
            resourceId: resourceId,
            razorpayOrderId: order.id,
            amount: resource.price,
            status: "pending"
        });

        return NextResponse.json({ success: true, order }, { status: 200 });

    } catch (error) {
        console.error("Create Order Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}