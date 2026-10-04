"use client";

import React from "react";
import { Navigation, ExternalLink, Car, Clock } from "lucide-react";
import { useLanguage, RouteGuideItem } from "@/lib/i18n";

export const ContactMapAndRoute: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-5">
      {/* Interactive Map Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-md">
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-[#0a2642] font-sans flex items-center gap-2">
              <Navigation className="w-4 h-4 text-[#008276]" />
              <span>{t.contact.mapTitle}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.contact.mapSubtitle}
            </p>
          </div>

          <a
            href="https://maps.google.com/?q=-6.7575,108.593583"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors shrink-0"
          >
            <span>{t.contact.openMapsBtn}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Map Iframe */}
        <div className="relative aspect-video sm:aspect-16/10 w-full rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
          <iframe
            title="Peta Lokasi Desa Mundu Pesisir Cirebon"
            src="https://maps.google.com/maps?q=-6.7575,108.593583&hl=id&z=16&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>

        {/* Mobile button to open Google Maps */}
        <a
          href="https://maps.google.com/?q=-6.7575,108.593583"
          target="_blank"
          rel="noopener noreferrer"
          className="sm:hidden mt-3 w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold text-center"
        >
          <span>{t.contact.openMapsBtn}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Route Tips Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-md">
        <h3 className="text-sm sm:text-base font-bold text-[#0a2642] mb-3 flex items-center gap-2">
          <Car className="w-4 h-4 sm:w-5 sm:h-5 text-[#008276] shrink-0" />
          <span>{t.contact.routeGuideTitle}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {t.contact.routes.map((rt: RouteGuideItem, idx: number) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-[#008276] block mb-1">
                  {rt.from}
                </span>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                  {rt.description}
                </p>
              </div>
              <span className="mt-2 text-[10px] font-semibold text-slate-600 bg-white py-1 px-2.5 rounded-md self-start border border-slate-200 inline-flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#008276] shrink-0" />
                <span>{rt.duration}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
