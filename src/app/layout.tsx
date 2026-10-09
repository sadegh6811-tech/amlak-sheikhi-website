import React from "react";
import "./globals.css";
import { generateSeoMetadata, realEstateBusinessSchema } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PwaInstallPrompt from "@/components/PwaInstallPrompt";

export const metadata = generateSeoMetadata({
  title: "املاک شیخی صحنه | خرید، فروش، رهن و اجاره ملک در صحنه",
  description: "املاک شیخی در شهرستان صحنه؛ مرجع تخصصی خرید، فروش، رهن و اجاره آپارتمان، خانه و زمین در صحنه کرمانشاه. مشاوره رایگان با مهندس شیخی.",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#047857" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateBusinessSchema) }}
        />
      </head>
      <body className="font-['Vazirmatn',sans-serif] bg-slate-50 text-slate-900 antialiased selection:bg-emerald-600 selection:text-white flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <PwaInstallPrompt />
      </body>
    </html>
  );
}
