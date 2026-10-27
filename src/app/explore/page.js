"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { ChevronDownIcon } from "@/components/Icons";

function ExploreContent() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [nextCursor, setNextCursor] = useState(null);

    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [category, setCategory] = useState(searchParams.get("category") || "");
    const [subject, setSubject] = useState(searchParams.get("subject") || "");
    const [priceType, setPriceType] = useState(searchParams.get("priceType") || "");
    const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "latest");

    const fetchResources = useCallback(async (isLoadMore = false, cursor = null) => {
        try {
            if (!isLoadMore) setLoading(true);
            else setLoadingMore(true);

            const params = new URLSearchParams();
            if (search) params.append("search", search);
            if (category) params.append("category", category);
            if (subject) params.append("subject", subject);
            if (priceType) params.append("priceType", priceType);
            if (sortBy) params.append("sortBy", sortBy);
            if (cursor) params.append("cursor", cursor);

            const response = await fetch(`/api/resources?${params.toString()}`);
            const data = await response.json();

            if (data.success) {
                if (isLoadMore) {
                    setResources((prev) => [...prev, ...data.resources]);
                } else {
                    setResources(data.resources);
                }
                setHasMore(data.hasMore);
                setNextCursor(data.nextCursor);
            } else {
                toast.error(data.error || "Failed to fetch resources");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, [search, category, subject, priceType, sortBy]);

    const updateUrlAndFetch = () => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (category) params.append("category", category);
        if (subject) params.append("subject", subject);
        if (priceType) params.append("priceType", priceType);
        if (sortBy) params.append("sortBy", sortBy);

        router.push(`${pathname}?${params.toString()}`);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        updateUrlAndFetch();
    };

    useEffect(() => {
        fetchResources();
    }, [searchParams]);

    const handleFilterChange = (setter) => (e) => {
        setter(e.target.value);
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Explore Resources</h1>
                    <p className="mt-2 text-sm text-slate-600">Discover study materials, notes, and technical references.</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-md p-5 mb-8 shadow-sm">
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

                        <div className="lg:col-span-2">
                            <label htmlFor="search" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Search keyword</label>
                            <div className="flex">
                                <input
                                    type="text"
                                    id="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="E.g., Data Structures, React..."
                                    className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Category</label>
                            <div className="relative">
                                <select
                                    id="category"
                                    value={category}
                                    onChange={handleFilterChange(setCategory)}
                                    className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm appearance-none focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 bg-white"
                                >
                                    <option value="">All Categories</option>
                                    <option value="Notes">Notes</option>
                                    <option value="Study Guide">Study Guide</option>
                                    <option value="Cheat Sheet">Cheat Sheet</option>
                                    <option value="Exam Papers">Exam Papers</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                    <ChevronDownIcon />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="priceType" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Price</label>
                            <div className="relative">
                                <select
                                    id="priceType"
                                    value={priceType}
                                    onChange={handleFilterChange(setPriceType)}
                                    className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm appearance-none focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 bg-white"
                                >
                                    <option value="">All Prices</option>
                                    <option value="free">Free</option>
                                    <option value="paid">Paid</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                    <ChevronDownIcon />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="sortBy" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Sort By</label>
                            <div className="relative">
                                <select
                                    id="sortBy"
                                    value={sortBy}
                                    onChange={handleFilterChange(setSortBy)}
                                    className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm appearance-none focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 bg-white"
                                >
                                    <option value="latest">Latest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                    <ChevronDownIcon />
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2 lg:col-span-5 flex justify-end mt-2">
                            <button
                                type="submit"
                                className="bg-blue-700 hover:bg-blue-800 text-white rounded-md text-sm font-medium py-2 px-6 transition-colors"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </form>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <span className="text-slate-500 font-medium">Loading resources...</span>
                    </div>
                ) : resources.length === 0 ? (
                    <div className="bg-white border border-slate-200 rounded-md p-12 text-center">
                        <p className="text-lg font-semibold text-slate-900">No resources found</p>
                        <p className="text-sm text-slate-500 mt-1">Try adjusting your filters or search terms.</p>
                        <button
                            onClick={() => {
                                setSearch(""); setCategory(""); setSubject(""); setPriceType(""); setSortBy("latest");
                                router.push("/explore");
                            }}
                            className="mt-4 text-blue-700 font-medium text-sm hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {resources.map((resource) => (
                                <div key={resource._id} className="bg-white border border-slate-200 rounded-md flex flex-col hover:shadow-sm transition-shadow overflow-hidden">
                                    <div className="p-5 grow">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="inline-block bg-slate-100 rounded text-slate-700 text-xs px-2 py-1 font-semibold uppercase tracking-wider">
                                                {resource.category}
                                            </span>
                                            <span className="text-sm font-bold text-slate-900">
                                                {resource.price === 0 ? "Free" : `₹${resource.price}`}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2 line-clamp-2">
                                            {resource.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 mb-4 font-medium uppercase tracking-wider">
                                            {resource.subject}
                                        </p>
                                        <p className="text-sm text-slate-600 line-clamp-3">
                                            {resource.desc}
                                        </p>
                                    </div>
                                    <div className="p-5 border-t border-slate-100 mt-auto bg-slate-50">
                                        <Link
                                            href={`/resource/${resource._id}`}
                                            className="block w-full text-center bg-white border border-slate-300 rounded-md hover:border-slate-400 hover:bg-slate-50 text-slate-900 text-sm font-medium py-2 px-4 transition-colors"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {hasMore && (
                            <div className="mt-12 flex justify-center">
                                <button
                                    onClick={() => fetchResources(true, nextCursor)}
                                    disabled={loadingMore}
                                    className="bg-white border border-slate-300 rounded-md text-slate-700 text-sm font-medium py-2.5 px-8 hover:bg-slate-50 transition-colors disabled:opacity-50"
                                >
                                    {loadingMore ? "Loading..." : "Load More"}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default function ExplorePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <span className="text-slate-500 font-medium">Loading...</span>
            </div>
        }>
            <ExploreContent />
        </Suspense>
    );
}