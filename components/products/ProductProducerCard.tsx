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

  const producer = React.useMemo(() => {
    const text = `${product.categoryLabel} ${product.name}`.toLowerCase();
    if (text.includes("magfiro")) {
      return {
        name: "UMKM Ibu Magfiro",
        desc: "Diproduksi langsung oleh Ibu Magfiro, pengrajin kuliner Siwang renyah dan sambal seafood khas pesisir Desa Mundu Pesisir Cirebon.",
      };
    }
    if (text.includes("santi")) {
      return {
        name: "UMKM Ibu Santi",
        desc: "Disediakan langsung oleh Ibu Santi, penyedia beras pulen pilihan berkualitas tinggi hasil panen pertanian lokal Cirebon.",
      };
    }
    if (text.includes("maemunah")) {
      return {
        name: "UMKM Ibu Siti Maemunah",
        desc: "Diproduksi langsung oleh Ibu Siti Maemunah, pengrajin olahan ikan laut segar, bandeng presto duri lunak, dan pindang biles khas Mundu Pesisir.",
      };
    }
    return {
      name: t.productDetail.producerTitle,
      desc: t.productDetail.producerDesc,
    };
  }, [product, t]);

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-br from-[#0a2642] to-[#0d345a] text-white shadow-xs">
      <div className="flex items-center gap-2 text-[#7ee3c8] text-xs font-bold uppercase tracking-wider mb-2">
        <MapPin className="w-4 h-4 shrink-0" />
        <span>{t.productDetail.producerOrigin}</span>
      </div>
      <h4 className="font-extrabold text-sm sm:text-base font-sans">
        {producer.name}
      </h4>
      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
        {producer.desc}
      </p>
      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
        <span className="text-slate-300">{t.productDetail.producerWa}</span>
        <span className="font-mono font-bold text-[#7ee3c8]">
          {product.phone || "0822-1618-2885"}
        </span>
      </div>
    </div>
  );
};
