"use client";

import React from "react";
import { Check, Layers } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { useLanguage } from "@/lib/i18n";
import { ProductVariant } from "@/constants/products";
import { cn } from "@/lib";

interface ProductOrderCardProps {
  quantity: number;
  incrementQty: () => void;
  decrementQty: () => void;
  totalPriceFormatted: string;
  whatsappOrderUrl: string;
  variants?: ProductVariant[];
  selectedVariant?: ProductVariant | null;
  onSelectVariant?: (variant: ProductVariant) => void;
}

export const ProductOrderCard: React.FC<ProductOrderCardProps> = ({
  quantity,
  incrementQty,
  decrementQty,
  totalPriceFormatted,
  whatsappOrderUrl,
  variants,
  selectedVariant,
  onSelectVariant,
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-[#008276]/30 shadow-md flex flex-col gap-5">
      {/* 1. VARIANT / SUB-PRODUCT SELECTION (IF ANY) */}
      {variants && variants.length > 0 && (
        <div className="space-y-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#008276]" />
            <h3 className="font-extrabold text-[#0a2642] text-sm sm:text-base font-sans">
              {language === "en" ? "Select Sub-Product / Variant:" : "Pilih Varian / Sub-Produk:"}
            </h3>
            <span className="text-[11px] font-bold text-[#008276] bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
              {variants.length} Pilihan
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {variants.map((v) => {
              const isSelected = selectedVariant?.name === v.name || selectedVariant?.id === v.id;
              return (
                <button
                  key={v.id || v.name}
                  type="button"
                  onClick={() => onSelectVariant?.(v)}
                  className={cn(
                    "p-3 rounded-2xl border text-left flex items-start justify-between gap-3 transition-all duration-200 cursor-pointer",
                    isSelected
                      ? "border-[#008276] bg-[#f0fdfa] ring-2 ring-[#008276]/20 shadow-xs"
                      : "border-slate-200 bg-slate-50/60 hover:bg-slate-100/80 hover:border-slate-300"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs sm:text-sm text-[#0a2642] leading-tight">
                        {v.name}
                      </span>
                    </div>
                    {v.unit && (
                      <span className="inline-block mt-1 text-[11px] font-medium text-slate-500">
                        {v.unit}
                      </span>
                    )}
                    <div className="font-extrabold text-xs sm:text-sm text-[#008276] mt-1 font-sans">
                      {v.priceFormatted}
                    </div>
                  </div>

                  <div
                    className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors mt-0.5",
                      isSelected
                        ? "bg-[#008276] text-white"
                        : "border-2 border-slate-300 bg-white"
                    )}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-3" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. QUANTITY SELECTOR */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-extrabold text-[#0a2642] text-sm sm:text-base font-sans">
            {t.productDetail.quantityTitle}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {selectedVariant ? `Kuantitas untuk ${selectedVariant.name}` : t.productDetail.quantitySubtitle}
          </p>
        </div>

        {/* Counter Buttons */}
        <div className="inline-flex items-center rounded-2xl border border-slate-300 bg-slate-50 p-1">
          <button
            type="button"
            onClick={decrementQty}
            disabled={quantity <= 1}
            className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer transition-colors shadow-2xs"
            aria-label="Kurangi jumlah"
          >
            −
          </button>
          <span className="w-12 text-center font-extrabold text-sm text-[#0a2642] font-sans">
            {quantity}
          </span>
          <button
            type="button"
            onClick={incrementQty}
            className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors shadow-2xs"
            aria-label="Tambah jumlah"
          >
            +
          </button>
        </div>
      </div>

      {/* 3. TOTAL CALCULATION DISPLAY */}
      <div className="pt-4 border-t border-slate-100 flex items-baseline justify-between">
        <div>
          <span className="text-xs text-slate-500 font-medium">
            {t.productDetail.totalEstimate.replace("{quantity}", String(quantity))}
          </span>
          {selectedVariant && (
            <span className="text-[11px] text-slate-400 block font-normal mt-0.5">
              ({selectedVariant.name} @ {selectedVariant.priceFormatted})
            </span>
          )}
        </div>
        <div className="text-xl sm:text-2xl font-extrabold text-[#008276] font-sans">
          {totalPriceFormatted}
        </div>
      </div>

      {/* 4. DIRECT WHATSAPP CALL TO ACTION */}
      <div className="pt-1">
        <a
          href={whatsappOrderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-6 rounded-2xl bg-[#00c853] hover:bg-[#00b049] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 shadow-md shadow-emerald-500/20 hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer"
        >
          <WhatsAppIcon className="w-5 h-5 text-white" />
          <span>{t.productDetail.orderWaBtn}</span>
        </a>
        <p className="text-[11px] text-center text-slate-400 mt-2 font-medium">
          {t.productDetail.orderNote}
        </p>
      </div>
    </div>
  );
};
