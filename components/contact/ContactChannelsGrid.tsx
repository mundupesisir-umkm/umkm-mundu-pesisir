"use client";

import React from "react";
import { MapPin, Mail, Clock, ExternalLink } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { useLanguage, ContactChannelItem } from "@/lib/i18n";
import { cn } from "@/lib";

export const ContactChannelsGrid: React.FC = () => {
  const { t } = useLanguage();

  const getChannelIcon = (icon: string) => {
    switch (icon) {
      case "WhatsApp":
        return <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#00c853]" />;
      case "MapPin":
        return <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#008276]" />;
      case "Mail":
        return <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#0a2642]" />;
      case "Clock":
        return <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />;
      default:
        return <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#0a2642]" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {t.contact.channels.map((ch: ContactChannelItem) => (
          <div
            key={ch.id}
            className={cn(
              "rounded-3xl p-5 sm:p-6 bg-white border shadow-xl shadow-slate-200/70 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1",
              ch.isPrimary
                ? "border-[#00c853]/40 shadow-emerald-900/5 ring-1 ring-[#00c853]/20"
                : "border-slate-100 shadow-slate-900/5"
            )}
          >
            <div>
              {/* Top Badge & Icon */}
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                  {getChannelIcon(ch.icon)}
                </div>
                {ch.statusBadge && (
                  <span
                    className={cn(
                      "text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full border",
                      ch.isPrimary
                        ? "bg-emerald-50 text-[#009b3e] border-[#00c853]/30"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    )}
                  >
                    {ch.statusBadge}
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-bold text-sm sm:text-base text-[#0a2642] font-sans">
                {ch.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {ch.subtitle}
              </p>

              {/* Primary Value */}
              <div className="mt-3.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm font-semibold text-[#0a2642] select-all wrap-break-word">
                {ch.primaryValue}
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-5 pt-3 border-t border-slate-100">
              <a
                href={ch.actionHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all text-center",
                  ch.isPrimary
                    ? "bg-[#00c853] hover:bg-[#00b049] text-white shadow-xs"
                    : "bg-[#0a2642] hover:bg-[#18395e] text-white"
                )}
              >
                <span>{ch.actionText}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
