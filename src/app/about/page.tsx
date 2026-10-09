import React from "react";
import Link from "next/link";
import { generateSeoMetadata } from "@/lib/seo";
import { Building2, ShieldCheck, Award, MapPin, Phone, Users, CheckCircle, Target, Sparkles } from "lucide-react";

export const metadata = generateSeoMetadata({
  title: "درباره املاک شیخی در شهرستان صحنه | سابقه و تعهدات",
  description: "آشنایی با دفتر مهندسی و مشاور املاک شیخی در صحنه کرمانشاه؛ با مدیریت مهندس بهزاد شیخی، صدور آنی کد رهگیری کشوری در سامانه کاتب و پروانه تخصصی اتحادیه.",
  canonicalUrl: "https://amlak-sheikhi.ir/about",
});

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero */}
      <div className="bg-gradient-to-b from-emerald-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-emerald-800 text-amber-300 text-xs font-bold px-3 py-1 rounded-full">
            <Award className="w-4 h-4" />
            <span>بیش از ۱۵ سال خدمت صادقانه به همشهریان عزیز صحنه</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">
            املاک شیخی؛ نماد اعتماد و اصالت معاملات در شهرستان صحنه
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            تلاش ما در املاک شیخی همواره بر این بوده که معاملات ملکی را در محیطی امن، شفاف، قانونی و به دور از هرگونه ابهام برای همشهریان شریف صحنه و سرمایه‌گذاران محترم سراسر کشور رقم بزنیم.
          </p>
        </div>
      </div>

      {/* Main Story & Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-sm text-slate-700 leading-relaxed text-justify">
            <h2 className="text-2xl font-black text-slate-900">
              درباره مدیریت و رسالت املاک شیخی در صحنه
            </h2>
            <p>
              دفتر مشاور املاک شیخی با مدیریت <strong>مهندس بهزاد شیخی</strong>، با بهره‌گیری از دانش روز مهندسی عمران، حقوق املاک و ثبت اسناد، با هدف ارتقای استانداردهای معاملات ملکی در شهرستان صحنه پایه‌گذاری شد.
            </p>
            <p>
              شهرستان سرسبز و کوهستانی صحنه به دلیل منابع آبی غنی، باغات میوه کم‌نظیر و آب‌وهوای مفرح، همواره مقصدی بی‌نظیر برای سکونت و سرمایه‌گذاری بوده است. با این حال، تعدد انواع اسناد از قبیل اسناد مشاعی، قولنامه‌ای و اصلاحات ارضی، لزوم حضور یک تیم متخصص و مسلط به قوانین ثبتی را دوچندان کرده است.
            </p>
            <p>
              ما در املاک شیخی متعهد هستیم که قبل از امضای هرگونه مبایعه‌نامه، هویت و مالکیت طرفین، استعلامات دارایی، شهرداری صحنه و سازمان ثبت اسناد را به صورت موشکافانه پیگیری نماییم تا با خیالی آسوده صاحب ملک رویایی خود شوید.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <span className="text-2xl font-black text-emerald-800 block">۱۵+ سال</span>
                <span className="text-xs text-slate-600">سابقه درخشان در بازار صحنه</span>
              </div>
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <span className="text-2xl font-black text-amber-800 block">۲٬۴۰۰+</span>
                <span className="text-xs text-slate-600">قرارداد موفق و بدون اختلاف حقوقی</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
                alt="دفتر املاک شیخی صحنه"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-emerald-800 text-white p-5 rounded-2xl shadow-xl border border-emerald-600 hidden sm:block">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-amber-400" />
                <div>
                  <div className="font-bold text-sm">مجوز رسمی اتحادیه املاک صحنه</div>
                  <div className="text-xs text-emerald-200">پروانه تخصصی درجه یک کاتب</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pillars */}
      <div className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">ارزش‌های بنیادین ما</h2>
            <p className="text-xs sm:text-sm text-slate-600">چهار اصل جدایی‌ناپذیر در کلیه معاملات املاک شیخی در صحنه</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-xs text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">صداقت و شفافیت کامل</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                اعلام قیمت واقعی مالک بدون کوچک‌ترین افزایش یا مخفی‌کاری در کمیسیون.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs text-center space-y-3">
              <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center mx-auto">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">دقت در اسناد و متراژ</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                راستی‌آزمایی متراژ، حدود اربعه، پروانه ساخت و عدم خلافی قبل از تنظیم قرارداد.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">فناوری‌های نوین (PWA & 360)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                ارائه تورهای ۳۶۰ درجه، وبلاگ تحلیل بازار و سامانه آنلاین رزرو بازدید برای اولین بار در صحنه.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs text-center space-y-3">
              <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">همراهی تا انتقال سند</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                حضور در دفترخانه اسناد رسمی، پیگیری استعلامات و تحویل کلید تا آخرین لحظه.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
