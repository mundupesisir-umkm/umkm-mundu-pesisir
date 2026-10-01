"use client";

import React from "react";
import { cn } from "@/lib";

export interface RibbonItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

export interface PageHeroProps {
  badgeIcon?: React.ReactNode;
  badgeText: string;
  titleStart: string;
  titleHighlight: string;
  subtitle: string;
  ribbonItems?: RibbonItem[];
  className?: string;
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  badgeIcon,
  badgeText,
  titleStart,
  titleHighlight,
  subtitle,
  ribbonItems,
  className,
  children,
}) => {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-linear-to-b from-[#0a2642] via-[#0c2f52] to-[#081f36] text-white pt-24 sm:pt-28 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {/* Decorative ambient glowing orbs */}
      <div
        className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-[#008276]/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-10 translate-y-10 w-80 h-80 bg-teal-400/10 rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#7ee3c8] text-xs sm:text-sm font-semibold tracking-wide mb-4">
          {badgeIcon}
          <span>{badgeText}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans text-white max-w-4xl mx-auto leading-tight">
          {titleStart}{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#7ee3c8] via-teal-200 to-amber-200">
            {titleHighlight}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
          {subtitle}
        </p>

        {/* Quick Highlights Ribbon */}
        {ribbonItems && ribbonItems.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-8 sm:mt-10">
            {ribbonItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-left transition-colors hover:bg-white/10"
              >
                {item.icon}
                <div>
                  <p className="text-xs font-bold text-white leading-tight">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-tight">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {children}
      </div>
    </section>
  );
};
