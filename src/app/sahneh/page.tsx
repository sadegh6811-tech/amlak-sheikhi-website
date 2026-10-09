import React from "react";
import Link from "next/link";
import { generateSeoMetadata } from "@/lib/seo";
import { MapPin, Trees, Mountain, Building, ArrowLeft, PhoneCall, Sparkles } from "lucide-react";

export const metadata = generateSeoMetadata({
  title: "راهنمای محله‌های شهرستان صحنه | قیمت ملک و باغات",
  description: "بررسی تخصصی محله‌های مسکونی و باغات شهرستان صحنه، خیابان فردوسی، سراب و دربند صحنه، شهرک جانبازان، قیمت‌های متری و تحلیل آینده بازار مسکن.",
  canonicalUrl: "https://amlak-sheikhi.ir/sahneh",
});

export default function SahnehNeighborhoodsPage() {
  const neighborhoods = [
    {
      id: "darband",
      name: "منطقه گردشگری و باغات دربند صحنه",
      badge: "طبیعت بکر و ویلاسازی",
      desc: "دربند صحنه با آبشارهای خروشان، درختان کهنسال گردو و هوای مطبوع، بهشت سرمایه‌گذاران باغ‌ویلا در غرب کشور است. دسترسی سریع به سراب و چشم‌اندازهای کوهستانی بی‌مانند، املاک این منطقه را به ممتازترین گزینه‌های استان تبدیل کرده است.",
      priceRange: "متری ۲۵ الی ۵۰ میلیون تومان (بسته به دسترسی و سند)",
      popularTypes: "باغ‌ویلا، عمارت تفریحی، زمین زراعی با حقابه",
      features: ["آب گوارای سراب", "امنیت عالی", "پتانسیل بوم‌گردی"],
      bg: "from-emerald-900 to-emerald-950",
    },
    {
      id: "ferdousi",
      name: "خیابان فردوسی (قلب شهری صحنه)",
      badge: "گران‌قیمت‌ترین آپارتمان‌ها",
      desc: "خیابان فردوسی به عنوان شریان اصلی و لوکس‌ترین معبر مسکونی شهرستان صحنه شناخته می‌شود. ساختمان‌های نوساز مهندسی‌ساز، لابی‌های مجلل، متریال ساختمانی روز و دسترسی بی‌واسطه به بهترین مراکز خدماتی و درمانی شهر در این محور قرار دارند.",
      priceRange: "متری ۲۸ الی ۴۲ میلیون تومان برای نوسازها",
      popularTypes: "آپارتمان‌های ۳ خوابه، واحدهای لوکس و اداری",
      features: ["دسترسی شهری فوق‌العاده", "ساختمان‌های برند", "پارکینگ‌های اختصاصی"],
      bg: "from-slate-900 to-slate-950",
    },
    {
      id: "emam",
      name: "بلوار امام خمینی (محور اصلی اداری و تجاری)",
      badge: "دسترسی عالی و رهن پرطرفدار",
      desc: "بلوار امام خمینی با اتصال میادین مهم شهر، نزدیکی به بانک‌ها، دادگستری و شهرداری، بیشترین درخواست رهن و اجاره را در شهرستان صحنه به خود اختصاص داده است. خرید ملک در این بلوار نقدشوندگی بسیار سریعی دارد.",
      priceRange: "متری ۲۲ الی ۳۴ میلیون تومان",
      popularTypes: "واحدهای دو خوابه، مجتمع‌های مسکونی خوش‌ساخت",
      features: ["بازار اجاره بسیار داغ", "نزدیکی به ادارات", "پاخور تجاری مناسب"],
      bg: "from-emerald-950 to-slate-900",
    },
    {
      id: "janbazan",
      name: "شهرک جانبازان (کانون نوسازی و سرمایه‌گذاری)",
      badge: "بهترین منطقه برای خرید زمین",
      desc: "شهرک جانبازان با خیابان‌بندی‌های منظم، کوچه‌های عریض، تراکم ساختمانی استاندارد و اسناد تفکیکی تک‌برگ، قطب ساخت‌وساز مدرن در صحنه به حساب می‌آید. سازندگان برتر شهر صحنه پروژه‌های متعددی در این منطقه در دست ساخت دارند.",
      priceRange: "متری ۱۰ الی ۱۶ میلیون تومان زمین / متری ۲۴ الی ۲۸ میلیون آپارتمان",
      popularTypes: "زمین دو کله مسکونی، پیش‌فروش، آپارتمان کلید نخورده",
      features: ["خیابان‌های پهن و نوساز", "نقشه‌های منظم UTM", "قابلیت رشد ارزش بالا"],
      bg: "from-teal-950 to-slate-900",
    },
    {
      id: "taleghani",
      name: "خیابان طالقانی و بازار سنتی",
      badge: "مرکز خرید و تجاری",
      desc: "مرکز پرجنب‌وجوش خرید و فروش مغازه و سرقفلی در صحنه. اگر به دنبال سرمایه‌گذاری ملکی با بازدهی نقدی ماهیانه و ارزش افزوده تجاری هستید، بر خیابان طالقانی و فرعی‌های پرتردد آن بهترین بازدهی را فراهم می‌کنند.",
      priceRange: "متری ۱۰۰ الی ۲۰۰ میلیون تومان برای مغازه‌ها",
      popularTypes: "مغازه تجاری، ملک اداری، دفتر وکالت و مطب",
      features: ["بیشترین تردد عابر پیاده", "کنتورهای تجاری مستقل", "سند قطعی مالکیت و سرقفلی"],
      bg: "from-amber-950 to-slate-900",
    },
    {
      id: "bid-sorkh",
      name: "دشت بیدسرخ و حومه صحنه",
      badge: "باغات گردو و زمین‌های کشاورزی",
      desc: "دشت حاصلخیز بیدسرخ و روستاهای اطراف صحنه قطب اصلی باغات گردوی پرمحصول و مزارع با سهمیه آب چاه عمیق هستند. املاک شیخی مرجع تخصصی معاملات این اراضی با استعلامات جهاد کشاورزی و منابع طبیعی است.",
      priceRange: "متری ۲ الی ۶ میلیون تومان برای باغات",
      popularTypes: "باغ گردو، زمین زراعی، مرغداری و سوله",
      features: ["حقابه چاه عمیق", "سند مشاعی و کدرهگیری معتبر", "آب‌وهوای چهارفصل دشت"],
      bg: "from-emerald-900 to-teal-950",
    },
  ];

  return (
    <div className="space-y-12 pb-20">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-800/80 px-4 py-1.5 rounded-full text-amber-300 text-xs font-bold border border-emerald-600">
            <Mountain className="w-4 h-4 text-amber-400" />
            <span>شناخت بومی بازار مسکن شهرستان صحنه</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            راهنمای محله‌ها و قیمت مسکن در صحنه کرمانشاه
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            کجا در صحنه آپارتمان بخریم؟ بهترین منطقه برای خرید باغ‌ویلا و زمین کجاست؟ در این صفحه با ویژگی‌ها، رنج قیمتی و پتانسیل سرمایه‌گذاری هر منطقه آشنا شوید.
          </p>
        </div>
      </div>

      {/* Neighborhood Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {neighborhoods.map((n) => (
            <div
              key={n.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className={`p-6 bg-gradient-to-br ${n.bg} text-white`}>
                  <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 inline-block mb-3">
                    {n.badge}
                  </span>
                  <h2 className="text-xl font-black">{n.name}</h2>
                </div>

                <div className="p-6 space-y-4 text-xs sm:text-sm text-slate-600">
                  <p className="leading-relaxed text-justify text-slate-700">
                    {n.desc}
                  </p>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 space-y-1">
                    <span className="text-[11px] font-bold text-emerald-900 block">محدوده قیمت تقریبی:</span>
                    <span className="font-extrabold text-emerald-800 text-xs sm:text-sm">{n.priceRange}</span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-500 block mb-1">نوع ملک‌های شاخص:</span>
                    <span className="text-xs font-semibold text-slate-800">{n.popularTypes}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {n.features.map((f, i) => (
                      <span key={i} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/properties?neighborhood=${encodeURIComponent(n.name.split(" ")[0])}`}
                  className="w-full bg-slate-100 hover:bg-emerald-700 text-slate-800 hover:text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>مشاهده فایل‌های ملکی این منطقه</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advisory Section */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 sm:p-8 text-center space-y-3">
          <Sparkles className="w-8 h-8 text-amber-600 mx-auto" />
          <h3 className="text-lg font-black text-slate-900">
            هنوز مرددید کدام منطقه صحنه برای شما مناسب‌تر است؟
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            بودجه و اولویت‌های خانواده یا کسب‌وکار خود را با مهندس بهزاد شیخی در میان بگذارید تا مناسب‌ترین فایل‌ها به شما پیشنهاد شود.
          </p>
          <div className="pt-2">
            <a
              href="tel:09183381234"
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-amber-300" />
              <span>تماس برای مشاوره تخصصی مناطق صحنه: ۰۹۱۸۳۳۸۱۲۳۴</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
