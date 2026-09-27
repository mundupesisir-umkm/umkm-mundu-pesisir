"use client";

import React from "react";
import Link from "next/link";
import { HERO_CONFIG } from "@/constants/hero";
import { HeroImageCard } from "./HeroImageCard";
import { cn } from "@/lib";

interface HeroSectionProps {
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
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
                {HERO_CONFIG.headlineBlack}
              </span>
              <span className="block text-[#008276] leading-tight">
                {HERO_CONFIG.headlineTeal}
              </span>
            </h1>

            {/* Description Text */}
            <p className="text-xs sm:text-sm md:text-[14px] lg:text-[15px] text-[#334155] leading-relaxed max-w-xl font-sans">
              {HERO_CONFIG.description}
            </p>

            {/* Real Impact Metrics / Stats */}
            <div className="flex items-center gap-6 sm:gap-8 md:gap-10 pt-1 pb-1">
              {HERO_CONFIG.stats.map((stat, idx) => (
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
                <span>{HERO_CONFIG.exploreButtonText}</span>
              </Link>

              {/* Secondary WhatsApp: Tanya via WhatsApp */}
              <a
                href={HERO_CONFIG.whatsappButtonHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 md:px-7 py-3 sm:py-3.5 rounded-xl bg-[#00c853] hover:bg-[#00b049] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center group"
              >
                {/* Crisp WhatsApp SVG Icon */}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white group-hover:scale-110 transition-transform duration-200"
                  aria-hidden="true"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>{HERO_CONFIG.whatsappButtonText}</span>
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
