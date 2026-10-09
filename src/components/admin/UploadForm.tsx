"use client";

import React, { useState, useRef } from "react";
import { Upload, X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface UploadResult {
  success: boolean;
  url?: string;
  filename?: string;
  mediaId?: number;
  error?: string;
  originalName?: string;
}

interface UploadFormProps {
  folder?: string;
  onUploadComplete?: (urls: string[]) => void;
  multiple?: boolean;
}

export default function UploadForm({
  folder = "properties",
  onUploadComplete,
  multiple = true,
}: UploadFormProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [results, setResults] = useState<UploadResult[]>([]);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    setIsUploading(true);
    setProgress(0);
    setResults([]);

    const formData = new FormData();
    for (const file of fileArray) {
      formData.append("files", file);
    }
    formData.append("folder", folder);

    try {
      // نمایش پیشرفت ساده
      const progressInterval = setInterval(() => {
        setProgress((p) => Math.min(p + 10, 90));
      }, 200);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      const data = await res.json();

      if (!res.ok) {
        setResults([
          {
            success: false,
            error: data.error || "خطا در آپلود",
          },
        ]);
        return;
      }

      setResults(data.uploaded || []);

      if (onUploadComplete && data.uploaded) {
        const urls = data.uploaded
          .filter((u: UploadResult) => u.success && u.url)
          .map((u: UploadResult) => u.url as string);
        onUploadComplete(urls);
      }
    } catch (err) {
      setResults([{ success: false, error: "خطای شبکه" }]);
    } finally {
      setIsUploading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
          isDragging
            ? "border-emerald-500 bg-emerald-50"
            : "border-slate-300 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50/50"
        } ${isUploading ? "opacity-60 pointer-events-none" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept="image/jpeg,image/png,image/webp,image/avif,image/gif,video/mp4,video/webm,video/quicktime"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md">
            {isUploading ? (
              <Loader2 className="w-7 h-7 text-amber-300 animate-spin" />
            ) : (
              <Upload className="w-7 h-7 text-amber-300" />
            )}
          </div>

          <div>
            <p className="font-bold text-slate-800 text-base">
              {isUploading ? "در حال آپلود..." : "فایل‌ها را اینجا رها کنید"}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              یا برای انتخاب کلیک کنید
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 text-[11px] text-slate-600">
            <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">
              🖼 عکس: حداکثر ۵ مگابایت
            </span>
            <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">
              🎬 ویدیو: حداکثر ۵۰ مگابایت
            </span>
          </div>

          <div className="text-[10px] text-slate-400">
            فرمت‌های مجاز: JPG، PNG، WebP، GIF، MP4، WebM
          </div>
        </div>
      </div>

      {isUploading && progress > 0 && (
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-700 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            نتیجه آپلود ({results.filter((r) => r.success).length} از {results.length})
          </h4>
          {results.map((r, i) => (
            <div
              key={i}
              className={`flex items-center justify-between p-2.5 rounded-lg border text-xs ${
                r.success
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {r.success ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span className="truncate font-medium">
                  {r.originalName || r.filename || "فایل"}
                </span>
              </div>
              {r.success && r.url && (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-700 hover:text-emerald-900 underline shrink-0 ml-2"
                >
                  مشاهده
                </a>
              )}
              {!r.success && r.error && (
                <span className="text-red-700 text-[10px] shrink-0 ml-2">{r.error}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
