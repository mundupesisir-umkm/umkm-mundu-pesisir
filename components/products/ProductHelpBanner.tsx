"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { useLanguage } from "@/lib/i18n";
import { ProductItem } from "@/constants/products";

interface ProductHelpBannerProps {
  product: ProductItem;
  targetPhone: string;
}

export const ProductHelpBanner: React.FC<ProductHelpBannerProps> = ({
  product,
  targetPhone,
}) => {
  const { t, language } = useLanguage();

  const consultationMsg =
    language === "en"
      ? `Hello Mundu Pesisir Artisan, I would like to consult about ordering ${product.name}.`
      : `Halo Pengrajin UMKM Mundu Pesisir, saya ingin berkonsultasi mengenai pemesanan produk ${product.name}.`;

  const waConsultUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(
    consultationMsg
  )}`;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
      <div className="rounded-3xl p-6 sm:p-8 md:p-10 bg-linear-to-r from-[#0a2642] via-[#0d345a] to-[#0a2642] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#7ee3c8] text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t.productDetail.relatedSubtitle}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold font-sans">
            {t.productDetail.helpTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            {t.productDetail.helpSubtitle}
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <a
            href={waConsultUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-[#00c853] hover:bg-[#00b049] text-white text-xs sm:text-sm font-bold shadow-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>{t.productDetail.chatWaBtn}</span>
          </a>
          <Link
            href="/kontak"
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold transition-all inline-flex items-center justify-center gap-2"
          >
            <span>{t.productDetail.contactVillageBtn}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
