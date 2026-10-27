"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";
import { ExternalLinkIcon, TrashIcon } from "@/components/Icons";

export default function DashboardPage() {
    const { status } = useSession();
    const [activeTab, setActiveTab] = useState("library");

    const [purchases, setPurchases] = useState([]);
    const [uploads, setUploads] = useState([]);

    const [loadingPurchases, setLoadingPurchases] = useState(true);
    const [loadingUploads, setLoadingUploads] = useState(true);

    useEffect(() => {
        if (status === "authenticated") {
            fetchPurchases();
            fetchUploads();
        }
    }, [status]);

    const fetchPurchases = async () => {
        try {
            const res = await fetch("/api/user/purchases");
            const data = await res.json();
            if (data.success) {
                setPurchases(data.resources);
            }
        } catch (error) {
            toast.error("Failed to load purchases");
        } finally {
            setLoadingPurchases(false);
        }
    };

    const fetchUploads = async () => {
        try {
            const res = await fetch("/api/user/my-uploads");
            const data = await res.json();
            if (data.success) {
                setUploads(data.resources);
            }
        } catch (error) {
            toast.error("Failed to load your uploads");
        } finally {
            setLoadingUploads(false);
        }
    };

    const handleDeleteUpload = async (id) => {
        if (!window.confirm("Are you sure you want to delete this resource? This cannot be undone.")) return;

        try {
            const res = await fetch(`/api/resources/${id}`, {
                method: "DELETE"
            });
            const data = await res.json();

            if (data.success) {
                toast.success("Resource deleted successfully");
                setUploads((prev) => prev.filter((item) => item._id !== id));
            } else {
                toast.error(data.error || "Failed to delete resource");
            }
        } catch (error) {
            toast.error("Something went wrong while deleting");
        }
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <span className="text-slate-500 font-medium">Loading dashboard...</span>
            </div>
        );
    }

    if (status === "unauthenticated") {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Please log in to view your dashboard</h2>
                <Link href="/login" className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-md font-medium">
                    Log in
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
                    <p className="mt-2 text-sm text-slate-600">Manage your purchased materials and uploaded resources.</p>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-200 mb-8">
                    <button
                        onClick={() => setActiveTab("library")}
                        className={`py-3 px-6 text-sm font-medium border-b-2 transition-colors ${activeTab === "library"
                                ? "border-blue-700 text-blue-700"
                                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                            }`}
                    >
                        My Library (Purchases)
                    </button>
                    <button
                        onClick={() => setActiveTab("uploads")}
                        className={`py-3 px-6 text-sm font-medium border-b-2 transition-colors ${activeTab === "uploads"
                                ? "border-blue-700 text-blue-700"
                                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                            }`}
                    >
                        My Uploads
                    </button>
                </div>

                {/* Tab Content: Library */}
                {activeTab === "library" && (
                    <div>
                        {loadingPurchases ? (
                            <div className="py-12 text-center text-sm font-medium text-slate-500">Loading your library...</div>
                        ) : purchases.length === 0 ? (
                            <div className="bg-white border border-slate-200 rounded-md p-12 text-center">
                                <p className="text-lg font-semibold text-slate-900">Your library is empty</p>
                                <p className="text-sm text-slate-500 mt-1 mb-6">You haven't purchased any resources yet.</p>
                                <Link href="/explore" className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-md font-medium text-sm">
                                    Explore Resources
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {purchases.map((resource) => (
                                    <div key={resource._id} className="bg-white border border-slate-200 rounded-md flex flex-col hover:shadow-sm transition-shadow">
                                        <div className="p-5 grow">
                                            <div className="mb-3">
                                                <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 font-semibold uppercase tracking-wider rounded">
                                                    Purchased
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2 line-clamp-2">
                                                {resource.title}
                                            </h3>
                                            <p className="text-sm text-slate-500 mb-4 font-medium uppercase tracking-wider">
                                                {resource.subject}
                                            </p>
                                        </div>
                                        <div className="p-5 border-t border-slate-100 mt-auto bg-slate-50 flex flex-col gap-2">
                                            <a
                                                href={resource.externalLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full inline-flex justify-center items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
                                            >
                                                Open Material <ExternalLinkIcon className="w-4 h-4" />
                                            </a>
                                            <Link
                                                href={`/resource/${resource._id}`}
                                                className="w-full text-center bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium py-2 px-4 rounded transition-colors"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Tab Content: Uploads */}
                {activeTab === "uploads" && (
                    <div>
                        {loadingUploads ? (
                            <div className="py-12 text-center text-sm font-medium text-slate-500">Loading your uploads...</div>
                        ) : uploads.length === 0 ? (
                            <div className="bg-white border border-slate-200 rounded-md p-12 text-center">
                                <p className="text-lg font-semibold text-slate-900">No uploads yet</p>
                                <p className="text-sm text-slate-500 mt-1 mb-6">You haven't uploaded any study materials.</p>
                                <Link href="/upload" className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-md font-medium text-sm">
                                    Upload a Resource
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {uploads.map((resource) => (
                                    <div key={resource._id} className="bg-white border border-slate-200 rounded-md flex flex-col hover:shadow-sm transition-shadow">
                                        <div className="p-5 grow">
                                            <div className="flex justify-between items-start mb-3">
                                                <span className="inline-block bg-slate-100 text-slate-700 text-xs px-2 py-1 font-semibold uppercase tracking-wider rounded">
                                                    {resource.category}
                                                </span>
                                                <span className="text-sm font-bold text-slate-900">
                                                    {resource.price === 0 ? "Free" : `₹${resource.price}`}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2 line-clamp-2">
                                                {resource.title}
                                            </h3>
                                            <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                                                {resource.subject}
                                            </p>
                                        </div>
                                        <div className="p-4 border-t border-slate-100 mt-auto bg-slate-50 grid grid-cols-4 gap-2">
                                            <Link
                                                href={`/resource/${resource._id}`}
                                                className="col-span-3 text-center bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-sm font-medium py-2 px-4 rounded transition-colors"
                                            >
                                                View Page
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteUpload(resource._id)}
                                                className="col-span-1 flex items-center justify-center bg-white border border-red-200 hover:bg-red-50 text-red-600 rounded transition-colors"
                                                title="Delete Resource"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}