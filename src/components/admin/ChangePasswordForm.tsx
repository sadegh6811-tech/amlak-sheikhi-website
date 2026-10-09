"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "خطا در تغییر رمز");
        setLoading(false);
        return;
      }

      setSuccess(data.message || "رمز عبور با موفقیت تغییر کرد ✅");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("خطای شبکه");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5">
          رمز عبور فعلی
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
          <input
            type={showCurrent ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-10 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            placeholder="رمز فعلی خود را وارد کنید"
            required
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute left-3.5 top-3.5 text-slate-400 hover:text-slate-600"
          >
            {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5">
          رمز عبور جدید
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
          <input
            type={showNew ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-10 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            placeholder="حداقل ۸ کاراکتر"
            required
            minLength={8}
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute left-3.5 top-3.5 text-slate-400 hover:text-slate-600"
          >
            {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-[11px] text-slate-500 mt-1.5">
          💡 توصیه: شامل حروف بزرگ، کوچک، اعداد و نماد باشد
        </p>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5">
          تکرار رمز جدید
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            placeholder="رمز جدید را دوباره وارد کنید"
            required
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2.5 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-3 py-2.5 rounded-xl">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 disabled:opacity-60 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-700/30 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>در حال تغییر...</span>
          </>
        ) : (
          <span>🔐 تغییر رمز عبور</span>
        )}
      </button>
    </form>
  );
}
