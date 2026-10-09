"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Building2, PlusCircle, Phone, Menu, X, ShieldCheck, MapPin } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Banner with Brand Identity and Sahneh Location */}
      <div className="bg-emerald-800 text-emerald-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>شهرستان صحنه، استان کرمانشاه | انتخاب مطمئن در صحنه</span>
            <span className="hidden sm:inline bg-emerald-700/80 px-2 py-0.5 rounded text-[11px] text-amber-300 font-medium">
              دارای مجوز رسمی و پروانه تخصصی
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              تنظیم قرارداد با کدرهگیری سامانه کاتب
            </span>
            <Link
              href="/panel-sheikhi-2024"
              className="text-amber-200 hover:text-white transition-colors bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700/50"
            >
              ورود مشاوران و مدیریت
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/logo/amlak-sheikhi-logo.svg" 
              alt="املاک شیخی صحنه" 
              className="h-12 w-12 group-hover:scale-105 transition-transform duration-200"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-slate-800 tracking-tight">املاک</span>
                <span className="text-xl font-black text-emerald-700">شیخی</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-md border border-amber-300">صحنه</span>
              </div>
              <p className="text-[10px] font-medium text-slate-500">انتخاب مطمئن در شهرستان صحنه</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-700">
            <Link
              href="/"
              className="px-3 py-2 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              صفحه اصلی
            </Link>
            <Link
              href="/properties"
              className="px-3 py-2 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              همه فایل‌های ملکی
            </Link>
            <Link
              href="/buy"
              className="px-3 py-2 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              خرید در صحنه
            </Link>
            <Link
              href="/rent"
              className="px-3 py-2 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              رهن و اجاره
            </Link>
            <Link
              href="/sahneh"
              className="px-3 py-2 rounded-lg text-emerald-800 bg-emerald-50/80 hover:bg-emerald-100/70 transition-colors border border-emerald-200/60"
            >
              راهنمای محله‌های صحنه
            </Link>
            <Link
              href="/blog"
              className="px-3 py-2 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              وبلاگ و اخبار مسکن
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              درباره ما
            </Link>
            <Link
              href="/contact"
              className="px-3 py-2 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              تماس با ما
            </Link>
          </nav>

          {/* Actions: Submit Property & Phone */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/submit"
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-emerald-700/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>ثبت رایگان ملک</span>
            </Link>
            <a
              href="tel:09183381234"
              className="flex items-center gap-2 border border-slate-300 hover:border-emerald-600 px-3.5 py-2.5 rounded-xl font-semibold text-sm text-slate-800 hover:text-emerald-700 transition-colors bg-white"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span dir="ltr">0918 338 1234</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/submit"
              className="bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-lg"
            >
              ثبت ملک
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="منو"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block py-2.5 px-3 rounded-lg font-medium text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
          >
            صفحه اصلی
          </Link>
          <Link
            href="/properties"
            onClick={() => setMobileOpen(false)}
            className="block py-2.5 px-3 rounded-lg font-medium text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
          >
            همه فایل‌های ملکی
          </Link>
          <Link
            href="/buy"
            onClick={() => setMobileOpen(false)}
            className="block py-2.5 px-3 rounded-lg font-medium text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
          >
            خرید ملک در صحنه
          </Link>
          <Link
            href="/rent"
            onClick={() => setMobileOpen(false)}
            className="block py-2.5 px-3 rounded-lg font-medium text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
          >
            رهن و اجاره در صحنه
          </Link>
          <Link
            href="/sahneh"
            onClick={() => setMobileOpen(false)}
            className="block py-2.5 px-3 rounded-lg font-medium text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
          >
            معرفی محله‌ها و باغات صحنه
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileOpen(false)}
            className="block py-2.5 px-3 rounded-lg font-medium text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
          >
            وبلاگ و تحلیل قیمت
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="block py-2.5 px-3 rounded-lg font-medium text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
          >
            درباره املاک شیخی
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="block py-2.5 px-3 rounded-lg font-medium text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
          >
            تماس با ما و لوکیشن دفتر
          </Link>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/panel-sheikhi-2024"
              onClick={() => setMobileOpen(false)}
              className="text-center py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-lg"
            >
              پنل مشاوران و مدیریت (2FA)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
