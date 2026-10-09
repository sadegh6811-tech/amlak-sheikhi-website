import React, { Suspense } from "react";
import PropertiesClientPage from "./client";
import { generateSeoMetadata } from "@/lib/seo";

export const metadata = generateSeoMetadata({
  title: "فایل‌های ملکی صحنه | خرید، فروش، رهن و اجاره",
  description: "جستجو و فیلتر پیشرفته کلیه فایل‌های خرید خانه، آپارتمان نوساز، ویلا و زمین در شهرستان صحنه استان کرمانشاه با قیمت روز و کد رهگیری معتبر.",
  canonicalUrl: "https://amlak-sheikhi.ir/properties",
});

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">در حال بارگذاری فایل‌های ملکی صحنه...</div>}>
      <PropertiesClientPage />
    </Suspense>
  );
}
