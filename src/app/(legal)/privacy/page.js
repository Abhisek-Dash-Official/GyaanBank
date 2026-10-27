export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-md shadow-sm p-8 sm:p-12">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Privacy Policy</h1>
                <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
                    <p>
                        Your privacy is critically important to us at GyaanBank. This Privacy Policy outlines how we collect, use, and protect your personal information.
                    </p>

                    <h2 className="text-lg font-bold text-slate-900 mt-8 mb-4">Information We Collect</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Account Data:</strong> Name, email address, and encrypted passwords.</li>
                        <li><strong>Transaction Data:</strong> Record of purchases and resources accessed.</li>
                        <li><strong>Payout Information:</strong> If you are a creator, your bank details and PAN are securely transmitted directly to Razorpay. GyaanBank does not store your bank account numbers on our servers.</li>
                    </ul>

                    <h2 className="text-lg font-bold text-slate-900 mt-8 mb-4">How We Use Your Data</h2>
                    <p>
                        We use your data strictly to provide and maintain the service, process transactions, notify you about changes to our platform, and provide customer support. We do not sell your personal data to third parties.
                    </p>

                    <h2 className="text-lg font-bold text-slate-900 mt-8 mb-4">Cookies</h2>
                    <p>
                        We use essential cookies to maintain your session (keeping you logged in) and to protect against cross-site request forgery (CSRF). We do not use aggressive third-party tracking cookies.
                    </p>
                </div>
            </div>
        </div>
    );
}