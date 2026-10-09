"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Calendar, 
  Eye, 
  Share2, 
  Compass, 
  PhoneCall, 
  ShieldCheck, 
  FileCheck, 
  CheckCircle2, 
  ArrowRight,
  MessageCircle,
  Clock,
  Sparkles
} from "lucide-react";
import confetti from "canvas-confetti";

export default function PropertyDetailClient({ property }: { property: any }) {
  const [selectedImage, setSelectedImage] = useState<string>(
    property.images && property.images.length > 0 ? property.images[0] : "/images/placeholder.jpg"
  );

  // 360 Tour Modal / View state
  const [showTour, setShowTour] = useState(false);

  // Visit Booking Form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("فردا");
  const [preferredTime, setPreferredTime] = useState("۱۷:۰۰ تا ۱۹:۰۰");
  const [note, setNote] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert("لطفاً نام و شماره همراه خود را وارد کنید.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/interactions?type=visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: property.id,
          propertyTitle: property.title,
          fullName,
          phone,
          preferredDate,
          preferredTime,
          note,
        }),
      });

      if (res.ok) {
        setBookingSuccess(true);
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      }
    } catch (err) {
      console.error(err);
      alert("خطا در ثبت درخواست بازدید. لطفاً مستقیماً تماس بگیرید.");
    } finally {
      setSubmitting(false);
    }
  };

  const shareProperty = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `مشاهده ملک در املاک شیخی صحنه: ${property.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("لینک آگهی ملک کپی شد!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Navigation & Share */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <Link
          href="/properties"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به فهرست فایل‌های ملکی صحنه</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={shareProperty}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>اشتراک‌گذاری</span>
          </button>
          <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
            کد فایل: #{property.id + 1000}
          </span>
        </div>
      </div>

      {/* Main Title & Address */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black px-2.5 py-1 rounded-md bg-emerald-600 text-white">
            {property.transactionType === "buy" ? "فروش نقدی" : property.transactionType === "rent" ? "رهن و اجاره" : "پیش‌فروش"}
          </span>
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
            {property.propertyType === "apartment" ? "آپارتمان مسکونی" : property.propertyType === "villa" ? "خانه ویلایی دربست" : "ملک"}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            {property.viewsCount || 150} بازدید در صحنه
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
          {property.title}
        </h1>

        <div className="flex items-center gap-2 text-slate-600 text-xs sm:text-sm">
          <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{property.address}</span>
        </div>
      </div>

      {/* Gallery & 360 Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Photo View */}
        <div className="lg:col-span-8 space-y-3">
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 group">
            <img
              src={selectedImage}
              alt={property.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {property.hasVirtualTour && (
              <button
                type="button"
                onClick={() => setShowTour(true)}
                className="absolute bottom-4 right-4 bg-emerald-800/90 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 backdrop-blur-md shadow-lg transition-all"
              >
                <Compass className="w-4 h-4 text-amber-300 animate-spin" />
                <span>مشاهده تور مجازی ۳۶۰ درجه این ملک</span>
              </button>
            )}
          </div>

          {/* Thumbnails */}
          {property.images && property.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {property.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`w-24 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImage === img ? "border-emerald-600 ring-2 ring-emerald-500/20" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="تصویر بندانگشتی" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pricing Card & Quick Action */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-5">
            <div>
              <span className="text-xs text-slate-400 font-semibold block mb-1">قیمت کارشناسی شده:</span>
              <div className="text-2xl font-black text-emerald-800">{property.priceTotal}</div>
              {property.pricePerMeter && (
                <div className="text-xs font-semibold text-slate-500 mt-1">
                  قیمت هر متر: {property.pricePerMeter}
                </div>
              )}
              {property.rentMonthly && (
                <div className="text-sm font-bold text-amber-700 mt-2 p-2 bg-amber-50 rounded-xl">
                  اجاره ماهانه: {property.rentMonthly}
                </div>
              )}
            </div>

            {/* Legal Status Stamp */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>وضعیت سند: {property.documentType || "تک برگ عرصه و اعیان"}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <FileCheck className="w-4 h-4 text-amber-500" />
                <span>آماده استعلام فوری در سامانه کاتب</span>
              </div>
            </div>

            {/* Advisor Contacts */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-lg">
                  ش
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{property.advisorName || "مهندس بهزاد شیخی"}</div>
                  <div className="text-[11px] text-slate-500">مشاور تخصصی املاک در صحنه</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`tel:${property.advisorPhone || "09183381234"}`}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-amber-300" />
                  <span>تماس فوری</span>
                </a>
                <a
                  href={`https://wa.me/989183381234?text=${encodeURIComponent(`سلام، درباره ملک کد ${property.id + 1000} در صحنه سوال دارم.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold py-3 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>پیام در واتساپ</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 360 Tour Interactive Modal */}
      {showTour && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl max-w-4xl w-full p-6 text-white space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400 animate-spin" />
                <h3 className="font-bold text-base">تور مجازی ۳۶۰ درجه تعاملی — {property.title}</h3>
              </div>
              <button
                onClick={() => setShowTour(false)}
                className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-slate-300"
              >
                بستن تور (X)
              </button>
            </div>

            {/* Mock Panorama 360 Viewer */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-800">
              <img
                src={selectedImage}
                alt="360 view"
                className="w-full h-full object-cover filter brightness-90 animate-pulse duration-1000"
              />
              <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60 pointer-events-none"></div>
              <div className="absolute bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center space-y-1">
                <div className="text-xs font-bold text-amber-300 flex items-center justify-center gap-1.5">
                  <Compass className="w-4 h-4" />
                  <span>حالت پانوراما ۳۶۰ درجه فعال است</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  تصویربرداری هوایی و داخلی با تجهیزات واقعیت مجازی املاک شیخی در صحنه
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>جهت چرخش ماوس را روی تصویر حرکت دهید.</span>
              <button
                onClick={() => setShowTour(false)}
                className="text-emerald-400 hover:underline"
              >
                خروج از حالت تمام صفحه
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Property Details Grid & Features */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Specs, Description, Map */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Key Specs Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <h2 className="text-lg font-black text-slate-900 mb-4 pb-2 border-b border-slate-100">
              مشخصات اصلی ملک
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block mb-1">متراژ زمین / زیربنا:</span>
                <span className="font-extrabold text-slate-900">{property.area} متر مربع</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block mb-1">تعداد اتاق خواب:</span>
                <span className="font-extrabold text-slate-900">{property.bedrooms} خواب</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block mb-1">طبقه واحد:</span>
                <span className="font-extrabold text-slate-900">
                  طبقه {property.floor || 1} از {property.totalFloors || 1}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block mb-1">سال ساخت:</span>
                <span className="font-extrabold text-slate-900">{property.builtYear || 1400}</span>
              </div>
            </div>

            {/* Checklist of Amenities */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-500 block mb-3">امکانات رفاهی ساختمان:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${property.parking ? "bg-emerald-50/70 border-emerald-200 text-emerald-900" : "bg-slate-50 border-slate-200 text-slate-400"}`}>
                  <CheckCircle2 className={`w-4 h-4 ${property.parking ? "text-emerald-600" : "text-slate-300"}`} />
                  <span>پارکینگ سندی</span>
                </div>
                <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${property.elevator ? "bg-emerald-50/70 border-emerald-200 text-emerald-900" : "bg-slate-50 border-slate-200 text-slate-400"}`}>
                  <CheckCircle2 className={`w-4 h-4 ${property.elevator ? "text-emerald-600" : "text-slate-300"}`} />
                  <span>آسانسور استاندارد</span>
                </div>
                <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${property.storage ? "bg-emerald-50/70 border-emerald-200 text-emerald-900" : "bg-slate-50 border-slate-200 text-slate-400"}`}>
                  <CheckCircle2 className={`w-4 h-4 ${property.storage ? "text-emerald-600" : "text-slate-300"}`} />
                  <span>انباری اختصاصی</span>
                </div>
                <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${property.balcony ? "bg-emerald-50/70 border-emerald-200 text-emerald-900" : "bg-slate-50 border-slate-200 text-slate-400"}`}>
                  <CheckCircle2 className={`w-4 h-4 ${property.balcony ? "text-emerald-600" : "text-slate-300"}`} />
                  <span>بالکن و تراس</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
            <h2 className="text-lg font-black text-slate-900 pb-2 border-b border-slate-100">
              توضیحات تکمیلی و کارشناسی املاک شیخی
            </h2>
            <div className="text-sm text-slate-700 leading-loose whitespace-pre-line text-justify">
              {property.description}
            </div>

            {/* Highlights tags */}
            {property.features && property.features.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 block mb-2">امتیازات برجسته این فایل در صحنه:</span>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feat: string, i: number) => (
                    <span key={i} className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3 py-1 rounded-lg">
                      ✦ {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sahneh Interactive Map Mock */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-700" />
                <span>موقعیت مکانی ملک در شهرستان صحنه</span>
              </h2>
              <span className="text-xs text-slate-400">محدوده: {property.neighborhood}</span>
            </div>
            
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
              <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: "radial-gradient(#047857 0.75px, transparent 0.75px), radial-gradient(#d97706 0.75px, #f8fafc 0.75px)", backgroundSize: "30px 30px" }}></div>
              <div className="relative z-10 flex flex-col items-center gap-2 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-200 max-w-sm text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="font-black text-slate-800 text-xs sm:text-sm">{property.address}</div>
                <div className="text-[11px] text-slate-500">
                  لوکیشن دقیق و فایل هماهنگی پس از درخواست بازدید آنلاین ارسال می‌گردد.
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Online Visit Booking Form */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm sticky top-24 space-y-5">
            <div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md inline-block mb-1">
                سرویس اختصاصی املاک شیخی
              </span>
              <h3 className="text-lg font-black text-slate-900">
                رزرو وقت بازدید حضوری آنلاین
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                ساعت و روز دلخواهتان را انتخاب کنید؛ کارشناس مربوطه جهت هماهنگی با مالک سریعاً تماس خواهد گرفت.
              </p>
            </div>

            {bookingSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">درخواست بازدید با موفقیت ثبت شد</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  مشاوران املاک شیخی در ساعات کاری برای هماهنگی نهایی کلید با شماره شما تماس خواهند گرفت.
                </p>
                <button
                  onClick={() => setBookingSuccess(false)}
                  className="text-xs text-emerald-700 font-bold hover:underline"
                >
                  ثبت درخواست مجدد
                </button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">نام و نام خانوادگی شما</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: علی رضایی"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">شماره تلفن همراه</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">روز پیشنهادی</label>
                    <select
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                      <option value="امروز">امروز</option>
                      <option value="فردا">فردا</option>
                      <option value="پس‌فردا">پس‌فردا</option>
                      <option value="پایان هفته">پایان هفته</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">ساعت بازدید</label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                      <option value="۱۰:۰۰ تا ۱۲:۰۰">صبح (۱۰ تا ۱۲)</option>
                      <option value="۱۶:۰۰ تا ۱۸:۰۰">عصر (۱۶ تا ۱۸)</option>
                      <option value="۱۸:۰۰ تا ۲۰:۰۰">غروب (۱۸ تا ۲۰)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">توضیحات یا شرایط خرید (اختیاری)</label>
                  <textarea
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="مثلاً: خریدار نقدی هستم / نیاز به وام مسکن..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white font-bold py-3 rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2"
                >
                  <Clock className="w-4 h-4 text-amber-300" />
                  <span>{submitting ? "در حال ثبت..." : "تأیید و ارسال درخواست بازدید"}</span>
                </button>
              </form>
            )}

            <div className="pt-2 text-[11px] text-slate-400 text-center">
              اطلاعات شما کاملاً محرمانه بوده و تنها برای هماهنگی بازدید استفاده می‌شود.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
