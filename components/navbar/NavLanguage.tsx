"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { LanguageOption } from "./types";
import { DEFAULT_LANGUAGES } from "@/constants";
import { cn } from "@/lib";

interface NavLanguageProps {
  languages?: LanguageOption[];
  defaultCode?: string;
  onChange?: (lang: LanguageOption) => void;
  className?: string;
}

export const NavLanguage: React.FC<NavLanguageProps> = ({
  languages = DEFAULT_LANGUAGES,
  defaultCode = "id",
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<LanguageOption>(
    () => languages.find((l) => l.code === defaultCode) || languages[0]
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (lang: LanguageOption) => {
    setSelected(lang);
    setIsOpen(false);
    onChange?.(lang);
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs sm:text-sm font-medium text-[#1b3d64] hover:text-[#06192d] hover:bg-[#e7d8c7]/80 transition-colors border border-transparent hover:border-[#d6c4af]"
        aria-expanded={isOpen}
        aria-label="Pilih Bahasa"
      >
        <span className="text-base leading-none">{selected.flag}</span>
        <span className="hidden xl:inline-block font-medium">{selected.label}</span>
        <span className="inline-block xl:hidden uppercase font-bold text-[#8a6843] text-xs">
          {selected.code}
        </span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-[#8a6843] transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-1.5 rounded-xl bg-[#faf5ee] border border-[#d6c4af] shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1 text-[11px] font-semibold text-[#8a6843] uppercase tracking-wider">
            Bahasa / Language
          </div>
          {languages.map((lang) => {
            const isCurrent = lang.code === selected.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm text-left transition-colors",
                  isCurrent
                    ? "bg-[#0a2642] text-white font-semibold"
                    : "text-[#1b3d64] hover:bg-[#eee3d5] hover:text-[#06192d]"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.label}</span>
                </div>
                {isCurrent && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
