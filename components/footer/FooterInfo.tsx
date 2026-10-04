"use client";

import React, { useMemo } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib";

interface FooterInfoProps {
  className?: string;
}

export const FooterInfo: React.FC<FooterInfoProps> = ({ className }) => {
  const { t } = useLanguage();

  const infoItems = useMemo(
    () => [
      {
        icon: MapPin,
        text: t.footer.addressDesc || "Desa Mundu Pesisir, Kec. Mundu, Kab. Cirebon, Jawa Barat 45173",
        href: "https://maps.google.com/?q=-6.7575,108.593583",
        target: "_blank",
      },
      {
        icon: Phone,
        text: "+62 822-1618-2885",
        href: "https://wa.me/6282216182885",
        target: "_blank",
      },
      {
        icon: Mail,
        text: "umkmmundupesisir@gmail.com",
        href: "mailto:umkmmundupesisir@gmail.com",
      },
      {
        icon: Clock,
        text: t.footer.hoursDesc,
      },
    ],
    [t]
  );

  return (
    <div className={cn("flex flex-col gap-3.5 max-w-md", className)}>
      {/* Column Title */}
      <div className="flex items-center gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0a2642] font-sans">
          {t.footer.infoCenter}
        </h4>
        <span className="w-5 h-px bg-[#8a6843]/40" />
      </div>

      {/* Information & Contact List - Single unified list without duplicates */}
      <ul className="flex flex-col gap-2.5 text-xs sm:text-sm font-sans">
        {infoItems.map((item) => {
          const Icon = item.icon;
          const content = (
            <div className="group flex items-start gap-2.5 py-0.5 transition-all duration-200 ease-out hover:translate-x-1">
              <span className="w-6 h-6 rounded-md bg-white/80 border border-[#d8c7b4] flex items-center justify-center shrink-0 group-hover:bg-[#0a2642] group-hover:border-[#0a2642] transition-colors duration-200 shadow-2xs mt-0.5">
                <Icon className="w-3.5 h-3.5 text-[#8a6843] group-hover:text-white transition-colors duration-200" />
              </span>
              <span className="text-[#2c4a6b] group-hover:text-[#0a2642] transition-colors leading-relaxed">
                {item.text}
              </span>
            </div>
          );

          return (
            <li key={item.text}>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.target}
                  rel={item.target ? "noopener noreferrer" : undefined}
                  className="inline-block"
                >
                  {content}
                </a>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
