import React, { Suspense } from "react";
import PropertiesClientPage from "../properties/client";
import { generateSeoMetadata } from "@/lib/seo";

export const metadata = generateSeoMetadata({
  title: "خرید خانه و آپارتمان در صحنه | املاک شیخی",
  description: "لیست کامل خرید آپارتمان، خانه ویلایی، زمین و خانه کلنگی در شهرستان صحنه کرمانشاه با بررسی دقیق ثبتی و مشاوره رایگان مهندس شیخی.",
  canonicalUrl: "https://amlak-sheikhi.ir/buy",
});

export default function BuyPage() {
  return (
    <div className="space-y-6">
      <div className="bg-emerald-900 text-white py-10 px-4 text-center">
        <h1 className="text-3xl font-black mb-2">خرید ملک و آپارتمان در شهرستان صحنه</h1>
        <p className="text-emerald-100 text-sm max-w-xl mx-auto">
          مجموعه فایل‌های فروشی نقدی و پیش‌فروش در بهترین محله‌های صحنه؛ خیابان فردوسی، دربند، شهرک جانبازان
        </p>
      </div>
      <Suspense fallback={<div className="p-12 text-center text-slate-500">در حال بارگذاری...</div>}>
        <PropertiesClientPage />
      </Suspense>
    </div>
  );
}
