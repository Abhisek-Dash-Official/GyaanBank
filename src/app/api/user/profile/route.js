import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcryptjs";

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const user = await User.findById(session.user.id).select("-hash_password");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, user }, { status: 200 });

    } catch (error) {
        console.error("Profile Fetch Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const body = await req.json();

        const { name, oldPassword, newPassword } = body;

        let updateFields = {};

        if (name) updateFields.name = name;

        if (newPassword) {
            if (newPassword.length < 6) {
                return NextResponse.json({ error: "New password must be at least 6 characters long" }, { status: 400 });
            }
            if (!oldPassword) {
                return NextResponse.json({ error: "Old password is required to change password" }, { status: 400 });
            }

            const user = await User.findById(session.user.id);
            const isMatch = await bcrypt.compare(oldPassword, user.hash_password);

            if (!isMatch) {
                return NextResponse.json({ error: "Incorrect old password" }, { status: 400 });
            }

            const salt = await bcrypt.genSalt(10);
            updateFields.hash_password = await bcrypt.hash(newPassword, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            session.user.id,
            { $set: updateFields },
            { new: true }
        ).select("-hash_password");

        return NextResponse.json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        }, { status: 200 });

    } catch (error) {
        console.error("Profile Update Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}