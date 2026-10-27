export default function AcademicIntegrityPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-md shadow-sm p-8 sm:p-12">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Academic Integrity</h1>
                <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
                    <p>
                        GyaanBank is designed to facilitate learning, revision, and knowledge sharing. It is not a platform for cheating, plagiarism, or academic misconduct.
                    </p>

                    <h2 className="text-lg font-bold text-slate-900 mt-8 mb-4">Our Stance</h2>
                    <p>
                        We strictly prohibit the uploading, buying, or selling of materials intended to bypass academic evaluations. Violating this policy will result in an immediate and permanent ban from the platform, forfeiture of pending payouts, and potential reporting to your educational institution.
                    </p>

                    <h2 className="text-lg font-bold text-slate-900 mt-8 mb-4">Strictly Forbidden:</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Answers to active exams, quizzes, or standardized tests.</li>
                        <li>Solutions to ongoing graded assignments or homework.</li>
                        <li>Essays, thesis papers, or code repositories sold for the purpose of submitting as one's own work.</li>
                        <li>Test banks or instructor solution manuals.</li>
                    </ul>

                    <h2 className="text-lg font-bold text-slate-900 mt-8 mb-4">Reporting Violations</h2>
                    <p>
                        If you encounter a resource that violates our Academic Integrity policy, please contact us immediately at support@gyaanbank.com. We investigate all reports promptly.
                    </p>
                </div>
            </div>
        </div>
    );
}