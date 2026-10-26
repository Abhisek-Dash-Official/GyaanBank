"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { BrandMark } from "@/components/Icons";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            if (res.error) {
                throw new Error(res.error);
            }

            toast.success("Signed in successfully");
            router.push("/explore");
            router.refresh();
        } catch (err) {
            toast.error(err.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <div className="max-w-md w-full bg-white p-8 border border-slate-200 shadow-sm">

                <div className="flex flex-col items-center mb-8">
                    <BrandMark className="w-16 h-16 mb-4" />
                    <h2 className="text-xl font-bold tracking-tight text-slate-900">
                        Welcome back
                    </h2>
                    <p className="text-sm text-slate-500 mt-1.5">
                        Sign in to access your library
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 placeholder:text-slate-400"
                            placeholder="student@university.edu"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 placeholder:text-slate-400"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 px-4 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 transition-colors cursor-pointer disabled:opacity-50 mt-2"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                <div className="mt-6 border-t border-slate-100 pt-6 text-center">
                    <p className="text-sm text-slate-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-blue-700 font-medium hover:text-blue-800 hover:underline">
                            Create one
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}