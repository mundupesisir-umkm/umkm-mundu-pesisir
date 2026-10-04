"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTA_CONFIG } from "@/constants";
import { WhatsAppIcon } from "@/components/icons";
import { FishIllustration } from "./FishIllustration";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib";

interface CtaSectionProps {
  className?: string;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ className }) => {
  const { t } = useLanguage();

  return (
    <section className={cn("w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8", className)}>
      <div className="max-w-7xl mx-auto">
        {/* CTA Card with clean white background and coastal accents */}
        <div className="relative w-full rounded-3xl bg-white border border-[#d8c7b4] shadow-sm overflow-hidden p-6 sm:p-10 lg:p-12">
          {/* Subtle Coastal Sand & Sky Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-[#f8efe6] via-[#f2e7db]/40 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

          {/* Advanced Floating Fish Illustration (Positioned on the right side) */}
          <div className="absolute -right-8 sm:right-2 md:right-6 -bottom-8 sm:-bottom-4 w-72 sm:w-96 md:w-110 pointer-events-none z-0 transition-transform duration-700 ease-out">
            <FishIllustration className="w-full h-auto" />
          </div>

          {/* Foreground Content */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="flex flex-col gap-3.5 max-w-2xl">
              {/* Top Badge */}
              <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#f4ece1] text-[#8a6843] border border-[#d8c7b4]">
                <span>{t.cta.badge}</span>
              </div>

              {/* Main Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a2642] tracking-tight font-sans leading-tight">
                {t.cta.title}
              </h2>

              {/* Subtitle / Description */}
              <p className="text-xs sm:text-sm text-[#2c4a6b] leading-relaxed font-sans max-w-xl">
                {t.cta.subtitle}
              </p>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              {/* Primary WhatsApp Action */}
              <a
                href={CTA_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#0a2642] hover:bg-[#071c30] text-white text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 text-center group"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <span>{t.cta.whatsappBtn}</span>
              </a>

              {/* Secondary Catalog Action */}
              <Link
                href="/produk"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-transparent backdrop-blur-sm hover:bg-[#f4ece1] text-[#0a2642] border border-[#0a2642] text-xs sm:text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-center group"
              >
                <span>{t.cta.catalogBtn}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0a2642] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
