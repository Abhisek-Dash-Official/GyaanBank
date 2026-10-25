import connectDB from "@/lib/db";
import { Resource } from "@/models/Resource";
import { Transaction } from "@/models/Transaction";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const session = await getServerSession(authOptions);

        const resource = await Resource.findById(id).populate("creator", "name email").lean();

        if (!resource) {
            return NextResponse.json({ error: "Resource not found" }, { status: 404 });
        }

        let canViewLink = false;

        if (resource.price === 0) {
            canViewLink = true;
        } else if (session) {
            if (resource.creator._id.toString() === session.user.id) {
                canViewLink = true;
            } else {
                const hasBought = await Transaction.findOne({
                    resourceId: id,
                    buyerId: session.user.id,
                    status: "completed"
                });
                if (hasBought) canViewLink = true;
            }
        }

        if (!canViewLink) {
            delete resource.externalLink;
        }

        return NextResponse.json({ success: true, resource }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await connectDB();
        const { id } = await params;
        const body = await req.json();

        const resource = await Resource.findById(id);
        if (!resource) return NextResponse.json({ error: "Resource not found" }, { status: 404 });

        if (resource.creator.toString() !== session.user.id) {
            return NextResponse.json({ error: "Forbidden: You can only edit your own resources" }, { status: 403 });
        }

        const updatedResource = await Resource.findByIdAndUpdate(id, body, { new: true });

        return NextResponse.json({ success: true, resource: updatedResource }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await connectDB();
        const { id } = await params;

        const resource = await Resource.findById(id);
        if (!resource) return NextResponse.json({ error: "Resource not found" }, { status: 404 });

        if (resource.creator.toString() !== session.user.id && session.user.role !== "admin") {
            return NextResponse.json({ error: "Forbidden: You can only delete your own resources" }, { status: 403 });
        }

        await Resource.findByIdAndDelete(id);

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}