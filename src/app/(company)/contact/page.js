import Link from "next/link";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-md shadow-sm p-8 sm:p-12">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Contact Us</h1>
                <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
                    <p>
                        Have a question, facing a technical issue, or want to report a resource? Our support team is here to help.
                    </p>

                    <div className="bg-slate-50 border border-slate-200 rounded-md p-6 my-8">
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Email Support</h2>
                        <p className="mb-4 text-slate-600">We aim to respond to all inquiries within 24-48 business hours.</p>
                        <a
                            href="mailto:support@gyaanbank.com"
                            className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5 px-6 rounded-md transition-colors"
                        >
                            support@gyaanbank.com
                        </a>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 mt-8 mb-4">Quick Links</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>For payment failures, the amount is usually auto-refunded by your bank within 5-7 working days.</li>
                        <li>For payout-related queries, please ensure your <Link href="/bank-setup" className="text-blue-700 hover:underline">bank details</Link> are correctly linked.</li>
                        <li>To report a copyright violation, please include the URL of the resource in your email.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}