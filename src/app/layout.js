import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";

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

        <Providers >
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>

      </body>
    </html>
  );
}