"use client";

import React, { useState } from "react";
import { generateSeoMetadata } from "@/lib/seo";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("مشاوره خرید ملک");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert("لطفاً نام و تلفن تماس را وارد کنید.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/interactions?type=visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          preferredDate: subject,
          preferredTime: "پیام از فرم تماس با ما",
          note: message,
        }),
      });

      if (res.ok) {
        setSent(true);
        confetti({ particleCount: 80, spread: 60 });
      }
    } catch (err) {
      console.error(err);
      alert("خطا در ارسال پیام.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          تماس با دفتر املاک شیخی در شهرستان صحنه
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          مشتاقانه آماده پاسخگویی، مشاوره تخصصی رایگان و میزبانی از شما در دفتر مرکزی املاک شیخی در صحنه هستیم.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-black text-slate-900 pb-3 border-b border-slate-100">
              اطلاعات ارتباطی و آدرس دفتر صحنه
            </h2>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">آدرس دفتر مرکزی:</span>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    استان کرمانشاه، شهرستان صحنه، خیابان فردوسی، نرسیده به میدان مولوی، جنب بانک رفاه، پلاک ۴۲، دفتر مهندسی و املاک شیخی
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">تلفن‌های تماس مستقیم:</span>
                  <p className="text-slate-700 font-bold" dir="ltr">
                    <a href="tel:09183381234" className="hover:text-emerald-700">0918 338 1234</a>
                    <span className="text-slate-400 font-normal mx-2">/</span>
                    <a href="tel:08383225566" className="hover:text-emerald-700 font-normal">083 8322 5566</a>
                  </p>
                  <span className="text-[11px] text-slate-400">پاسخگویی مستقیم مهندس بهزاد شیخی</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">ساعات کاری دفتر:</span>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    شنبه تا پنجشنبه: ۸:۳۰ صبح الی ۱۳:۳۰ و ۱۶:۰۰ الی ۲۱:۰۰
                  </p>
                  <span className="text-[11px] text-emerald-700 font-semibold">جمعه‌ها و ایام تعطیل با هماهنگی قبلی</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">شبکه‌های اجتماعی:</span>
                  <div className="flex items-center gap-3 mt-1 text-xs">
                    <a
                      href="https://wa.me/989183381234"
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>واتساپ</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="text-slate-300">•</span>
                    <a
                      href="https://t.me/amlak_sheikhi_sahneh"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sky-600 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>تلگرام</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-2">
              فرم ارسال پیام و درخواست مشاوره رایگان
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              پیام شما مستقیماً توسط مهندس شیخی بررسی و در اسرع وقت پاسخ داده خواهد شد.
            </p>

            {sent ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-black text-slate-900 text-base">پیام شما با موفقیت دریافت گردید</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  از حسن اعتماد شما به املاک شیخی سپاسگزاریم. به زودی با شماره اعلامی تماس خواهیم گرفت.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setMessage("");
                  }}
                  className="text-xs text-emerald-800 font-bold hover:underline mt-2"
                >
                  ارسال پیام دیگر
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">نام و نام خانوادگی *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="مثال: علی احمدی"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">شماره تلفن همراه *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="۰۹۱۸..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">موضوع مشاوره</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="مشاوره خرید آپارتمان">مشاوره خرید آپارتمان در صحنه</option>
                    <option value="خرید باغ ویلای دربند">خرید یا سرمایه‌گذاری باغ ویلای دربند صحنه</option>
                    <option value="رهن و اجاره خانه">رهن و اجاره واحد مسکونی</option>
                    <option value="پیش‌فروش و مشارکت">پیش‌فروش و مشارکت در ساخت</option>
                    <option value="استعلام سند و کارشناسی قیمت">استعلام ثبتی سند و کارشناسی قیمت روز</option>
                    <option value="سایر موضوعات">سایر موضوعات</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">متن پیام یا توضیحات ملک</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="سؤال یا درخواست خود را بنویسید..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "در حال ارسال..." : "ارسال پیام به دفتر املاک شیخی"}</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
