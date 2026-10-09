"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Lock, Mail, AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "خطا در ورود");
        setLoading(false);
        return;
      }

      router.push("/panel-sheikhi-2024");
      router.refresh();
    } catch {
      setError("خطای شبکه. دوباره تلاش کنید.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-emerald-100">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-900 flex items-center justify-center shadow-lg">
              <Building2 className="w-10 h-10 text-amber-300" />
            </div>
            <h1 className="text-2xl font-black text-slate-800">پنل مدیریت</h1>
            <p className="text-sm text-slate-500 mt-1">املاک شیخی — شهرستان صحنه</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1.5">
                ایمیل
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  placeholder="admin@amlak-sheikhi.ir"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-1.5">
                رمز عبور
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  placeholder="••••••••"
                  dir="ltr"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2.5 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-700/30 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>در حال ورود...</span>
                </>
              ) : (
                <span>ورود به پنل</span>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-6">
            دسترسی فقط برای کاربران مجاز | 2FA فعال
          </p>
        </div>
      </div>
    </div>
  );
}
