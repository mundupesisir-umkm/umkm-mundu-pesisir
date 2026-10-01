"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, PackageCheck, Clock, Truck, Award } from "lucide-react";
import { ProductItem } from "@/constants/products";
import { useLanguage } from "@/lib/i18n";

interface ProductDetailGalleryProps {
  product: ProductItem;
  shelfLifeText?: string;
}

export const ProductDetailGallery: React.FC<ProductDetailGalleryProps> = ({
  product,
  shelfLifeText,
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col gap-5">
      {/* Big Main Image Container */}
      <div className="relative aspect-4/3 w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-md group">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 520px"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Tag / Badge Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="px-3.5 py-1.5 rounded-xl bg-[#0a2642]/85 backdrop-blur-md text-white text-[11px] font-bold tracking-wide shadow-xs border border-white/20">
            {product.categoryLabel}
          </span>
          {product.badge && (
            <span className="px-3 py-1 rounded-xl bg-[#008276] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Artisan Verified Stamp */}
        <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/80 text-[#0a2642] text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
          <Award className="w-4 h-4 text-[#008276]" />
          <span>{t.productDetail.artisanStamp}</span>
        </div>
      </div>

      {/* Trust Badges Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">
              {t.productDetail.badgePreservative}
            </h4>
            <p className="text-[11px] text-slate-500">
              {t.productDetail.badgePreservativeSub}
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#008276] flex items-center justify-center shrink-0 border border-teal-100">
            <PackageCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">
              {t.productDetail.badgePackaging}
            </h4>
            <p className="text-[11px] text-slate-500">
              {t.productDetail.badgePackagingSub}
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">
              {t.productDetail.badgeShelfLife}
            </h4>
            <p className="text-[11px] text-slate-500">
              {shelfLifeText ||
                product.details?.shelfLife ||
                (language === "en" ? "3–4 Months" : "3–4 Bulan")}
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">
              {t.productDetail.badgeShipping}
            </h4>
            <p className="text-[11px] text-slate-500">
              {t.productDetail.badgeShippingSub}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
