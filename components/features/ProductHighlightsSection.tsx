"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { CategoryCard } from "./CategoryCard";
import { WhyUsCard } from "./WhyUsCard";
import { AdvancedPomfretFish } from "./AdvancedPomfretFish";
import { AdvancedMackerelFish } from "./AdvancedMackerelFish";
import { cn } from "@/lib";

interface ProductHighlightsSectionProps {
  className?: string;
}

export const ProductHighlightsSection: React.FC<ProductHighlightsSectionProps> = ({
  className,
}) => {
  const { t } = useLanguage();

  return (
    <section
      id="produk"
      className={cn(
        "w-full relative overflow-hidden py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8",
        // Distinct warm coastal beach sand background, different from navbar's beige-grayish sand
        "bg-linear-to-b from-[#fbf5eb] via-[#f4e6d3] to-[#fbf5eb] border-y border-[#ecd7c0]",
        className
      )}
    >
      {/* ============================================================== */}
      {/* ADVANCED FISH 1: Ikan Bawal / Pomfret (Round Body) on the left */}
      {/* ============================================================== */}
      <div className="absolute left-0 sm:left-4 lg:left-8 bottom-6 sm:bottom-10 w-64 sm:w-80 lg:w-96 pointer-events-none opacity-80 sm:opacity-90 z-0">
        <AdvancedPomfretFish className="w-full h-auto" />
      </div>

      {/* ============================================================== */}
      {/* ADVANCED FISH 2: Ikan Tenggiri / Mackerel (Long Torpedo) right */}
      {/* ============================================================== */}
      <div className="absolute right-0 sm:right-4 lg:right-8 top-6 sm:top-10 w-72 sm:w-88 lg:w-104 pointer-events-none opacity-80 sm:opacity-90 z-0">
        <AdvancedMackerelFish className="w-full h-auto" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-10 sm:gap-12 lg:gap-14">
        {/* ============================================================== */}
        {/* PART 1: KATEGORI UNGGULAN (Produk Khas Hasil Olahan Pesisir) */}
        {/* ============================================================== */}
        <div className="flex flex-col items-center">
          {/* Section Header - Compact Spacing */}
          <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-6">
            <span className="block text-[11px] sm:text-xs font-bold tracking-widest text-[#8a6843] uppercase font-sans mb-1">
              {t.features.categoriesBadge}
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0a2642] tracking-tight font-sans">
              {t.features.categoriesHeadline}
            </h2>
            <p className="text-xs sm:text-sm text-[#5a6b7c] mt-1.5 leading-relaxed max-w-xl mx-auto font-sans">
              {t.features.categoriesSubtitle}
            </p>
          </div>

          {/* Category Cards Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {t.features.categories.map((category) => (
              <CategoryCard key={category.id} item={category} />
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* PART 2: KUALITAS PESISIR (Kenapa Memilih Produk UMKM Mundu?)  */}
        {/* ============================================================== */}
        <div id="keunggulan" className="flex flex-col items-center">
          {/* Section Header - Compact Spacing */}
          <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-6">
            <span className="block text-[11px] sm:text-xs font-bold tracking-widest text-[#8a6843] uppercase font-sans mb-1">
              {t.features.badge}
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0a2642] tracking-tight font-sans">
              {t.features.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#5a6b7c] mt-1.5 leading-relaxed max-w-xl mx-auto font-sans">
              {t.features.subtitle}
            </p>
          </div>

          {/* Why Us Value Cards Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {t.features.whyUs.map((feature) => (
              <WhyUsCard key={feature.id} item={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
