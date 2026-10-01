"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib";

interface FooterNavProps {
  className?: string;
}

export const FooterNav: React.FC<FooterNavProps> = ({ className }) => {
  const { t } = useLanguage();

  const navLinks = useMemo(
    () => [
      { label: t.nav.home, href: "/" },
      { label: t.nav.products, href: "/produk" },
      { label: t.nav.testimonials, href: "/testimoni" },
      { label: t.nav.profile, href: "/profil" },
      { label: t.nav.contact, href: "/kontak" },
    ],
    [t]
  );

  return (
    <div className={cn("flex flex-col gap-3.5", className)}>
      {/* Column Title */}
      <div className="flex items-center gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0a2642] font-sans">
          {t.footer.quickLinks || "Navigasi Halaman"}
        </h4>
        <span className="w-5 h-px bg-[#8a6843]/40" />
      </div>

      {/* Nav Link List - Text Only without icons with smooth hover slide */}
      <ul className="flex flex-col gap-2.5 text-xs sm:text-sm font-sans">
        {navLinks.map((item) => (
          <li key={item.href + item.label}>
            <Link
              href={item.href}
              className="text-[#2c4a6b] hover:text-[#0a2642] font-medium transition-all duration-200 ease-out hover:translate-x-1.5 inline-block py-0.5"
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li className="pt-1 mt-1 border-t border-[#d8c7b4]/50">
          <Link
            href="/admin"
            className="text-[#008276] hover:text-[#0a2642] font-semibold transition-all duration-200 ease-out hover:translate-x-1.5 inline-block py-0.5"
          >
            Portal Admin →
          </Link>
        </li>
      </ul>
    </div>
  );
};
