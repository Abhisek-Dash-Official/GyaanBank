import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['School', 'College', 'University', 'Research', 'Office', 'Competitive Exams', 'Engineering']
    },
    subject: {
        type: String,
        required: true,
    },
    externalLink: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        default: 0
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

export const Resource = mongoose.models.Resource || mongoose.model("Resource", resourceSchema);