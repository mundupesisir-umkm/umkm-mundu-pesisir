"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { useLanguage } from "@/lib/i18n";

interface ProductOrderCardProps {
  quantity: number;
  incrementQty: () => void;
  decrementQty: () => void;
  totalPriceFormatted: string;
  whatsappOrderUrl: string;
}

export const ProductOrderCard: React.FC<ProductOrderCardProps> = ({
  quantity,
  incrementQty,
  decrementQty,
  totalPriceFormatted,
  whatsappOrderUrl,
}) => {
  const { t } = useLanguage();

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-[#008276]/30 shadow-md flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-extrabold text-[#0a2642] text-sm sm:text-base font-sans">
            {t.productDetail.quantityTitle}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.productDetail.quantitySubtitle}
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

      {/* Total Calculation Display */}
      <div className="pt-4 border-t border-slate-100 flex items-baseline justify-between">
        <div>
          <span className="text-xs text-slate-500 font-medium">
            {t.productDetail.totalEstimate.replace("{quantity}", String(quantity))}
          </span>
        </div>
        <div className="text-xl sm:text-2xl font-extrabold text-[#008276] font-sans">
          {totalPriceFormatted}
        </div>
      </div>

      {/* Direct WhatsApp Call to Action */}
      <div className="pt-2">
        <a
          href={whatsappOrderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-6 rounded-2xl bg-[#00c853] hover:bg-[#00b049] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 shadow-md shadow-emerald-500/20 hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer"
        >
          <WhatsAppIcon className="w-4 h-4 shrink-0 text-white" />
          <span>{t.productDetail.orderWaBtn}</span>
        </a>
      </div>

      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
        <MessageCircle className="w-3.5 h-3.5" />
        <span>{t.productDetail.orderNote}</span>
      </div>
    </div>
  );
};
