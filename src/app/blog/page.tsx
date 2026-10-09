import React from "react";
import Link from "next/link";
import { generateSeoMetadata } from "@/lib/seo";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { seedDatabase } from "@/db/seed";
import { desc } from "drizzle-orm";
import { FileText, ArrowLeft, Clock, Calendar, User, Sparkles } from "lucide-react";

export const metadata = generateSeoMetadata({
  title: "وبلاگ و تحلیل بازار مسکن شهرستان صحنه | املاک شیخی",
  description: "تحلیل هفتگی قیمت مسکن در صحنه کرمانشاه، راهنمای خرید و فروش زمین، نکات حقوقی اسناد ملکی در سراب صحنه و اخبار مسکن استان.",
  canonicalUrl: "https://amlak-sheikhi.ir/blog",
});

export const revalidate = 0;

export default async function BlogIndexPage() {
  await seedDatabase();
  const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>مرجع تخصصی مقالات و اخبار ملکی صحنه</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          وبلاگ و تحلیل بازار مسکن صحنه
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          جدیدترین تحلیل‌ها، راهنمای خرید مسکن و سرمایه‌گذاری ملکی در شهرستان صحنه و استان کرمانشاه توسط کارشناسان املاک شیخی.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 right-3 text-xs font-bold bg-white/95 text-emerald-800 px-3 py-1 rounded-xl shadow-xs backdrop-blur-xs">
                {post.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.publishedAt}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`} className="block group-hover:text-emerald-700 transition-colors">
                  <h2 className="text-lg font-black text-slate-900 leading-snug line-clamp-2 mb-2">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed text-justify">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  {post.author}
                </span>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <span>مطالعه مقاله</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
