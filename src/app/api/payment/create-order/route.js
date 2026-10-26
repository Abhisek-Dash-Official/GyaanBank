import connectDB from "@/lib/db";
import { Resource } from "@/models/Resource";
import { Transaction } from "@/models/Transaction";
import { User } from "@/models/User";
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
        User;
        const { resourceId } = await req.json();

        const resource = await Resource.findById(resourceId).populate("creator");
        if (!resource) return NextResponse.json({ error: "Resource not found" }, { status: 404 });
        if (resource.price === 0) return NextResponse.json({ error: "This resource is free" }, { status: 400 });

        if (!resource.creator.razorpayAccountId) {
            return NextResponse.json({ error: "Creator has not set up their bank account for payouts yet" }, { status: 400 });
        }

        const existingTransaction = await Transaction.findOne({
            buyerId: session.user.id,
            resourceId: resourceId,
            status: "completed"
        });
        if (existingTransaction) {
            return NextResponse.json({ error: "Already purchased" }, { status: 400 });
        }

        const totalAmountPaise = resource.price * 100;
        const platformFeePaise = Math.floor(totalAmountPaise * 0.10);
        const creatorSharePaise = totalAmountPaise - platformFeePaise;

        const order = await razorpay.orders.create({
            amount: totalAmountPaise,
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
            transfers: [
                {
                    account: resource.creator.razorpayAccountId,
                    amount: creatorSharePaise,
                    currency: "INR",
                    notes: {
                        resource_title: resource.title
                    }
                }
            ]
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
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}