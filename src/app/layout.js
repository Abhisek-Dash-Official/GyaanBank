import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GyaanBank | Notes Marketplace for Students",
  description: "Discover, buy, sell, and download free or premium study notes, PDFs, and academic resources created by students.",
  keywords: ["study notes", "student marketplace", "buy notes", "sell PDFs", "GyaanBank", "academic resources"],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">

        {/* TODO: Add <NextAuthProvider> here later for Auth session */}

        {/* TODO: <Header /> */}
        <main className="flex-1">
          {children}
        </main>
        {/* TODO: <Footer /> */}

      </body>
    </html>
  );
}