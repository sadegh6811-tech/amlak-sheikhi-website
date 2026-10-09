"use client";

import React, { useState, useEffect } from "react";
import { Download, X, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("pwa-dismissed") === "1") return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      timer = setTimeout(() => setShowPrompt(true), 4000);
    };

    const handleInstalled = () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
      localStorage.setItem("pwa-dismissed", "1");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleInstalled);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      alert("برای نصب، از منوی مرورگر گزینه Add to Home screen را انتخاب کنید.");
      return;
    }
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("pwa-dismissed", "1");
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm w-[calc(100%-2rem)] bg-white rounded-2xl shadow-2xl border border-emerald-200 p-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shrink-0">
          <Smartphone className="w-6 h-6 text-amber-300" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-800 text-sm">نصب وب‌اپ املاک شیخی</h4>
            <button onClick={handleDismiss} aria-label="بستن" className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            دسترسی سریع و دریافت لحظه‌ای فایل‌های جدید ملک در صحنه.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={handleInstall}
              className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold py-2 px-3 rounded-lg"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>نصب وب‌اپ</span>
            </button>
            <button onClick={handleDismiss} className="text-xs text-slate-500 py-2 px-2.5 rounded-lg border border-slate-200">
              بعداً
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
