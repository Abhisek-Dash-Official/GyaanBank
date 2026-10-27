export default function GuidelinesPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-md shadow-sm p-8 sm:p-12">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Upload Guidelines</h1>
                <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
                    <p>
                        To maintain a high standard of quality on GyaanBank, all creators must adhere to the following guidelines when uploading resources.
                    </p>

                    <h2 className="text-lg font-bold text-slate-900 mt-8 mb-4">1. Content Quality</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Documents must be clearly legible. If uploading handwritten notes, ensure they are scanned using a proper document scanner app.</li>
                        <li>Titles and descriptions must accurately reflect the content. Avoid clickbait or misleading titles.</li>
                        <li>Ensure that the sharing permissions on your external link (e.g., Google Drive) are set to "Anyone with the link can view".</li>
                    </ul>

                    <h2 className="text-lg font-bold text-slate-900 mt-8 mb-4">2. Prohibited Content</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Copyrighted textbooks, published research papers, or materials you do not own the rights to.</li>
                        <li>Active assignment solutions or live exam answers (See our Academic Integrity policy).</li>
                        <li>Incomplete documents or blank placeholders.</li>
                        <li>Content promoting hate speech, violence, or illegal activities.</li>
                    </ul>

                    <h2 className="text-lg font-bold text-slate-900 mt-8 mb-4">3. Pricing</h2>
                    <p>
                        Creators are free to price their resources. However, we recommend pricing materials reasonably based on the depth and length of the content to maximize your sales volume.
                    </p>
                </div>
            </div>
        </div>
    );
}