import React, { Suspense } from "react";
import PropertiesClientPage from "../properties/client";
import { generateSeoMetadata } from "@/lib/seo";

export const metadata = generateSeoMetadata({
  title: "رهن و اجاره خانه در صحنه | املاک شیخی",
  description: "جدیدترین فایل‌های رهن کامل، ودیعه و اجاره ماهانه آپارتمان و خانه ویلایی در شهرستان صحنه با قرارداد رسمی و هولوگرام سامانه کاتب.",
  canonicalUrl: "https://amlak-sheikhi.ir/rent",
});

export default function RentPage() {
  return (
    <div className="space-y-6">
      <div className="bg-emerald-950 text-white py-10 px-4 text-center">
        <h1 className="text-3xl font-black mb-2">رهن و اجاره آپارتمان و خانه در صحنه</h1>
        <p className="text-emerald-100 text-sm max-w-xl mx-auto">
          فایل‌های تخلیه فوری و با ودیعه مناسب در بلوار امام، خیابان طالقانی و سایر نقاط شهرستان صحنه
        </p>
      </div>
      <Suspense fallback={<div className="p-12 text-center text-slate-500">در حال بارگذاری...</div>}>
        <PropertiesClientPage />
      </Suspense>
    </div>
  );
}
