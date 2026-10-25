import connectDB from "@/lib/db";
import { Transaction } from "@/models/Transaction";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
    try {
        await connectDB();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
        }

        await Transaction.findOneAndUpdate(
            { razorpayOrderId: razorpay_order_id },
            {
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: razorpay_signature,
                status: "completed"
            }
        );

        return NextResponse.json({ success: true, message: "Payment verified successfully" }, { status: 200 });

    } catch (error) {
        console.error("Verify Payment Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}