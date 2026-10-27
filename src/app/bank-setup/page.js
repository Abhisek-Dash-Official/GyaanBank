"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { ArrowLeftIcon } from "@/components/Icons";

export default function BankSetupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        accountName: "",
        accountNumber: "",
        ifsc: "",
        pan: "",
        email: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/user/bank-setup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Bank account linked successfully!");
                router.push("/upload");
            } else {
                toast.error(data.error || "Failed to link bank account");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <div className="w-full max-w-lg">
                <div className="mb-6">
                    <Link href="/upload" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-700 transition-colors">
                        <ArrowLeftIcon className="w-4 h-4" />
                        Back to Uploads
                    </Link>
                </div>

                <div className="bg-white border border-slate-200 rounded-md shadow-sm p-6 sm:p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Payout Setup</h1>
                        <p className="mt-2 text-sm text-slate-600">
                            Connect your bank account to receive 90% of your resource sales automatically. Powered by Razorpay Route.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="accountName" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                Account Holder Name
                            </label>
                            <input
                                type="text"
                                id="accountName"
                                name="accountName"
                                required
                                value={formData.accountName}
                                onChange={handleChange}
                                placeholder="As per bank records"
                                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                            />
                        </div>

                        <div>
                            <label htmlFor="pan" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                PAN Number
                            </label>
                            <input
                                type="text"
                                id="pan"
                                name="pan"
                                required
                                maxLength="10"
                                value={formData.pan}
                                onChange={handleChange}
                                placeholder="ABCDE1234F"
                                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm uppercase focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                            />
                        </div>

                        <div>
                            <label htmlFor="accountNumber" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                Account Number
                            </label>
                            <input
                                type="password"
                                id="accountNumber"
                                name="accountNumber"
                                required
                                value={formData.accountNumber}
                                onChange={handleChange}
                                placeholder="Enter account number"
                                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                            />
                        </div>

                        <div>
                            <label htmlFor="ifsc" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                IFSC Code
                            </label>
                            <input
                                type="text"
                                id="ifsc"
                                name="ifsc"
                                required
                                value={formData.ifsc}
                                onChange={handleChange}
                                placeholder="E.g., SBIN0001234"
                                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm uppercase focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                            />
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5 px-4 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? "Verifying & Linking..." : "Securely Link Account"}
                            </button>
                        </div>

                        <p className="text-xs text-slate-500 text-center mt-4">
                            Your details are securely processed directly by Razorpay. We do not store your bank account numbers on our servers.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}