import Link from "next/link";
import { BrandMark } from "@/components/Icons";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 text-center">
      <BrandMark className="w-16 h-16 mb-6 text-blue-700" />

      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
        404
      </h1>
      <h2 className="text-lg font-semibold text-slate-700 mb-4">
        Page not found
      </h2>

      <p className="text-sm text-slate-500 max-w-md mx-auto mb-8">
        The academic resource or page you are looking for doesn't exist, has
        been removed, or is temporarily unavailable.
      </p>

      <Link
        href="/"
        className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 transition-colors rounded-md"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
