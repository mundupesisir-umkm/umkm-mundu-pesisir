"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Share2, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { ProductItem } from "@/constants/products";

interface ProductDetailBreadcrumbProps {
  product: ProductItem;
}

export const ProductDetailBreadcrumb: React.FC<ProductDetailBreadcrumbProps> = ({
  product,
}) => {
  const { t } = useLanguage();
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="border-b border-slate-200/80 sticky top-0 z-30 shadow-2xs backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-none"
        >
          <Link
            href="/"
            className="hover:text-[#008276] font-medium transition-colors"
          >
            {t.productDetail.breadcrumbHome}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link
            href="/produk"
            className="hover:text-[#008276] font-medium transition-colors"
          >
            {t.productDetail.breadcrumbCatalog}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-[#008276] font-bold">
            {product.categoryLabel}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:inline" />
          <span className="text-slate-800 font-semibold truncate max-w-45 sm:max-w-xs hidden sm:inline">
            {product.name}
          </span>
        </nav>

        {/* Action Buttons: Copy Link & Back */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyLink}
            title={t.productDetail.shareBtn}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">
                  {t.productDetail.copiedBtn}
                </span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">
                  {t.productDetail.shareBtn}
                </span>
              </>
            )}
          </button>
          <Link
            href="/produk"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#008276]/10 hover:bg-[#008276]/20 text-[#008276] text-xs font-bold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.productDetail.allProductsBtn}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
