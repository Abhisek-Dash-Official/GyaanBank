"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { ChevronDownIcon } from "@/components/Icons";

export default function UploadPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        category: "College",
        subject: "",
        externalLink: "",
        price: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.price < 0) {
            toast.error("Price cannot be negative");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/resources", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.status === 400 && data.error.includes("bank account")) {
                toast.error("Please set up your bank account first to upload paid resources.");
                router.push("/bank-setup");
            } else if (data.message) {
                toast.success("Resource uploaded successfully!");
                router.push(`/resource/${data.resource._id}`);
            } else {
                toast.error(data.error || "Failed to upload resource");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Upload Resource</h1>
                        <p className="mt-1 text-sm text-slate-600">Share your knowledge and start earning.</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <Link
                            href="/bank-setup"
                            className="text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors"
                        >
                            Payout Settings
                        </Link>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-md shadow-sm p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                Resource Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="E.g., Complete Notes on Data Structures"
                                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                            />
                        </div>
                        <div>
                            <label htmlFor="desc" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                Description
                            </label>
                            <textarea
                                id="desc"
                                name="desc"
                                required
                                rows="4"
                                value={formData.desc}
                                onChange={handleChange}
                                placeholder="Describe what is included in this resource..."
                                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 resize-none"
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="category" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                    Category
                                </label>
                                <div className="relative">
                                    <select
                                        id="category"
                                        name="category"
                                        required
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm appearance-none focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 bg-white"
                                    >
                                        <option value="School">School</option>
                                        <option value="College">College</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="University">University</option>
                                        <option value="Research">Research</option>
                                        <option value="Office">Office</option>
                                        <option value="Competitive Exams">Competitive Exams</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                        <ChevronDownIcon />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                    Subject / Topic
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="E.g., Computer Science, Physics..."
                                    className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="externalLink" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                Document Link (Google Drive, Dropbox, etc.)
                            </label>
                            <input
                                type="url"
                                id="externalLink"
                                name="externalLink"
                                required
                                value={formData.externalLink}
                                onChange={handleChange}
                                placeholder="https://drive.google.com/..."
                                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                            />
                            <p className="mt-1 text-xs text-slate-500">
                                Ensure the link permissions are set to "Anyone with the link can view".
                            </p>
                        </div>

                        <div className="p-5 bg-slate-50 border border-slate-200 rounded-md">
                            <label htmlFor="price" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                Price (₹)
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    min="0"
                                    required
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-32 border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                                />
                                <span className="text-sm text-slate-600 font-medium">
                                    {formData.price === 0 || formData.price === "0" ? "Free Resource" : "Paid Resource"}
                                </span>
                            </div>
                            <p className="mt-2 text-xs text-slate-500">
                                Set price to 0 to make it free. You earn 90% of the listed price on paid resources.
                            </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? "Publishing..." : "Publish Resource"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}