import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { generateSeoMetadata } from "@/lib/seo";
import { Calendar, Clock, User, ArrowRight, Share2, Tag, Sparkles, Building2, PhoneCall } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
  const post = res[0];

  if (!post) {
    return { title: "مقاله یافت نشد | املاک شیخی" };
  }

  return generateSeoMetadata({
    title: `${post.title} | املاک شیخی صحنه`,
    description: post.summary,
    canonicalUrl: `https://amlak-sheikhi.ir/blog/${post.slug}`,
    image: post.image,
  });
}

export default async function BlogPostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
  const post = res[0];

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back button */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به مقالات ملکی صحنه</span>
        </Link>
      </div>

      {/* Title & Metadata */}
      <div className="space-y-4">
        <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg">
          {post.category}
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-200">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-emerald-600" />
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            انتشار: {post.publishedAt}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            زمان مطالعه: {post.readTime}
          </span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-lg border border-slate-200">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Summary Box */}
      <div className="bg-emerald-50/60 border-r-4 border-emerald-600 p-5 rounded-2xl text-slate-700 text-sm leading-relaxed">
        <p className="font-bold text-emerald-950 mb-1">خلاصه این تحلیل ملکی:</p>
        <p>{post.summary}</p>
      </div>

      {/* Main Content */}
      <div className="prose prose-emerald max-w-none text-sm sm:text-base text-slate-800 leading-loose whitespace-pre-line text-justify">
        {post.content}
      </div>

      {/* Author & Advisory Callout */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-right">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-400 text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>مشاوره تخصصی با نویسنده این مقاله</span>
          </div>
          <h3 className="text-xl font-black">
            نیاز به تحلیل دقیق‌تر ملک یا استعلام در صحنه دارید؟
          </h3>
          <p className="text-xs text-slate-300">
            مهندس بهزاد شیخی و تیم کارشناسی املاک شیخی آماده پاسخگویی به سوالات شما هستند.
          </p>
        </div>
        <a
          href="tel:09183381234"
          className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-6 py-3 rounded-xl text-xs flex items-center gap-2 shrink-0 transition-colors shadow-lg"
        >
          <PhoneCall className="w-4 h-4" />
          <span>تماس با ۰۹۱۸۳۳۸۱۲۳۴</span>
        </a>
      </div>

    </article>
  );
}
