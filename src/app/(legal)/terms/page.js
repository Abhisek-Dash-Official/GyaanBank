export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-md shadow-sm p-8 sm:p-12">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Terms of Service</h1>
                <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <p>
                        By accessing or using GyaanBank, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                    </p>

                    <h2 className="text-lg font-bold text-slate-900 mt-8 mb-4">1. Accounts and Registration</h2>
                    <p>
                        You must provide accurate and complete information when creating an account. You are responsible for safeguarding your password and for all activities that occur under your account.
                    </p>

                    <h2 className="text-lg font-bold text-slate-900 mt-8 mb-4">2. User Content and Ownership</h2>
                    <p>
                        Creators retain all ownership rights to the materials they upload. By uploading content, you grant GyaanBank a non-exclusive, worldwide, royalty-free license to display and distribute the content to users who have legitimately accessed or purchased it through the platform. You warrant that you have the right to share the content you upload.
                    </p>

                    <h2 className="text-lg font-bold text-slate-900 mt-8 mb-4">3. Payments and Fees</h2>
                    <p>
                        GyaanBank charges a 10% platform fee on all paid transactions to cover hosting, maintenance, and payment gateway costs. Creators receive 90% of the listed price. Payouts are processed via Razorpay Route and are subject to Razorpay's terms and settlement cycles.
                    </p>

                    <h2 className="text-lg font-bold text-slate-900 mt-8 mb-4">4. Platform Rights</h2>
                    <p>
                        We reserve the right to remove any content, suspend accounts, or terminate access for users who violate these Terms, our Guidelines, or our Academic Integrity policy without prior notice.
                    </p>
                </div>
            </div>
        </div>
    );
}