"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { TrashIcon } from "@/components/Icons";

export default function AdminDashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState("overview");

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalResources: 0,
        totalTransactions: 0,
        totalRevenue: 0,
    });
    const [loadingStats, setLoadingStats] = useState(true);

    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [nextCursor, setNextCursor] = useState(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated") {
            if (session?.user?.role !== "admin") {
                router.push("/");
                toast.error("Unauthorized: Admin access required");
            } else {
                fetchStats();
                fetchUsers();
            }
        }
    }, [status, session, router]);

    const fetchStats = async () => {
        try {
            const res = await fetch("/api/admin/dashboard");
            const data = await res.json();
            if (data.success) {
                setStats(data.statistics);
            } else {
                toast.error(data.error || "Failed to load statistics");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoadingStats(false);
        }
    };

    const fetchUsers = async (isLoadMore = false, cursor = null) => {
        try {
            if (isLoadMore) setLoadingMore(true);
            else setLoadingUsers(true);

            const url = cursor ? `/api/admin/users?cursor=${cursor}` : "/api/admin/users";
            const res = await fetch(url);
            const data = await res.json();

            if (data.success) {
                if (isLoadMore) {
                    setUsers((prev) => [...prev, ...data.users]);
                } else {
                    setUsers(data.users);
                }
                setHasMore(data.hasMore);
                setNextCursor(data.nextCursor);
            } else {
                toast.error(data.error || "Failed to load users");
            }
        } catch (error) {
            toast.error("Something went wrong loading users");
        } finally {
            setLoadingUsers(false);
            setLoadingMore(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: newRole }),
            });
            const data = await res.json();

            if (data.success) {
                toast.success("User role updated");
                setUsers((prev) =>
                    prev.map((user) => (user._id === userId ? { ...user, role: newRole } : user))
                );
            } else {
                toast.error(data.error || "Failed to update role");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user? This action is permanent.")) return;

        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (data.success) {
                toast.success("User deleted successfully");
                setUsers((prev) => prev.filter((user) => user._id !== userId));
            } else {
                toast.error(data.error || "Failed to delete user");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    if (status === "loading" || (status === "authenticated" && session?.user?.role !== "admin")) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <span className="text-slate-500 font-medium">Verifying access...</span>
            </div>
        );
    }

    // Calculate derived insights
    const avgOrderValue = stats.totalTransactions > 0 ? Math.round(stats.totalRevenue / stats.totalTransactions) : 0;
    const avgResourcesPerUser = stats.totalUsers > 0 ? (stats.totalResources / stats.totalUsers).toFixed(1) : 0;

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
                    <p className="mt-2 text-sm text-slate-600">Platform overview and user management.</p>
                </div>

                <div className="flex border-b border-slate-200 mb-8">
                    <button
                        onClick={() => setActiveTab("overview")}
                        className={`py-3 px-6 text-sm font-medium border-b-2 transition-colors ${activeTab === "overview"
                            ? "border-blue-700 text-blue-700"
                            : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                            }`}
                    >
                        Platform Overview
                    </button>
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`py-3 px-6 text-sm font-medium border-b-2 transition-colors ${activeTab === "users"
                            ? "border-blue-700 text-blue-700"
                            : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                            }`}
                    >
                        Manage Users
                    </button>
                </div>

                {activeTab === "overview" && (
                    <div className="space-y-6">
                        {loadingStats ? (
                            <div className="py-12 text-center text-sm font-medium text-slate-500">Loading statistics...</div>
                        ) : (
                            <>
                                {/* Top Metrics Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                                    <div className="bg-white border border-slate-200 rounded-md p-6 shadow-sm flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Users</p>
                                            <p className="text-3xl font-bold text-slate-900">{stats.totalUsers}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-slate-200 rounded-md p-6 shadow-sm flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Resources</p>
                                            <p className="text-3xl font-bold text-slate-900">{stats.totalResources}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-slate-200 rounded-md p-6 shadow-sm flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Transactions</p>
                                            <p className="text-3xl font-bold text-slate-900">{stats.totalTransactions}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-slate-200 rounded-md p-6 shadow-sm flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Gross Volume</p>
                                            <p className="text-3xl font-bold text-slate-900">₹{stats.totalRevenue}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </div>
                                    </div>

                                </div>

                                {/* Additional Dashboard Widgets */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">

                                    {/* Quick Insights */}
                                    <div className="bg-white border border-slate-200 rounded-md p-6 shadow-sm">
                                        <h3 className="text-lg font-bold text-slate-900 mb-5">Quick Insights</h3>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                                                <span className="text-sm font-medium text-slate-600">Avg. Revenue per Transaction</span>
                                                <span className="text-sm font-bold text-slate-900">₹{avgOrderValue}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                                                <span className="text-sm font-medium text-slate-600">Avg. Resources Uploaded per User</span>
                                                <span className="text-sm font-bold text-slate-900">{avgResourcesPerUser}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                                                <span className="text-sm font-medium text-slate-600">Platform Fee Collected (10% estimate)</span>
                                                <span className="text-sm font-bold text-green-600">₹{Math.floor(stats.totalRevenue * 0.10)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* System Health */}
                                    <div className="bg-white border border-slate-200 rounded-md p-6 shadow-sm">
                                        <h3 className="text-lg font-bold text-slate-900 mb-5">System Health</h3>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                                                <span className="text-sm font-medium text-slate-600">Database (MongoDB)</span>
                                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Operational
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                                                <span className="text-sm font-medium text-slate-600">Payouts (Razorpay Route)</span>
                                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Operational
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                                                <span className="text-sm font-medium text-slate-600">Authentication (NextAuth)</span>
                                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Operational
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </>
                        )}
                    </div>
                )}

                {activeTab === "users" && (
                    <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
                        {loadingUsers ? (
                            <div className="py-12 text-center text-sm font-medium text-slate-500">Loading users...</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Joined</th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-200">
                                        {users.map((user) => (
                                            <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                                    {user.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                                    <select
                                                        value={user.role}
                                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                        disabled={user._id === session?.user?.id}
                                                        className="border border-slate-300 rounded px-2 py-1 text-sm bg-white focus:outline-none focus:border-blue-700 disabled:opacity-50 disabled:bg-slate-100"
                                                    >
                                                        <option value="user">User</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleDeleteUser(user._id)}
                                                        disabled={user._id === session?.user?.id}
                                                        className="text-red-600 hover:text-red-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                                        title={user._id === session?.user?.id ? "Cannot delete yourself" : "Delete user"}
                                                    >
                                                        <TrashIcon className="w-5 h-5 inline-block" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {hasMore && (
                            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-center">
                                <button
                                    onClick={() => fetchUsers(true, nextCursor)}
                                    disabled={loadingMore}
                                    className="bg-white border border-slate-300 text-slate-700 text-sm font-medium py-2 px-6 rounded-md hover:bg-slate-50 transition-colors disabled:opacity-50"
                                >
                                    {loadingMore ? "Loading..." : "Load More Users"}
                                </button>
                            </div>
                        )}

                        {!loadingUsers && users.length === 0 && (
                            <div className="py-12 text-center text-sm text-slate-500">
                                No users found.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}