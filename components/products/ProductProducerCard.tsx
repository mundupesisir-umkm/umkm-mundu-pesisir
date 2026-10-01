"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { ProductItem } from "@/constants/products";

interface ProductProducerCardProps {
  product: ProductItem;
}

export const ProductProducerCard: React.FC<ProductProducerCardProps> = ({
  product,
}) => {
  const { t } = useLanguage();

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-br from-[#0a2642] to-[#0d345a] text-white shadow-xs">
      <div className="flex items-center gap-2 text-[#7ee3c8] text-xs font-bold uppercase tracking-wider mb-2">
        <MapPin className="w-4 h-4 shrink-0" />
        <span>{t.productDetail.producerOrigin}</span>
      </div>
      <h4 className="font-extrabold text-sm sm:text-base font-sans">
        {t.productDetail.producerTitle}
      </h4>
      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
        {t.productDetail.producerDesc}
      </p>
      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
        <span className="text-slate-300">{t.productDetail.producerWa}</span>
        <span className="font-mono font-bold text-[#7ee3c8]">
          {product.phone || "0812-1414-5254"}
        </span>
      </div>
    </div>
  );
};
