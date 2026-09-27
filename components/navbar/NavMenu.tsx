"use client";

import React from "react";
import Link from "next/link";
import { NavItem } from "./types";
import { cn } from "@/lib";

interface NavMenuProps {
  items: NavItem[];
  activeHref?: string;
  onItemClick?: (item: NavItem) => void;
  className?: string;
}

export const NavMenu: React.FC<NavMenuProps> = ({
  items,
  activeHref,
  onItemClick,
  className = "",
}) => {
  return (
    <nav className={cn("flex items-center gap-0.5 xl:gap-1.5 shrink-0", className)}>
      {items.map((item) => {
        const isActive = activeHref ? activeHref === item.href : item.isActive;
        return (
          <Link
            key={item.href + item.label}
            href={item.href}
            onClick={() => onItemClick?.(item)}
            className={cn(
              "group relative px-2 xl:px-3.5 py-1.5 xl:py-2 rounded-xl text-xs xl:text-sm font-medium whitespace-nowrap shrink-0 transition-all duration-300 ease-out",
              isActive
                ? "bg-[#0a2642] text-[#fbf7f2] font-semibold shadow-xs"
                : "text-[#18395e] hover:text-[#06192d] hover:-translate-y-0.5 active:translate-y-0"
            )}
          >
            {/* Smooth animated hover backdrop pill */}
            {!isActive && (
              <span className="absolute inset-0 rounded-xl bg-[#0a2642]/10 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none" />
            )}

            {/* Menu Label - Guaranteed single line */}
            <span className="relative z-10 whitespace-nowrap">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
