"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { LanguageOption, NavbarProps } from "./types";
import { NavBrand } from "./NavBrand";
import { NavMenu } from "./NavMenu";
import { NavSearch } from "./NavSearch";
import { NavLanguage } from "./NavLanguage";
import { MobileMenu } from "./MobileMenu";
import { DEFAULT_NAV_ITEMS, SITE_CONFIG } from "@/constants";
import { useLanguage, Language } from "@/lib/i18n";
import { cn } from "@/lib";

export { DEFAULT_NAV_ITEMS };

export const Navbar: React.FC<NavbarProps> = ({
  brandName = SITE_CONFIG.name,
  brandHref = "/",
  items,
  onSearch,
  onLanguageChange,
}) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  // Localized navigation items
  const navItems = React.useMemo(() => {
    if (items) return items;
    return [
      { label: t.nav.home, href: "/" },
      { label: t.nav.products, href: "/produk" },
      { label: t.nav.testimonials, href: "/testimoni" },
      { label: t.nav.profile, href: "/profil" },
      { label: t.nav.contact, href: "/kontak" },
    ];
  }, [items, t]);

  // Compute active item automatically based on Next.js current pathname
  const activeHref = React.useMemo(() => {
    const exactMatch = navItems.find(
      (item) => item.href !== "/" && (pathname === item.href || pathname.startsWith(item.href + "/"))
    );
    if (exactMatch) return exactMatch.href;

    if (pathname === "/") return "/";

    return navItems[0]?.href || "/";
  }, [pathname, navItems]);

  const handleLangChange = (lang: LanguageOption) => {
    setLanguage(lang.code as Language);
    onLanguageChange?.(lang);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-linear-to-r from-[#f2e7db] via-[#f8efe6] to-[#f2e7db] border-b border-[#d8c7b4] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Full-width Top Navbar Bar with Beach Sand & Ocean Blue Details */}
        <div className="flex items-center justify-between gap-3 lg:gap-4 xl:gap-8 h-16 sm:h-18">
          {/* Left section: Brand & Menu */}
          <div className="flex items-center gap-2 lg:gap-3 xl:gap-6 shrink-0">
            <NavBrand name={brandName} href={brandHref} />

            {/* Desktop Menu - active on lg (laptops) and xl (desktop), cleanly hidden on tablet & mobile */}
            <div className="hidden lg:flex items-center shrink-0">
              <NavMenu
                items={navItems}
                activeHref={activeHref}
              />
            </div>
          </div>

          {/* Right section: Search, Divider, Language, & Hamburger Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-3 shrink-0">
            {/* Desktop Search - shown on lg+ */}
            <div className="hidden lg:block">
              <NavSearch
                onSearch={onSearch}
                placeholder={t.nav.searchPlaceholder}
              />
            </div>

            {/* Subtle Vertical Divider */}
            <div className="hidden lg:block h-5 w-px bg-[#d3c1ac]" />

            {/* Desktop Language Switcher - shown on lg+ */}
            <div className="hidden lg:block">
              <NavLanguage
                defaultCode={language}
                onChange={handleLangChange}
              />
            </div>

            {/* Hamburger Toggle - visible on mobile and tablet (< lg) */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-[#0a2642] hover:bg-[#e7d8c7]/80 transition-colors border border-transparent hover:border-[#d6c4af]"
              )}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <Menu
                  className={cn(
                    "w-5 h-5 absolute transition-all duration-300 ease-in-out",
                    mobileOpen
                      ? "opacity-0 rotate-90 scale-50 pointer-events-none"
                      : "opacity-100 rotate-0 scale-100"
                  )}
                />
                <X
                  className={cn(
                    "w-5 h-5 text-[#8a6843] absolute transition-all duration-300 ease-in-out",
                    mobileOpen
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-90 scale-50 pointer-events-none"
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Dropdown Drawer attached directly beneath navbar */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={navItems}
        activeHref={activeHref}
        onSearch={onSearch}
        currentLanguage={language}
        onLanguageChange={handleLangChange}
      />
    </header>
  );
};
