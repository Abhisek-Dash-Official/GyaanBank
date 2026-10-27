"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

export default function ProfilePage() {
    const { data: session, status, update } = useSession();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [hasBankSetup, setHasBankSetup] = useState(false);

    const [formData, setFormData] = useState({
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        oldPassword: "",
        newPassword: "",
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated") {
            setFormData((prev) => ({
                ...prev,
                name: session.user.name || prev.name,
                email: session.user.email || prev.email,
            }));
            fetchProfile();
        }
    }, [status, router, session]);

    const fetchProfile = async () => {
        try {
            const res = await fetch("/api/user/profile");
            const data = await res.json();

            if (data.success) {
                setFormData((prev) => ({
                    ...prev,
                    name: data.user.name || "",
                    email: data.user.email || "",
                }));

                setHasBankSetup(!!data.user.razorpayAccountId);
            } else {
                toast.error("Failed to load profile");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        const payload = {};
        if (formData.name) payload.name = formData.name;
        if (formData.newPassword) {
            payload.oldPassword = formData.oldPassword;
            payload.newPassword = formData.newPassword;
        }

        try {
            const res = await fetch("/api/user/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Profile updated successfully!");

                await update({ name: formData.name });

                setFormData((prev) => ({
                    ...prev,
                    oldPassword: "",
                    newPassword: "",
                }));
            } else {
                toast.error(data.error || "Failed to update profile");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setSaving(false);
        }
    };

    if (loading || status === "loading") {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <span className="text-slate-500 font-medium">Loading profile...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Account & Settings</h1>
                    <p className="mt-2 text-sm text-slate-600">Update your personal information, security, and payout settings.</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-md shadow-sm">

                    {/* Payout & Bank Settings Banner */}
                    <div className="p-6 sm:p-8 border-b border-slate-200 bg-slate-50 rounded-t-md">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Payout Settings</h2>
                        {hasBankSetup ? (
                            <div className="bg-green-50 border border-green-200 rounded-md p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 shrink-0 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-green-900">Bank Account Linked</p>
                                        <p className="text-xs text-green-700 mt-0.5">Your Razorpay Route account is active. You can sell paid resources.</p>
                                    </div>
                                </div>
                                <Link href="/bank-setup" className="shrink-0 text-xs font-semibold text-green-800 bg-green-100 hover:bg-green-200 px-4 py-2 rounded transition-colors text-center">
                                    Update Details
                                </Link>
                            </div>
                        ) : (
                            <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 shrink-0 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-amber-900">Action Required: Setup Payouts</p>
                                        <p className="text-xs text-amber-700 mt-0.5">You must link a bank account before you can sell paid resources.</p>
                                    </div>
                                </div>
                                <Link href="/bank-setup" className="shrink-0 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded transition-colors text-center">
                                    Setup Now
                                </Link>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit}>

                        {/* General Information */}
                        <div className="p-6 sm:p-8 border-b border-slate-200">
                            <h2 className="text-lg font-bold text-slate-900 mb-6">General Information</h2>
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        disabled
                                        className="w-full border border-slate-200 bg-slate-50 rounded-md px-3 py-2 text-sm text-slate-500 cursor-not-allowed"
                                    />
                                    <p className="mt-1 text-xs text-slate-500">Email cannot be changed.</p>
                                </div>

                                <div>
                                    <label htmlFor="name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Security Settings */}
                        <div className="p-6 sm:p-8 border-b border-slate-200">
                            <h2 className="text-lg font-bold text-slate-900 mb-6">Change Password</h2>
                            <p className="text-sm text-slate-500 mb-5">Leave these fields blank if you do not want to change your password.</p>

                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="oldPassword" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        id="oldPassword"
                                        name="oldPassword"
                                        value={formData.oldPassword}
                                        onChange={handleChange}
                                        className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="newPassword" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-6 sm:p-8 bg-slate-50 flex justify-end rounded-b-md">
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium py-2.5 px-6 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {saving ? "Saving Changes..." : "Save Changes"}
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
}