"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { NavItem, LanguageOption } from "./types";
import { NavSearch } from "./NavSearch";
import { DEFAULT_LANGUAGES } from "@/constants";
import { cn } from "@/lib";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  activeHref?: string;
  onSearch?: (query: string) => void;
  languages?: LanguageOption[];
  currentLanguage?: string;
  onLanguageChange?: (lang: LanguageOption) => void;
  className?: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  items,
  activeHref,
  onSearch,
  languages = DEFAULT_LANGUAGES,
  currentLanguage = "id",
  onLanguageChange,
  className,
}) => {
  return (
    <div
      className={cn(
        "lg:hidden grid transition-all duration-300 ease-in-out border-[#d8c7b4] overflow-hidden",
        isOpen
          ? "grid-rows-[1fr] opacity-100 border-t shadow-xl"
          : "grid-rows-[0fr] opacity-0 border-t-transparent pointer-events-none",
        className
      )}
      aria-hidden={!isOpen}
    >
      <div className="overflow-hidden min-h-0 bg-[#f4ece1]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4">
          {/* Mobile & Tablet Search Bar */}
          <div className="w-full">
            <NavSearch
              className="w-full [&>input]:w-full"
              isMobile={true}
              placeholder="Cari produk atau informasi..."
              onSearch={(q) => {
                onSearch?.(q);
              }}
              onSelectProduct={() => {
                onClose();
              }}
            />
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-1 border-t border-[#d8c7b4]/70 pt-3">
            {items.map((item) => {
              const isActive = activeHref ? activeHref === item.href : item.isActive;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ease-out",
                    isActive
                      ? "bg-[#0a2642] text-white font-semibold shadow-xs"
                      : "text-[#1b3d64] hover:bg-[#e7d8c7]/80 hover:text-[#06192d] hover:translate-x-1"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Language Selector Mobile & Tablet */}
          <div className="border-t border-[#d8c7b4]/70 pt-3 flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-[#8a6843] uppercase tracking-wider px-1">
              Bahasa / Language
            </span>
            <div className="flex items-center gap-2">
              {languages.map((lang) => {
                const isSelected = lang.code === currentLanguage;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => onLanguageChange?.(lang)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors border",
                      isSelected
                        ? "bg-[#0a2642] text-white border-[#0a2642]"
                        : "bg-white text-[#1b3d64] border-[#d8c7b4] hover:bg-[#ebdccb]"
                    )}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                    {isSelected && <Check className="w-3 h-3 text-[#dfc19c]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
