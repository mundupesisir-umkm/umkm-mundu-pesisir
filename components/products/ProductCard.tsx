"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductItem } from "@/constants/products";
import { useLanguage } from "@/lib/i18n";
import { cn, formatWhatsAppNumber } from "@/lib";

interface ProductCardProps {
  product: ProductItem;
  onOpenDetail?: (product: ProductItem) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetail,
  className,
}) => {
  const { t, language } = useLanguage();
  const targetPhone = formatWhatsAppNumber(product.phone);
  const waText =
    language === "en"
      ? `Hello Mundu Pesisir Artisan, I would like to order *${product.name}* priced at ${product.priceFormatted}. Is stock currently available?`
      : `Halo Pengrajin UMKM Mundu Pesisir, saya ingin memesan *${product.name}* seharga ${product.priceFormatted}. Apakah stok masih tersedia?`;

  const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(waText)}`;

  return (
    <div
      className={cn(
        "rounded-3xl p-3 sm:p-3.5 bg-white border border-slate-100 shadow-md shadow-slate-200/60 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group",
        className
      )}
    >
      <div>
        {/* Aspect Ratio 4:3 Image Container */}
        <Link
          href={`/produk/${encodeURIComponent(product.id)}`}
          className="block relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-100"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Text Content */}
        <div className="p-2 sm:p-3 flex flex-col gap-1 mt-1">
          {/* Category Label */}
          <span className="text-[10px] sm:text-[11px] font-bold text-[#008276] uppercase tracking-wider">
            {product.categoryLabel}
          </span>

          {/* Product Title */}
          <Link href={`/produk/${encodeURIComponent(product.id)}`}>
            <h3 className="font-bold text-xs sm:text-sm md:text-[15px] text-[#0a2642] hover:text-[#008276] transition-colors font-sans leading-snug line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-[11px] sm:text-xs text-[#64748b] leading-relaxed line-clamp-2 mt-0.5">
            {product.description}
          </p>

          {/* Price */}
          <div className="text-base sm:text-lg font-extrabold text-[#008276] font-sans mt-2">
            {product.priceFormatted}
          </div>
        </div>
      </div>

      {/* Action Buttons: Detail & Order via WhatsApp */}
      <div className="grid grid-cols-2 gap-2 p-2 pt-1 border-t border-slate-100/80">
        {/* Detail Button */}
        <Link
          href={`/produk/${encodeURIComponent(product.id)}`}
          className="py-2 px-3 rounded-xl bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#334155] text-xs sm:text-sm font-semibold text-center transition-colors"
        >
          {t.catalog.detailBtn}
        </Link>

        {/* Order WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2 px-3 rounded-xl bg-[#00c853] hover:bg-[#00b049] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs group-hover:shadow-xs active:translate-y-0"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0"
            aria-hidden="true"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          <span>{t.catalog.orderBtn}</span>
        </a>
      </div>
    </div>
  );
};
