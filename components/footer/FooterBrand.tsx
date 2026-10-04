"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Globe } from "lucide-react";
import { FOOTER_CONFIG, SITE_CONFIG } from "@/constants";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib";

interface FooterBrandProps {
  className?: string;
}

export const FooterBrand: React.FC<FooterBrandProps> = ({ className }) => {
  const { t } = useLanguage();

  return (
    <div className={cn("flex flex-col gap-4 max-w-sm", className)}>
      {/* Brand Header with Official Logo */}
      <Link href="/" className="inline-flex items-center gap-3.5 group shrink-0">
        <div className="relative w-11 h-11 shrink-0">
          <Image
            src={SITE_CONFIG.logoSrc}
            alt={FOOTER_CONFIG.brandTitle}
            width={44}
            height={44}
            className="object-contain w-full h-full drop-shadow-xs"
          />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-base sm:text-lg font-bold text-[#0a2642] tracking-tight font-sans">
            {FOOTER_CONFIG.brandTitle}
          </span>
          <span className="text-[11px] font-semibold text-[#8a6843] tracking-wide">
            {FOOTER_CONFIG.brandSubtitle}
          </span>
        </div>
      </Link>

      {/* Description */}
      <p className="text-xs text-[#2c4a6b] leading-relaxed font-sans">
        {t.footer.brandDesc || FOOTER_CONFIG.description}
      </p>

      {/* Social & Contact Icons Row (matches reference icon row) */}
      <div className="flex items-center gap-2 pt-1">
        <a
          href="https://wa.me/6281214145254"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-lg bg-white/80 border border-[#d8c7b4] flex items-center justify-center text-[#0a2642] hover:bg-[#0a2642] hover:text-white hover:border-[#0a2642] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ease-out shadow-2xs"
          aria-label="WhatsApp"
        >
          <Phone className="w-3.5 h-3.5" />
        </a>

        <a
          href="mailto:umkmmundupesisir@gmail.com"
          className="w-8 h-8 rounded-lg bg-white/80 border border-[#d8c7b4] flex items-center justify-center text-[#0a2642] hover:bg-[#0a2642] hover:text-white hover:border-[#0a2642] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ease-out shadow-2xs"
          aria-label="Email"
        >
          <Mail className="w-3.5 h-3.5" />
        </a>

        <a
          href="https://maps.google.com/?q=-6.7575,108.593583"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-lg bg-white/80 border border-[#d8c7b4] flex items-center justify-center text-[#0a2642] hover:bg-[#0a2642] hover:text-white hover:border-[#0a2642] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ease-out shadow-2xs"
          aria-label="Lokasi Google Maps"
        >
          <MapPin className="w-3.5 h-3.5" />
        </a>

        <Link
          href="/"
          className="w-8 h-8 rounded-lg bg-white/80 border border-[#d8c7b4] flex items-center justify-center text-[#0a2642] hover:bg-[#0a2642] hover:text-white hover:border-[#0a2642] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ease-out shadow-2xs"
          aria-label="Website Desa"
        >
          <Globe className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
