"use client";

import { useEffect } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/Icons";

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 text-center">
      <div className="w-12 h-12 mb-6 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
        <BrandMark className="w-6 h-6 grayscale opacity-80" />
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-3">
        Something went wrong
      </h1>

      <p className="text-sm text-slate-500 max-w-md mx-auto mb-8">
        We encountered an unexpected error while trying to process your request.
        Our engineering team has been notified.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={() => reset()}
          className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 hover:text-slate-900 transition-colors rounded-md cursor-pointer"
        >
          Try again
        </button>
        <Link
          href="/"
          className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 transition-colors rounded-md text-center"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
