"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import UploadForm from "@/components/admin/UploadForm";
import {
  ArrowRight,
  ImageIcon,
  Trash2,
  Copy,
  ExternalLink,
  Video,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface MediaItem {
  id: number;
  filename: string;
  originalName: string;
  url: string;
  mimeType: string;
  size: number;
  alt: string | null;
  folder: string;
  createdAt: string;
}

export default function MediaLibraryPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [folder, setFolder] = useState("properties");
  const [copied, setCopied] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/media?folder=${folder}`);
      const data = await res.json();
      if (data.items) setItems(data.items);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folder]);

  const handleDelete = async (id: number) => {
    if (!confirm("آیا مطمئن هستید این فایل حذف شود؟")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }
    } catch {
      // silent
    } finally {
      setDeleting(null);
    }
  };

  const handleCopy = async (url: string, id: number) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // silent
    }
  };

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isVideo = (mime: string) => mime.startsWith("video/");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/panel-sheikhi-2024"
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
              title="بازگشت به داشبورد"
            >
              <ArrowRight className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-emerald-700" />
                کتابخانه رسانه
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                مدیریت عکس‌ها و ویدیوهای املاک شیخی
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              className="bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="properties">📁 املاک</option>
              <option value="blog">📝 وبلاگ</option>
              <option value="general">📦 عمومی</option>
            </select>
            <button
              onClick={fetchMedia}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
              title="بارگذاری مجدد"
            >
              <Loader2 className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Upload Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h2 className="font-bold text-slate-800 mb-4 text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            آپلود فایل جدید
          </h2>
          <UploadForm folder={folder} onUploadComplete={() => fetchMedia()} />
        </div>

        {/* Gallery */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              فایل‌های ذخیره شده ({items.length})
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p>هنوز فایلی آپلود نشده است</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-slate-100 rounded-xl overflow-hidden border border-slate-200 hover:border-emerald-400 transition-all"
                >
                  <div className="relative aspect-square">
                    {isVideo(item.mimeType) ? (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                        <Video className="w-12 h-12 text-amber-300" />
                      </div>
                    ) : (
                      <Image
                        src={item.url}
                        alt={item.alt || item.originalName}
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                    )}
                    {isVideo(item.mimeType) && (
                      <span className="absolute top-2 right-2 text-[10px] font-bold bg-red-600 text-white px-1.5 py-0.5 rounded">
                        ویدیو
                      </span>
                    )}
                  </div>

                  <div className="p-2.5 bg-white">
                    <p className="text-[11px] font-medium text-slate-700 truncate">
                      {item.originalName}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {formatSize(item.size)}
                    </p>
                  </div>

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleCopy(item.url, item.id)}
                      className="p-2 rounded-lg bg-white/90 hover:bg-white text-slate-800"
                      title="کپی لینک"
                    >
                      {copied === item.id ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-white/90 hover:bg-white text-slate-800"
                      title="مشاهده"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deleting === item.id}
                      className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                      title="حذف"
                    >
                      {deleting === item.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Footer */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">نکات مهم آپلود:</p>
              <ul className="list-disc list-inside space-y-0.5 opacity-90">
                <li>عکس‌ها به صورت خودکار به WebP تبدیل می‌شوند</li>
                <li>برای ویدیوهای طولانی (بیش از ۵۰ مگابایت) از آپارات استفاده کنید</li>
                <li>نام فایل‌ها به صورت خودکار یکتا می‌شوند</li>
                <li>لینک کپی شده را می‌توانید در فرم ملک استفاده کنید</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
