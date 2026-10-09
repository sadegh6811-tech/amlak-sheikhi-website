"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard, { Property } from "@/components/PropertyCard";
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Building, 
  RotateCcw, 
  Sparkles,
  Check,
  Grid,
  List
} from "lucide-react";

export default function PropertiesClientPage() {
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [transactionType, setTransactionType] = useState<string>(searchParams.get("type") || "all");
  const [propertyType, setPropertyType] = useState<string>(searchParams.get("propertyType") || "all");
  const [neighborhood, setNeighborhood] = useState<string>(searchParams.get("neighborhood") || "all");
  const [keyword, setKeyword] = useState<string>(searchParams.get("q") || "");
  const [bedrooms, setBedrooms] = useState<string>("all");
  const [hasParking, setHasParking] = useState<boolean>(false);
  const [hasElevator, setHasElevator] = useState<boolean>(false);
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(searchParams.get("featured") === "true");

  const sahnehNeighborhoods = [
    { label: "همه مناطق و محله‌های صحنه", value: "all" },
    { label: "خیابان فردوسی", value: "خیابان فردوسی" },
    { label: "بلوار امام خمینی", value: "بلوار امام خمینی" },
    { label: "منطقه دربند و سراب صحنه", value: "دربند" },
    { label: "شهرک جانبازان", value: "شهرک جانبازان" },
    { label: "خیابان طالقانی", value: "خیابان طالقانی" },
    { label: "خیابان معلم و شقایق", value: "معلم" },
    { label: "بلوار شهید بهشتی", value: "شهید بهشتی" },
    { label: "حومه صحنه و بیدسرخ", value: "حومه" },
  ];

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (transactionType !== "all") params.set("type", transactionType);
      if (propertyType !== "all") params.set("propertyType", propertyType);
      if (neighborhood !== "all") params.set("neighborhood", neighborhood);
      if (keyword.trim()) params.set("q", keyword.trim());
      if (bedrooms !== "all") params.set("bedrooms", bedrooms);
      if (hasParking) params.set("parking", "true");
      if (hasElevator) params.set("elevator", "true");
      if (featuredOnly) params.set("featured", "true");

      const res = await fetch(`/api/properties?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setProperties(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [transactionType, propertyType, neighborhood, bedrooms, hasParking, hasElevator, featuredOnly]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProperties();
  };

  const resetFilters = () => {
    setTransactionType("all");
    setPropertyType("all");
    setNeighborhood("all");
    setKeyword("");
    setBedrooms("all");
    setHasParking(false);
    setHasElevator(false);
    setFeaturedOnly(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          جستجو و فیلتر پیشرفته فایل‌های ملکی در صحنه
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          مشاهده، مقایسه و بررسی مشخصات دقیق املاک خرید، فروش، رهن و اجاره در شهرستان صحنه
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs sticky top-24 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
                فیلترهای هوشمند
              </span>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-slate-400 hover:text-emerald-700 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>حذف فیلترها</span>
              </button>
            </div>

            {/* Keyword Search */}
            <form onSubmit={handleSearchSubmit}>
              <label className="block text-xs font-semibold text-slate-600 mb-1">جستجوی کلمه کلیدی</label>
              <div className="relative">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="مثال: نوساز، ویلا، کلید نخورده..."
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
                <button
                  type="submit"
                  className="absolute left-1.5 top-1.5 p-1.5 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Transaction Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">نوع معامله</label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {[
                  { id: "all", label: "همه موارد" },
                  { id: "buy", label: "فروش نقدی" },
                  { id: "rent", label: "رهن و اجاره" },
                  { id: "pre-sale", label: "پیش‌فروش" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTransactionType(item.id)}
                    className={`py-2 px-2.5 rounded-lg font-medium transition-colors ${
                      transactionType === item.id
                        ? "bg-emerald-700 text-white"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Neighborhood in Sahneh */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">محله در صحنه</label>
              <select
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {sahnehNeighborhoods.map((n) => (
                  <option key={n.value} value={n.value}>
                    {n.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">نوع کاربری ملک</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="all">همه کاربری‌ها</option>
                <option value="apartment">آپارتمان مسکونی</option>
                <option value="villa">خانه ویلایی دربست</option>
                <option value="land">زمین و کلنگی</option>
                <option value="garden">باغ و ویلای دشت صحنه</option>
                <option value="commercial">تجاری و مغازه</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">تعداد خواب</label>
              <div className="grid grid-cols-4 gap-1 text-xs">
                {["all", "1", "2", "3"].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBedrooms(b)}
                    className={`py-1.5 rounded-lg font-medium transition-colors ${
                      bedrooms === b
                        ? "bg-emerald-700 text-white"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {b === "all" ? "همه" : `${b} خواب`}
                  </button>
                ))}
              </div>
            </div>

            {/* Key Amenities Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-xs font-semibold text-slate-600 mb-1">امکانات ویژه</label>
              
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasParking}
                  onChange={(e) => setHasParking(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>دارای پارکینگ سندی</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasElevator}
                  onChange={(e) => setHasElevator(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>دارای آسانسور</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featuredOnly}
                  onChange={(e) => setFeaturedOnly(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>فقط فایل‌های ویژه و شاخص صحنه</span>
              </label>
            </div>

          </div>
        </div>

        {/* Property Grid Results */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Top Results bar */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="text-slate-600 font-medium">
              تعداد فایل‌های یافت‌شده در صحنه:{" "}
              <span className="font-black text-emerald-800 text-sm">{properties.length} ملک</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <span>مرتب‌سازی:</span>
              <span className="font-semibold text-slate-800 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                جدیدترین فایل‌های ثبت‌شده
              </span>
            </div>
          </div>

          {/* Loading Skeleton */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 animate-pulse space-y-3">
                  <div className="aspect-[16/10] bg-slate-200 rounded-xl"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-8 bg-slate-200 rounded mt-4"></div>
                </div>
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                ملکی با این مشخصات در شهرستان صحنه یافت نشد!
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                می‌توانید فیلترها را حذف کنید یا با کارشناسان املاک شیخی تماس بگیرید تا فایل‌های اختصاصی را بررسی نمایند.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs"
              >
                مشاهده همه فایل‌های ملکی
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
