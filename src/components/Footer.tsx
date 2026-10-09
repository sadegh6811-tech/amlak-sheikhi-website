"use client";

import React from "react";
import Link from "next/link";
import { Building2, Phone, Mail, MapPin, Shield, CheckCircle2, MessageCircle, Send, Award, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo/amlak-sheikhi-logo.svg" 
                alt="املاک شیخی صحنه" 
                className="h-12 w-12"
              />
              <div>
                <span className="text-xl font-black text-white">املاک شیخی</span>
                <span className="block text-xs text-amber-400 font-semibold">انتخاب مطمئن در شهرستان صحنه</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed text-justify">
              دفتر مهندسی و مشاور املاک شیخی با بیش از ۱۵ سال تجربه مستمر در بازار مسکن، زمین، باغات و املاک تجاری شهرستان صحنه (استان کرمانشاه). مشاور امین شما با صدور آنی کد رهگیری کشوری در سامانه کاتب.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>پروانه تخصصی درجه یک اتحادیه املاک صحنه</span>
            </div>
          </div>

          {/* Col 2: Quick Links & SEO Focus Areas */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              دسترسی سریع ملکی
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/buy" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  خرید آپارتمان در صحنه
                </Link>
              </li>
              <li>
                <Link href="/rent" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  رهن و اجاره در شهرستان صحنه
                </Link>
              </li>
              <li>
                <Link href="/properties?propertyType=villa" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  خانه‌های ویلایی و باغات سراب صحنه
                </Link>
              </li>
              <li>
                <Link href="/properties?propertyType=land" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  زمین‌های مسکونی شهرک جانبازان
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  ثبت رایگان ملک توسط مالکان
                </Link>
              </li>
              <li>
                <Link href="/sahneh" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  راهنمای محله‌های صحنه
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Legal */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              خدمات تخصصی املاک شیخی
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2 text-slate-300">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>کارشناسی قیمت روز ملک در صحنه</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>استعلام ثبت اسناد و اوقاف</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>تنظیم مبایعه‌نامه و اجاره‌نامه با هولوگرام</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>مشاوره حقوقی پیش‌فروش و مشارکت در ساخت</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>نقشه‌برداری UTM و پیگیری سند تک‌برگ</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Sahneh Office & Hours */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              دفتر مرکزی صحنه
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>کرمانشاه، شهرستان صحنه، خیابان فردوسی، نرسیده به میدان مولوی، املاک شیخی</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:09183381234" className="hover:text-white transition-colors" dir="ltr">0918 338 1234</a>
                <span className="text-xs text-slate-400">/ ۰۸۳-۸۳۲۲۵۵۶۶</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>همه‌روزه: ۸:۳۰ تا ۱۳:۳۰ و ۱۶ تا ۲۱</span>
              </div>
            </div>

            {/* Social & Messaging */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://wa.me/989183381234"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-900/60 border border-emerald-700/60 flex items-center justify-center text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors"
                title="واتساپ املاک شیخی"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/amlak_sheikhi_sahneh"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-sky-950/60 border border-sky-800/60 flex items-center justify-center text-sky-400 hover:bg-sky-600 hover:text-white transition-colors"
                title="کانال تلگرام فایل‌های صحنه"
              >
                <Send className="w-4 h-4" />
              </a>
              <Link
                href="/panel-sheikhi-2024"
                className="text-xs text-amber-300 hover:text-amber-200 border border-amber-500/30 bg-amber-950/30 px-3 py-1.5 rounded-lg mr-auto"
              >
                پنل مدیریت (2FA)
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} کلیه حقوق این پایگاه متعلق به «املاک شیخی» در شهرستان صحنه، استان کرمانشاه است.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">دامنه رسمی: amlak-sheikhi.ir</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>طراحی امن و سئو-محور PWA</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
