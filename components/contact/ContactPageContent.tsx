"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Navigation,
  CheckCircle2,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { PageHero } from "@/components/ui";
import { useLanguage } from "@/lib/i18n";
import { ContactChannelsGrid } from "./ContactChannelsGrid";
import { ContactQuickForm } from "./ContactQuickForm";
import { ContactMapAndRoute } from "./ContactMapAndRoute";
import { ContactFaqAccordion } from "./ContactFaqAccordion";

export const ContactPageContent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full min-h-screen bg-slate-50/60 pb-16 sm:pb-20">
      {/* ========================================================= */}
      {/* 1. HERO / BANNER HEADER (Modular PageHero)                */}
      {/* ========================================================= */}
      <PageHero
        badgeIcon={<MapPin className="w-3.5 h-3.5 text-[#7ee3c8]" />}
        badgeText={t.contact.badge}
        titleStart={t.contact.titleStart}
        titleHighlight={t.contact.titleHighlight}
        subtitle={t.contact.subtitle}
        ribbonItems={[
          {
            icon: <WhatsAppIcon className="w-5 h-5 text-[#00c853] shrink-0" />,
            title: t.contact.ribbonWa,
            subtitle: t.contact.ribbonWaSub,
          },
          {
            icon: <Navigation className="w-5 h-5 text-[#7ee3c8] shrink-0" />,
            title: t.contact.ribbonRoute,
            subtitle: t.contact.ribbonRouteSub,
          },
          {
            icon: <MapPin className="w-5 h-5 text-[#7ee3c8] shrink-0" />,
            title: t.contact.ribbonStore,
            subtitle: t.contact.ribbonStoreSub,
          },
          {
            icon: <CheckCircle2 className="w-5 h-5 text-[#7ee3c8] shrink-0" />,
            title: t.contact.ribbonWholesale,
            subtitle: t.contact.ribbonWholesaleSub,
          },
        ]}
      />

      {/* ========================================================= */}
      {/* 2. CONTACT CHANNELS CARDS (Modular)                       */}
      {/* ========================================================= */}
      <ContactChannelsGrid />

      {/* ========================================================= */}
      {/* 3. INTERACTIVE INQUIRY FORM & MAP SECTION (Modular)       */}
      {/* ========================================================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* LEFT: INQUIRY FORM (5 Cols) */}
          <div className="lg:col-span-5">
            <ContactQuickForm />
          </div>

          {/* RIGHT: MAP & ROUTE DIRECTIONS (7 Cols) */}
          <div className="lg:col-span-7">
            <ContactMapAndRoute />
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. FREQUENTLY ASKED QUESTIONS (FAQ) (Modular)             */}
        {/* ========================================================= */}
        <ContactFaqAccordion />

        {/* ========================================================= */}
        {/* 5. BOTTOM COMMUNITY BANNER                                */}
        {/* ========================================================= */}
        <div className="mt-8 sm:mt-12 rounded-2xl p-5 sm:p-7 bg-linear-to-r from-[#0a2642] via-[#0d3356] to-[#0a2642] border border-[#d8c7b4]/40 shadow-lg text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-bold text-base sm:text-lg">
              {t.profile.ctaTitle}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {t.profile.ctaSubtitle}
            </p>
          </div>
          <Link
            href="/produk"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#008276] hover:bg-[#006e64] text-white text-xs sm:text-sm font-bold shadow-xs hover:-translate-y-0.5 transition-all whitespace-nowrap shrink-0"
          >
            <span>{t.catalog.viewAllBtn}</span>
          </Link>
        </div>
      </main>
    </div>
  );
};
