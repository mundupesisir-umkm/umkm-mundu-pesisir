"use client";

import React from "react";
import Link from "next/link";
import { HERO_CONFIG } from "@/constants/hero";
import { useLanguage } from "@/lib/i18n";
import { WhatsAppIcon } from "@/components/icons";
import { HeroImageCard } from "./HeroImageCard";
import { cn } from "@/lib";

interface HeroSectionProps {
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const { t } = useLanguage();

  return (
    <section
      aria-label="Pengenalan Produk UMKM Mundu Pesisir"
      className={cn(
        "w-full relative overflow-hidden bg-linear-to-b from-[#f2f9f8] via-[#e8f6f5] to-[#f0f8f7] py-8 sm:py-12 md:py-14 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#d8ebe7]",
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-8 lg:gap-12 items-center">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Headline, Story, Metrics, Action Buttons     */}
          {/* ========================================================= */}
          <div className="md:col-span-7 flex flex-col gap-4 sm:gap-5 md:gap-6">
            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-[42px] xl:text-5xl font-extrabold tracking-tight leading-[1.2] font-sans">
              <span className="block text-[#0a2642] mb-1 sm:mb-1.5">
                {t.hero.titleStart}
              </span>
              <span className="block text-[#008276] leading-tight">
                {t.hero.titleHighlight}
              </span>
            </h1>

            {/* Description Text */}
            <p className="text-xs sm:text-sm md:text-[14px] lg:text-[15px] text-[#334155] leading-relaxed max-w-xl font-sans">
              {t.hero.subtitle}
            </p>

            {/* Real Impact Metrics / Stats */}
            <div className="flex items-center gap-6 sm:gap-8 md:gap-10 pt-1 pb-1">
              {t.hero.stats.map((stat, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && (
                    <div
                      className="h-8 w-px bg-[#cbd5e1]"
                      aria-hidden="true"
                    />
                  )}
                  <div className="flex flex-col">
                    <span
                      className={cn(
                        "text-xl sm:text-2xl md:text-3xl font-extrabold font-sans leading-none",
                        stat.isTeal ? "text-[#008276]" : "text-[#0a2642]"
                      )}
                    >
                      {stat.value}
                    </span>
                    <span className="text-[11px] sm:text-xs md:text-sm text-[#64748b] font-medium mt-1">
                      {stat.label}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Dual CTA Buttons (Product Catalog & Direct WhatsApp) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1.5 sm:pt-2">
              {/* Primary: Jelajahi Produk UMKM */}
              <Link
                href={HERO_CONFIG.exploreButtonHref}
                className="inline-flex items-center justify-center px-5 sm:px-6 md:px-7 py-3 sm:py-3.5 rounded-xl bg-[#008276] hover:bg-[#006e64] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center"
              >
                <span>{t.hero.exploreBtn}</span>
              </Link>

              {/* Secondary WhatsApp: Tanya via WhatsApp */}
              <a
                href={HERO_CONFIG.whatsappButtonHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 md:px-7 py-3 sm:py-3.5 rounded-xl bg-[#00c853] hover:bg-[#00b049] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center group"
              >
                <WhatsAppIcon className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200" />
                <span>{t.hero.orderWaBtn}</span>
              </a>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Featured Siwang Product Image Card           */}
          {/* ========================================================= */}
          <div className="md:col-span-5 w-full">
            <HeroImageCard />
          </div>
        </div>
      </div>
    </section>
  );
};
