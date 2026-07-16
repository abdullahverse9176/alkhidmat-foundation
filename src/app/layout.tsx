import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RecaptchaWrapper from "@/components/RecaptchaWrapper";
import { GoogleTagManager } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Al Khidmat Foundation Chiniot",
  description: "Al Khidmat Foundation Chiniot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GoogleTagManager gtmId="GTM-WQTZPHVQ" />
        {/* STEP 9.1: AuthProvider se children ko wrap kar rahe hain */}
        <AuthProvider>
          <RecaptchaWrapper>
            <Navbar />
            {children}
            <Footer />
          </RecaptchaWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
