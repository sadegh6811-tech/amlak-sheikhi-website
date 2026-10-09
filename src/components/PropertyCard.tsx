"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Maximize2, MapPin, Eye, Sparkles, ArrowLeft, Compass, ChevronRight, ChevronLeft } from "lucide-react";

export interface Property {
  id: number;
  title: string;
  slug: string;
  transactionType: string;
  propertyType: string;
  neighborhood: string;
  address: string;
  priceTotal: string;
  pricePerMeter?: string | null;
  rentMonthly?: string | null;
  area: number;
  bedrooms: number;
  bathrooms: number;
  floor?: number | null;
  parking?: boolean | null;
  elevator?: boolean | null;
  storage?: boolean | null;
  balcony?: boolean | null;
  documentType?: string | null;
  hasVirtualTour?: boolean | null;
  featured?: boolean | null;
  description: string;
  images: string[];
  features?: string[] | null;
  viewsCount?: number | null;
}

export default function PropertyCard({ property }: { property: Property }) {
  const [idx, setIdx] = useState(0);
  const images = property.images?.length ? property.images : ["/images/placeholder.jpg"];
  const currentImage = images[idx] ?? images[0]!;

  const badge = (() => {
    switch (property.transactionType) {
      case "buy": return { label: "فروش نقدی", bg: "bg-emerald-600 text-white" };
      case "rent": return { label: "رهن و اجاره", bg: "bg-amber-600 text-white" };
      case "pre-sale": return { label: "پیش‌فروش", bg: "bg-blue-600 text-white" };
      default: return { label: "معامله", bg: "bg-slate-700 text-white" };
    }
  })();

  const typeLabel = (() => {
    switch (property.propertyType) {
      case "apartment": return "آپارتمان";
      case "villa": return "ویلایی";
      case "land": return "زمین";
      case "garden": return "باغ";
      case "commercial": return "تجاری";
      default: return "ملک";
    }
  })();

  const nextImg = (e: React.MouseEvent) => {
    e.preventDefault();
    setIdx((i) => (i + 1) % images.length);
  };
  const prevImg = (e: React.MouseEvent) => {
    e.preventDefault();
    setIdx((i) => (i - 1 + images.length) % images.length);
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={currentImage}
          alt={property.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority={property.featured === true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />

        {images.length > 1 && (
          <>
            <button
              onClick={prevImg}
              aria-label="تصویر قبلی"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-20"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={nextImg}
              aria-label="تصویر بعدی"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-20"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-1 z-20">
              {images.slice(0, 6).map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    setIdx(i);
                  }}
                  aria-label={`تصویر ${i + 1}`}
                  className={`w-1.5 h-1.5 rounded-full ${i === idx ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm ${badge.bg}`}>
            {badge.label}
          </span>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-black/60 text-white">
            {typeLabel}
          </span>
        </div>

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {property.hasVirtualTour && (
            <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg bg-indigo-600/90 text-white">
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              تور ۳۶۰°
            </span>
          )}
          {property.featured && (
            <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg bg-amber-500 text-slate-950">
              <Sparkles className="w-3 h-3" />
              ویژه
            </span>
          )}
        </div>

        <div className="absolute bottom-2.5 right-3 left-3 flex justify-between items-center text-white text-xs z-10">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium">{property.neighborhood}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded text-[10px]">
            <Eye className="w-3 h-3" />
            <span>{property.viewsCount || 0}</span>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/property/${property.id}`} className="block group-hover:text-emerald-700 transition-colors">
            <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 mb-2">
              {property.title}
            </h3>
          </Link>

          <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-slate-100 text-slate-600 text-xs">
            <div className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{property.area} م</span>
            </div>
            <div className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-emerald-600" />
              <span>{property.bedrooms > 0 ? `${property.bedrooms} خواب` : "بدون خواب"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-emerald-600" />
              <span>طبقه {property.floor || 1}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
            {property.parking && (
              <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">پارکینگ</span>
            )}
            {property.elevator && (
              <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">آسانسور</span>
            )}
            {property.storage && (
              <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">انباری</span>
            )}
            {property.balcony && (
              <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">تراس</span>
            )}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 font-medium">قیمت کل / ودیعه:</div>
            <div className="text-base font-extrabold text-emerald-800">{property.priceTotal}</div>
            {property.rentMonthly && (
              <div className="text-xs font-semibold text-amber-700 mt-0.5">
                اجاره: {property.rentMonthly}
              </div>
            )}
          </div>

          <Link
            href={`/property/${property.id}`}
            className="flex items-center gap-1 bg-slate-100 hover:bg-emerald-700 text-slate-700 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition-all"
          >
            <span>مشاهده</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
