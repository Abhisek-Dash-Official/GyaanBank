import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) return NextResponse.json(
            { error: 'Name, email and password are required fields.' },
            { status: 400 }
        );

        await connectDB();

        const existingUser = await User.findOne({ email });

        if (existingUser) return NextResponse.json(
            { error: 'User already exists.' },
            { status: 400 }
        );

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            hash_password: hashedPassword,
            role: 'user'
        });

        return NextResponse.json(
            { message: 'User created successfully.' },
            { status: 201 }
        );
    } catch (error) {
        console.error("Signup Error:", error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}