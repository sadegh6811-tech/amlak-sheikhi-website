import React from "react";
import Link from "next/link";
import HeroSearch from "@/components/HeroSearch";
import PropertyCard, { Property } from "@/components/PropertyCard";
import { db } from "@/db";
import { properties, blogPosts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  MapPin, 
  ArrowLeft, 
  PhoneCall, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Clock, 
  Compass, 
  Search,
  Users
} from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {

  const featuredList = await db.select().from(properties)
    .where(eq(properties.featured, true))
    .limit(6);

  const latestList = await db.select().from(properties)
    .orderBy(desc(properties.id))
    .limit(6);

  const blogs = await db.select().from(blogPosts).limit(3);

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. Big Hero Section with Wall/Delta-style Quick Search */}
      <HeroSearch />

      {/* 2. Sahneh Real Estate Neighborhoods Quick Access (Local SEO Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs mb-1">
              <MapPin className="w-4 h-4" />
              <span>موقعیت‌های استراتژیک در صحنه</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              خرید و اجاره ملک در محبوب‌ترین مناطق شهرستان صحنه
            </h2>
          </div>
          <Link
            href="/sahneh"
            className="text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
          >
            <span>راهنمای جامع محله‌های صحنه</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { name: "خیابان فردوسی", desc: "مرکز شهر و آپارتمان لوکس", count: "۳۸ فایل", href: "/properties?neighborhood=خیابان فردوسی" },
            { name: "منطقه دربند و سراب", desc: "باغ‌ویلاهای باصفا و طبیعت", count: "۴۵ فایل", href: "/properties?neighborhood=دربند" },
            { name: "بلوار امام خمینی", desc: "دسترسی عالی و رهن فوری", count: "۲۹ فایل", href: "/properties?neighborhood=بلوار امام خمینی" },
            { name: "شهرک جانبازان", desc: "زمین مسکونی و نوسازها", count: "۳۴ فایل", href: "/properties?neighborhood=شهرک جانبازان" },
            { name: "خیابان طالقانی", desc: "راسته تجاری و مغازه", count: "۱۸ فایل", href: "/properties?neighborhood=خیابان طالقانی" },
            { name: "حومه و بیدسرخ", desc: "باغ گردو و زمین کشاورزی", count: "۵۲ فایل", href: "/properties?neighborhood=حومه" },
          ].map((area, idx) => (
            <Link
              key={idx}
              href={area.href}
              className="group p-4 bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-500 hover:shadow-md transition-all text-center flex flex-col justify-between"
            >
              <div>
                <span className="inline-block p-2 rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors mb-2">
                  <MapPin className="w-4 h-4" />
                </span>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                  {area.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">{area.desc}</p>
              </div>
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full mt-3 inline-block">
                {area.count}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Properties in Sahneh */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-600 font-bold text-xs mb-1">
              <Sparkles className="w-4 h-4" />
              <span>فایل‌های کارشناسی شده و ممتاز</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              املاک ویژه و پیشنهادی «املاک شیخی»
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              بهترین قیمت‌های کارشناسی‌شده با مدارک تک‌برگ و قابلیت استعلام آنی در صحنه
            </p>
          </div>
          <Link
            href="/properties?featured=true"
            className="text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
          >
            <span>مشاهده همه ویژه ها</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredList.map((property) => (
            <PropertyCard key={property.id} property={property as Property} />
          ))}
        </div>
      </section>

      {/* 4. Interactive 360 Virtual Tour Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl">
          <div className="absolute left-0 bottom-0 w-80 h-80 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold px-3 py-1 rounded-full">
              <Compass className="w-3.5 h-3.5" />
              فناوری پیشرفته بازدید آنلاین در صحنه
            </span>
            <h3 className="text-2xl sm:text-4xl font-black leading-snug">
              تور مجازی ۳۶۰ درجه؛ قبل از حضور، داخل ملک را قدم بزنید!
            </h3>
            <p className="text-emerald-100 text-sm leading-relaxed">
              برای نخستین بار در شهرستان صحنه، با همکاری مهندسی املاک شیخی، می‌توانید قبل از بازدید حضوری، تمام جزئیات نقشه، پذیرایی، آشپزخانه و ویو باغات صحنه را به صورت پانوراما ۳۶۰ درجه بررسی کنید.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/properties"
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg"
              >
                مشاهده املاک دارای تور ۳۶۰°
              </Link>
              <Link
                href="/contact"
                className="bg-emerald-800/80 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors border border-emerald-600"
              >
                درخواست تصویربرداری ۳۶۰ از ملکتان
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Latest Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs mb-1">
              <Clock className="w-4 h-4" />
              <span>فایل‌های ملکی امروز</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              جدیدترین آگهی‌های ثبت شده در صحنه
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              به‌روزرسانی لحظه‌ای فایل‌های فروش، رهن و اجاره آپارتمان و خانه ویلایی در شهرستان صحنه
            </p>
          </div>
          <Link
            href="/properties"
            className="text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
          >
            <span>مشاهده آرشیو کامل</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestList.map((property) => (
            <PropertyCard key={property.id} property={property as Property} />
          ))}
        </div>
      </section>

      {/* 6. Why Choose Sheikhi Real Estate (Trust & Authority) */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
              چرا در شهرستان صحنه «املاک شیخی» را انتخاب می‌کنند؟
            </h2>
            <p className="text-sm text-slate-600">
              ما امنیت حقوقی و مالی سرمایه شما را در تمام مراحل خرید، فروش و رهن تضمین می‌کنیم.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">استعلام دقیق ثبتی و حقوقی</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                تمام اسناد قبل از هرگونه نشست و پرداخت، از اداره ثبت اسناد، شهرداری و اوقاف صحنه دقیقاً استعلام می‌شوند.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">صدور کدرهگیری سامانه کاتب</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                تنظیم قراردادهای رسمی با کد رهگیری کشوری آنی، بارکد دوبعدی و ثبت رسمی جهت پیشگیری از فروش مال غیر.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">اشراف کامل به مناطق صحنه</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                شناخت متری دقیق از خیابان فردوسی، دربند، شهرک جانبازان تا باغات دشت بیدسرخ و ارزیابی عادلانه قیمت.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">مشاوره رایگان سرمایه‌گذاری</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                جلسات حضوری و تلفنی رایگان برای متقاضیان خرید مسکن، پیش‌خرید سازندگان معتبر و خرید باغ‌ویلا.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Local Blog & Educational Guides for Sahneh Real Estate */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs mb-1">
              <FileText className="w-4 h-4" />
              <span>وبلاگ و تحلیل بازار مسکن</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              راهنماها و مقالات ملکی شهرستان صحنه
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
          >
            <span>همه مقالات</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((b) => (
            <div
              key={b.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 text-[11px] font-bold bg-white/90 text-slate-800 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                  {b.category}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 mb-2 flex items-center gap-2">
                    <span>{b.publishedAt}</span>
                    <span>•</span>
                    <span>{b.readTime}</span>
                  </div>
                  <Link href={`/blog/${b.slug}`} className="block group-hover:text-emerald-700 transition-colors">
                    <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 mb-2">
                      {b.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                    {b.summary}
                  </p>
                </div>
                <Link
                  href={`/blog/${b.slug}`}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <span>ادامه مطلب</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CTA Free Property Submission for Sahneh Owners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-xl space-y-3 text-center lg:text-right">
            <h3 className="text-2xl sm:text-3xl font-black">
              مالک محترم در صحنه؛ ملکتان را در کمترین زمان بفروشید یا اجاره دهید!
            </h3>
            <p className="text-emerald-100 text-sm leading-relaxed">
              اطلاعات ملک خود را رایگان ثبت کنید تا کارشناسان املاک شیخی پس از بازدید حضوری و کارشناسی قیمت، آن را به خریداران و مستأجران آماده معرفی نمایند.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/submit"
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-6 py-3.5 rounded-xl text-sm shadow-lg text-center transition-all"
            >
              ثبت رایگان مشخصات ملک
            </Link>
            <a
              href="tel:09183381234"
              className="bg-emerald-700/80 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-xl text-sm border border-emerald-500/50 flex items-center justify-center gap-2 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-amber-300" />
              <span>تماس مستقیم با مهندس شیخی</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
