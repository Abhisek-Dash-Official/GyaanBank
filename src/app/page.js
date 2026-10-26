import Link from "next/link";
import Image from "next/image";
import { BrandMark } from "@/components/Icons";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <section className="relative pt-20 pb-28 lg:pt-32 lg:pb-36 border-b border-slate-200 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                The central repository for study material.
              </h1>

              <p className="text-xs font-bold text-blue-700 tracking-[0.2em] uppercase mb-5">
                University Study Exchange
              </p>

              <p className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed">
                Discover, buy, and sell verified lecture notes, study guides, and technical reference materials. Built by students, for students to ace every semester.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/explore"
                  className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 transition-colors w-full sm:w-auto"
                >
                  Browse the Repository
                </Link>
                <Link
                  href="/upload"
                  className="inline-flex justify-center items-center px-6 py-3 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 transition-colors w-full sm:w-auto"
                >
                  Start Selling Notes
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative w-full aspect-4/3 lg:aspect-16/11 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm flex items-center justify-center">
                <Image
                  src="/hero.jpeg"
                  alt="GyaanBank Platform Interface"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            <div className="px-4 text-center md:text-left">
              <p className="text-3xl font-bold text-slate-900 tracking-tight">10k+</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Resources</p>
            </div>
            <div className="px-4 text-center md:text-left">
              <p className="text-3xl font-bold text-slate-900 tracking-tight">Zero</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Platform Setup Fees</p>
            </div>
            <div className="px-4 text-center md:text-left">
              <p className="text-3xl font-bold text-slate-900 tracking-tight">90%</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Creator Payout</p>
            </div>
            <div className="px-4 text-center md:text-left">
              <p className="text-3xl font-bold text-slate-900 tracking-tight">Instant</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">PDF Access</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Engineered for academic excellence
            </h2>
            <p className="mt-3 text-slate-600 max-w-2xl">
              We provide a transparent, high-quality marketplace where knowledge is fairly compensated and easily accessible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-sm transition-all">
              <div className="w-10 h-10 bg-white border border-slate-200 flex items-center justify-center mb-5">
                <span className="text-blue-700 font-bold font-mono">01</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Verified Content</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Filter through categories, subjects, and prices to find exactly what you need. Preview materials before committing to a purchase.
              </p>
            </div>

            <div className="p-6 border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-sm transition-all">
              <div className="w-10 h-10 bg-white border border-slate-200 flex items-center justify-center mb-5">
                <span className="text-blue-700 font-bold font-mono">02</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Automated Payouts</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Creators link their bank accounts via Razorpay Route. When a student buys your notes, your 90% share is routed instantly and automatically.
              </p>
            </div>

            <div className="p-6 border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-sm transition-all">
              <div className="w-10 h-10 bg-white border border-slate-200 flex items-center justify-center mb-5">
                <span className="text-blue-700 font-bold font-mono">03</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Lifetime Access</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Once purchased, your resources are securely stored in your personal library. Download or view your PDFs anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <BrandMark />
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-6 mb-4">
            Start building your academic repository
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Join thousands of students who are already sharing knowledge and earning from their hard work.
          </p>
          <Link
            href="/signup"
            className="inline-flex justify-center items-center px-8 py-3 text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 transition-colors"
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}