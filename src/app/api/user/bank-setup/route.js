import connectDB from "@/lib/db";
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
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { accountNumber, ifsc, accountName, email, pan } = body;

        if (!accountNumber || !ifsc || !accountName || !email || !pan) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        let accountIdToSave = "";

        try {
            const linkedAccount = await razorpay.accounts.create({
                type: "route",
                name: accountName,
                email: email,
                legal_business_name: accountName,
                business_type: "individual",
                contact_name: accountName,
                profile: {
                    category: "education",
                    subcategory: "educational_services"
                },
                legal_info: {
                    pan: pan
                },
                bank_account: {
                    ifsc_code: ifsc,
                    beneficiary_name: accountName,
                    account_number: accountNumber
                }
            });
            accountIdToSave = linkedAccount.id;

        } catch (rzpError) {
            console.error("Razorpay Error:", rzpError);
            return NextResponse.json({ error: "Razorpay Account Creation Failed", details: rzpError }, { status: 400 });
        }

        await connectDB();

        await User.findByIdAndUpdate(
            session.user.id,
            { razorpayAccountId: accountIdToSave },
            { returnDocument: 'after' }
        );

        return NextResponse.json({ success: true, message: "Bank account linked successfully" }, { status: 200 });

    } catch (error) {
        console.error("Bank Setup Catch Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}