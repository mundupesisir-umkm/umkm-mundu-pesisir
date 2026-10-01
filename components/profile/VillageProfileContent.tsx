"use client";

import React from "react";
import Link from "next/link";
import {
  Anchor,
  Compass,
  MapPin,
  Waves,
  ShieldCheck,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

import { PageHero } from "@/components/ui";

export const VillageProfileContent: React.FC = () => {
  const { t } = useLanguage();

  const getStatIcon = (icon: string) => {
    switch (icon) {
      case "Map":
        return <MapPin className="w-5 h-5 text-[#008276]" />;
      case "Compass":
        return <Compass className="w-5 h-5 text-[#0a2642]" />;
      case "Fish":
        return <Waves className="w-5 h-5 text-cyan-600" />;
      case "Anchor":
        return <Anchor className="w-5 h-5 text-amber-600" />;
      default:
        return <MapPin className="w-5 h-5 text-[#008276]" />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/60 pb-16 sm:pb-20">
      {/* ========================================================= */}
      {/* 1. HERO / BANNER HEADER (Modular PageHero)                */}
      {/* ========================================================= */}
      <PageHero
        badgeIcon={<Anchor className="w-3.5 h-3.5 text-[#7ee3c8]" />}
        badgeText={t.profile.badge}
        titleStart={t.profile.titleStart}
        titleHighlight={t.profile.titleHighlight}
        subtitle={t.profile.subtitle}
        ribbonItems={[
          {
            icon: <Waves className="w-5 h-5 text-[#7ee3c8] shrink-0" />,
            title: t.profile.ribbonPesisir,
            subtitle: t.profile.ribbonPesisirSub,
          },
          {
            icon: <Sparkles className="w-5 h-5 text-[#7ee3c8] shrink-0" />,
            title: t.profile.ribbonSiwang,
            subtitle: t.profile.ribbonSiwangSub,
          },
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#7ee3c8] shrink-0" />,
            title: t.profile.ribbonMangrove,
            subtitle: t.profile.ribbonMangroveSub,
          },
          {
            icon: <Anchor className="w-5 h-5 text-[#7ee3c8] shrink-0" />,
            title: t.profile.ribbonNadran,
            subtitle: t.profile.ribbonNadranSub,
          },
        ]}
      />

      {/* ========================================================= */}
      {/* 2. FOUR KEY STATISTICS CARDS                             */}
      {/* ========================================================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {t.profile.stats.map((stat, idx) => (
            <div
              key={idx}
              className="rounded-3xl p-4 sm:p-5 bg-white border border-slate-100 shadow-xl shadow-slate-200/70 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-[#008276] flex items-center justify-center mb-3 border border-teal-100">
                {getStatIcon(stat.icon)}
              </div>
              <div>
                <span className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#0a2642] block font-sans">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#008276] block mt-0.5">
                  {stat.label}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5 leading-tight">
                  {stat.sublabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. THREE CORE PILLARS OF MUNDU PESISIR                   */}
      {/* ========================================================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-[#008276] border border-teal-200 mb-2">
            <span>{t.profile.pillarsBadge}</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0a2642] font-sans">
            {t.profile.pillarsTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
            {t.profile.pillarsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {t.profile.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-white border border-slate-200 shadow-md flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
            >
              <div>
                {/* Header Tag & Emoji */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#0a2642]/10 text-[#0a2642] uppercase tracking-wider">
                    {pillar.tag}
                  </span>
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-[#0a2642] font-sans leading-snug">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#008276]">
                <ShieldCheck className="w-4 h-4 text-[#008276]" />
                <span>{t.profile.pillarBadgeFeature}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* 4. VISION & MISSION CARD                                  */}
        {/* ========================================================= */}
        <section
          aria-label="Visi dan Misi Kemandirian Ekonomi Desa"
          className="mt-12 sm:mt-16 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 bg-linear-to-r from-[#0a2642] via-[#0d3356] to-[#0a2642] border border-[#d8c7b4]/40 shadow-xl text-white relative overflow-hidden"
        >
          {/* Subtle Radial Ambient */}
          <div
            className="absolute -bottom-10 -right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#008276] text-white mb-3">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>{t.profile.visionBadge}</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight font-sans">
              {t.profile.vision.title}
            </h2>

            <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-3xl">
              {t.profile.vision.description}
            </p>

            {/* 4 Mission Points */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {t.profile.vision.points.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#00e676] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-white font-medium leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. CALL TO ACTION BANNER                                  */}
        {/* ========================================================= */}
        <div className="mt-8 sm:mt-12 rounded-2xl p-5 sm:p-7 bg-white border border-slate-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-[#0a2642]">
              {t.profile.ctaTitle}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.profile.ctaSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/produk"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#008276] hover:bg-[#006e64] text-white text-xs sm:text-sm font-bold shadow-xs hover:-translate-y-0.5 transition-all whitespace-nowrap"
            >
              <span>{t.profile.viewCatalogBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/kontak"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap"
            >
              <span>{t.profile.contactVillageBtn}</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
