"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, MapPin, Building, Key, Home, ArrowLeft, Filter, Sparkles, SlidersHorizontal } from "lucide-react";

export default function HeroSearch() {
  const router = useRouter();
  const [tab, setTab] = useState<"buy" | "rent" | "pre-sale">("buy");
  const [propertyType, setPropertyType] = useState<string>("all");
  const [neighborhood, setNeighborhood] = useState<string>("all");
  const [keyword, setKeyword] = useState<string>("");

  const sahnehNeighborhoods = [
    { label: "همه محله‌های صحنه", value: "all" },
    { label: "خیابان فردوسی", value: "خیابان فردوسی" },
    { label: "بلوار امام خمینی", value: "بلوار امام خمینی" },
    { label: "منطقه دربند و سراب صحنه", value: "دربند" },
    { label: "شهرک جانبازان", value: "شهرک جانبازان" },
    { label: "خیابان طالقانی", value: "خیابان طالقانی" },
    { label: "خیابان معلم و شقایق", value: "خیابان معلم" },
    { label: "بلوار شهید بهشتی", value: "شهید بهشتی" },
    { label: "حومه صحنه و بیدسرخ", value: "حومه" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (tab) params.set("type", tab);
    if (propertyType !== "all") params.set("propertyType", propertyType);
    if (neighborhood !== "all") params.set("neighborhood", neighborhood);
    if (keyword.trim()) params.set("q", keyword.trim());

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="relative bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white pt-12 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Brand H1 Headline for SEO */}
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-800/80 border border-emerald-600/50 text-amber-300 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>مرجع تخصصی خرید، فروش، رهن و اجاره در شهرستان صحنه</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            املاک شیخی در <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-emerald-200">شهرستان صحنه</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            املاک شیخی؛ انتخاب مطمئن در صحنه. دسترسی مستقیم و بدون واسطه به معتبرترین فایل‌های آپارتمان، خانه ویلایی دربند، زمین‌های مسکونی و باغات مثمر در صحنه، کرمانشاه.
          </p>
        </div>

        {/* Big Search Form Box (Wall/Divar & Kilid inspired) */}
        <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 text-slate-800 border border-slate-100">
          
          {/* Transaction Tabs */}
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
            <button
              type="button"
              onClick={() => setTab("buy")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                tab === "buy"
                  ? "bg-emerald-700 text-white shadow-md shadow-emerald-700/30"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Building className="w-4 h-4" />
              <span>خرید ملک در صحنه</span>
            </button>

            <button
              type="button"
              onClick={() => setTab("rent")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                tab === "rent"
                  ? "bg-emerald-700 text-white shadow-md shadow-emerald-700/30"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Key className="w-4 h-4" />
              <span>رهن و اجاره</span>
            </button>

            <button
              type="button"
              onClick={() => setTab("pre-sale")}
              className={`hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                tab === "pre-sale"
                  ? "bg-emerald-700 text-white shadow-md shadow-emerald-700/30"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>پیش‌فروش و مشارکت</span>
            </button>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            
            {/* Input Keyword */}
            <div className="lg:col-span-4 relative">
              <label className="block text-xs font-semibold text-slate-500 mb-1">جستجوی آزاد</label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="مثلاً: کلید نخورده، بالکن، فردوسی..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Neighborhood select */}
            <div className="lg:col-span-3">
              <label className="block text-xs font-semibold text-slate-500 mb-1">محله / منطقه در صحنه</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-emerald-600 absolute right-3.5 top-3.5" />
                <select
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 appearance-none"
                >
                  {sahnehNeighborhoods.map((n) => (
                    <option key={n.value} value={n.value}>
                      {n.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Property Type */}
            <div className="lg:col-span-3">
              <label className="block text-xs font-semibold text-slate-500 mb-1">نوع ملک</label>
              <div className="relative">
                <Filter className="w-4 h-4 text-emerald-600 absolute right-3.5 top-3.5" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 appearance-none"
                >
                  <option value="all">همه انواع ملک</option>
                  <option value="apartment">آپارتمان مسکونی</option>
                  <option value="villa">خانه ویلایی / دربست</option>
                  <option value="land">زمین و کلنگی</option>
                  <option value="garden">باغ و باغ‌ویلا</option>
                  <option value="commercial">مغازه و تجاری</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="lg:col-span-2 pt-2 sm:pt-5">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3 rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
              >
                <Search className="w-5 h-5 text-slate-950" />
                <span>جستجو</span>
              </button>
            </div>

          </form>

          {/* Quick tags */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="font-semibold text-slate-400">جستجوهای پرطرفدار صحنه:</span>
            <Link
              href="/properties?neighborhood=دربند"
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 transition-colors"
            >
              باغ ویلای دربند
            </Link>
            <Link
              href="/properties?neighborhood=خیابان فردوسی"
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 transition-colors"
            >
              آپارتمان فردوسی
            </Link>
            <Link
              href="/properties?propertyType=land"
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 transition-colors"
            >
              زمین شهرک جانبازان
            </Link>
            <Link
              href="/rent"
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 transition-colors"
            >
              رهن و اجاره فوری
            </Link>
          </div>

        </div>

        {/* 3 Quick highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 text-center text-xs text-emerald-100">
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
            <div className="font-black text-amber-300 text-lg sm:text-xl">۱۵+ سال</div>
            <div className="text-slate-300">سابقه در بازار صحنه</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
            <div className="font-black text-amber-300 text-lg sm:text-xl">۱۰۰٪ قانونی</div>
            <div className="text-slate-300">استعلام کاتب و ثبت</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
            <div className="font-black text-amber-300 text-lg sm:text-xl">۵۰۰+ فایل</div>
            <div className="text-slate-300">ملکی به‌روز در صحنه</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
            <div className="font-black text-amber-300 text-lg sm:text-xl">زیر ۳ کلیک</div>
            <div className="text-slate-300">رسیدن به فایل دلخواه</div>
          </div>
        </div>

      </div>
    </div>
  );
}
