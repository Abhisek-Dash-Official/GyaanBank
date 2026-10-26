import Link from "next/link";
import { BrandMark } from "@/components/Icons";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-slate-200 text-slate-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    <div className="md:col-span-1 space-y-3">
                        <Link href="/" className="flex items-center">
                            <BrandMark className="w-16 h-16" />
                            <span className="text-base font-bold tracking-tight text-slate-900">
                                GyaanBank
                            </span>
                        </Link>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Peer-to-peer academic repository for university lecture notes, verified study guides, and technical reference material.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
                            Repository
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/explore" className="hover:text-slate-900 transition-colors">
                                    All Study Notes
                                </Link>
                            </li>
                            <li>
                                <Link href="/explore?priceType=free" className="hover:text-slate-900 transition-colors">
                                    Open Access (Free)
                                </Link>
                            </li>
                            <li>
                                <Link href="/explore?category=Engineering" className="hover:text-slate-900 transition-colors">
                                    Engineering & CS
                                </Link>
                            </li>
                            <li>
                                <Link href="/explore?category=Competitive+Exams" className="hover:text-slate-900 transition-colors">
                                    Exam Preparation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
                            Contributors
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/upload" className="hover:text-slate-900 transition-colors">
                                    Publish Notes
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile" className="hover:text-slate-900 transition-colors">
                                    Payout & Bank Setup
                                </Link>
                            </li>
                            <li>
                                <Link href="/guidelines" className="hover:text-slate-900 transition-colors">
                                    Quality Standards
                                </Link>
                            </li>
                            <li>
                                <Link href="/academic-integrity" className="hover:text-slate-900 transition-colors">
                                    Copyright & Honor Code
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
                            Legal & Support
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/about" className="hover:text-slate-900 transition-colors">
                                    About GyaanBank
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-slate-900 transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-slate-900 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/refund-policy" className="hover:text-slate-900 transition-colors">
                                    Refund & Dispute Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-slate-900 transition-colors">
                                    Contact Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
                    <p>© {currentYear} GyaanBank. All rights reserved.</p>
                    <p className="mt-2 sm:mt-0">
                        Payments secured via Razorpay Route. Standard creator split: 90% Creator / 10% Platform.
                    </p>
                </div>
            </div>
        </footer>
    );
}