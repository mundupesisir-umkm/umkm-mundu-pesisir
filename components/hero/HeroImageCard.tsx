"use client";

import React from "react";
import Image from "next/image";
import { HERO_CONFIG } from "@/constants/hero";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib";

interface HeroImageCardProps {
  className?: string;
}

export const HeroImageCard: React.FC<HeroImageCardProps> = ({ className }) => {
  const { image } = HERO_CONFIG;
  const { t } = useLanguage();

  return (
    <div
      className={cn(
        "relative max-w-md md:max-w-none mx-auto w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#14b8a6]/40 p-1.5 sm:p-2.5 bg-white/80 backdrop-blur-xs shadow-lg md:shadow-xl shadow-[#0a2642]/8 group",
        className
      )}
    >
      {/* Aspect Ratio 4:3 Image Container */}
      <div className="relative aspect-4/3 w-full rounded-xl sm:rounded-2xl overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 520px"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          priority
        />

        {/* Bottom Information Glass Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 md:p-4.5 lg:p-5 bg-linear-to-t from-black/90 via-black/55 to-transparent flex flex-col gap-1">
          {/* Category Tag */}
          <span className="self-start px-2 sm:px-2.5 py-0.5 rounded-md text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider bg-[#0d9488] text-white shadow-2xs">
            {t.hero.card.badge}
          </span>

          {/* Main Title */}
          <h3 className="font-bold text-xs sm:text-sm md:text-base text-white font-sans mt-0.5 leading-snug">
            {t.hero.card.title}
          </h3>

          {/* Subtitle */}
          <p className="text-[10px] sm:text-[11px] md:text-xs text-white/90 font-sans leading-tight line-clamp-1 sm:line-clamp-none">
            {t.hero.card.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};
