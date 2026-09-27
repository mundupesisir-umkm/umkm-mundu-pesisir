import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/constants";
import { cn } from "@/lib";

interface NavBrandProps {
  name?: string;
  tagline?: string;
  href?: string;
  logoSrc?: string;
  className?: string;
}

export const NavBrand: React.FC<NavBrandProps> = ({
  name = SITE_CONFIG.name,
  tagline = SITE_CONFIG.tagline,
  href = "/",
  logoSrc = SITE_CONFIG.logoSrc,
  className,
}) => {
  return (
    <Link
      href={href}
      className={cn("flex items-center gap-2.5 sm:gap-3 xl:gap-3.5 shrink-0", className)}
    >
      {/* Official Village Logo */}
      <div className="relative w-10 h-10 sm:w-11 sm:h-11 xl:w-12 xl:h-12 flex items-center justify-center shrink-0">
        <Image
          src={logoSrc}
          alt={name}
          width={48}
          height={48}
          className="object-contain w-full h-full drop-shadow-xs"
          priority
        />
      </div>

      {/* Brand Title & Subtitle */}
      <div className="flex flex-col leading-tight">
        <span className="font-bold text-xs sm:text-sm xl:text-base tracking-tight text-[#0a2642] font-sans whitespace-nowrap">
          {name}
        </span>
        <span className="hidden xl:block text-[9px] sm:text-[10px] font-semibold text-[#8a6843] tracking-wider uppercase whitespace-nowrap">
          {tagline}
        </span>
      </div>
    </Link>
  );
};
