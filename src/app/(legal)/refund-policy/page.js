export default function RefundPolicyPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-md shadow-sm p-8 sm:p-12">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Refund Policy</h1>
                <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
                    <p>
                        Due to the digital nature of the products sold on GyaanBank, all sales are generally considered final. Once a document has been accessed or downloaded, we cannot revoke access.
                    </p>

                    <h2 className="text-lg font-bold text-slate-900 mt-8 mb-4">Eligible Refund Scenarios</h2>
                    <p>We will issue a full refund to the buyer in the following specific circumstances:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Broken Access:</strong> The external link provided by the creator is broken, private, or inaccessible, and the creator fails to fix it within 48 hours of reporting.</li>
                        <li><strong>Fraudulent Content:</strong> The material is completely unrelated to its title and description (e.g., purchasing a Physics guide but receiving a blank document).</li>
                        <li><strong>Duplicate Charges:</strong> Your payment method was accidentally charged twice for the exact same resource.</li>
                    </ul>

                    <h2 className="text-lg font-bold text-slate-900 mt-8 mb-4">How to Request a Refund</h2>
                    <p>
                        To request a refund under the eligible scenarios, please email <strong>support@gyaanbank.com</strong> within 7 days of your purchase. Include your transaction ID, the email address linked to your account, and proof of the issue (e.g., screenshots).
                    </p>
                    <p>
                        Approved refunds will be processed back to your original payment method within 5-7 business days.
                    </p>
                </div>
            </div>
        </div>
    );
}