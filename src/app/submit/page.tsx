"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PlusCircle, CheckCircle2, ShieldCheck, MapPin, Building, Phone, UploadCloud, Info } from "lucide-react";
import confetti from "canvas-confetti";

export default function SubmitPropertyPage() {
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [transactionType, setTransactionType] = useState("buy");
  const [propertyType, setPropertyType] = useState("apartment");
  const [neighborhood, setNeighborhood] = useState("خیابان فردوسی");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [priceExpected, setPriceExpected] = useState("");
  const [description, setDescription] = useState("");
  const [hasParking, setHasParking] = useState(false);
  const [hasElevator, setHasElevator] = useState(false);
  const [hasStorage, setHasStorage] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName || !phone || !area || !priceExpected) {
      alert("لطفاً فیلدهای ستاره‌دار را تکمیل نمایید.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/interactions?type=submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownerName,
          phone,
          transactionType,
          propertyType,
          neighborhood,
          address: address || `صحنه، ${neighborhood}`,
          area: Number(area),
          priceExpected,
          description,
          hasParking,
          hasElevator,
          hasStorage,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } else {
        alert("خطایی رخ داد. لطفاً مجدداً امتحان کنید.");
      }
    } catch (err) {
      console.error(err);
      alert("خطای سرور.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3.5 py-1.5 rounded-full">
          <PlusCircle className="w-4 h-4 text-emerald-600" />
          <span>سرویس ویژه مالکان در شهرستان صحنه</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          ثبت رایگان ملک و آگهی در املاک شیخی
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
          ملک خود در صحنه را بدون کمیسیون اضافه و با کارشناسی حضوری رایگان به صدها خریدار و مستأجر متقاضی برسانید.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl border border-emerald-200 p-8 sm:p-12 text-center shadow-xl space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            مشخصات ملک شما با موفقیت دریافت شد!
          </h2>
          <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
            کارشناس ارزیاب املاک شیخی در اسرع وقت جهت بازدید حضوری از ملک و هماهنگی عکاسی با شماره همراه شما تماس خواهد گرفت.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/properties"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors"
            >
              مشاهده سایر فایل‌های ملکی
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setArea("");
                setPriceExpected("");
                setDescription("");
              }}
              className="bg-slate-100 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs hover:bg-slate-200"
            >
              ثبت ملک دیگر
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* Section 1: Owner Info */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>۱. مشخصات مالک / متقاضی در صحنه</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">نام و نام خانوادگی مالک *</label>
                <input
                  type="text"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="مثال: حسن شیخی"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">شماره تماس (جهت هماهنگی بازدید) *</label>
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
          </div>

          {/* Section 2: Property Specs */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Building className="w-5 h-5 text-emerald-600" />
              <span>۲. مشخصات و نوع ملک</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">نوع معامله *</label>
                <select
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="buy">فروش نقدی</option>
                  <option value="rent">رهن و اجاره</option>
                  <option value="pre-sale">پیش‌فروش یا مشارکت در ساخت</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">نوع کاربری ملک *</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="apartment">آپارتمان مسکونی</option>
                  <option value="villa">خانه ویلایی / دربست</option>
                  <option value="land">زمین یا خانه کلنگی</option>
                  <option value="garden">باغ و باغ‌ویلا در حومه صحنه</option>
                  <option value="commercial">مغازه و تجاری</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">منطقه / محله در صحنه *</label>
                <select
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="خیابان فردوسی">خیابان فردوسی</option>
                  <option value="منطقه دربند و سراب صحنه">منطقه دربند و سراب صحنه</option>
                  <option value="بلوار امام خمینی">بلوار امام خمینی</option>
                  <option value="شهرک جانبازان">شهرک جانبازان</option>
                  <option value="خیابان طالقانی">خیابان طالقانی</option>
                  <option value="خیابان معلم">خیابان معلم و شقایق</option>
                  <option value="بلوار شهید بهشتی">بلوار شهید بهشتی</option>
                  <option value="دشت بیدسرخ و حومه">دشت بیدسرخ و حومه صحنه</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">متراژ تقریبی (متر مربع) *</label>
                <input
                  type="number"
                  required
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="مثال: ۱۲۰"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">قیمت پیشنهادی یا ودیعه مدنظر شما *</label>
                <input
                  type="text"
                  required
                  value={priceExpected}
                  onChange={(e) => setPriceExpected(e.target.value)}
                  placeholder="مثال: ۳ میلیارد و ۵۰۰ میلیون تومان یا توافقی"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">آدرس دقیق یا کوچه (محرمانه در نزد مشاور)</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="مثال: صحنه، خیابان فردوسی، نبش کوچه یاس"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap items-center gap-6 mt-4 pt-2">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasParking}
                  onChange={(e) => setHasParking(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>دارای پارکینگ</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasElevator}
                  onChange={(e) => setHasElevator(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>دارای آسانسور</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasStorage}
                  onChange={(e) => setHasStorage(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>دارای انباری</span>
              </label>
            </div>
          </div>

          {/* Section 3: Extra Notes */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1 text-xs">توضیحات تکمیلی یا شرایط ملک</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="نورگیر، وضعیت سند تک‌برگ، بازسازی شده یا نیاز به تعمیر..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            ></textarea>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white font-black py-3.5 rounded-2xl shadow-lg transition-all text-sm flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-5 h-5 text-amber-300" />
              <span>{loading ? "در حال ثبت اطلاعات..." : "ثبت نهایی فایل در بانک اطلاعاتی املاک شیخی"}</span>
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-3">
              با ثبت ملک، موافقت می‌کنید کارشناسان املاک شیخی جهت ارزیابی و هماهنگی عکاسی با شما تماس حاصل نمایند.
            </p>
          </div>

        </form>
      )}

    </div>
  );
}
