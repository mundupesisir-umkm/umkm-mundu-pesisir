"use client";

import React from "react";
import { FooterBrand } from "./FooterBrand";
import { FooterNav } from "./FooterNav";
import { FooterInfo } from "./FooterInfo";
import { FOOTER_CONFIG } from "@/constants";
import { cn } from "@/lib";

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer
      className={cn(
        "w-full bg-linear-to-r from-[#f2e7db] via-[#f8efe6] to-[#f2e7db] border-t border-[#d8c7b4] text-[#0a2642]",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Main 3-Column Layout without duplicates or redundant sections */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10">
          {/* Column 1: Brand, Logo, Description, Social Icons (5 cols) */}
          <div className="md:col-span-6 lg:col-span-5">
            <FooterBrand />
          </div>

          {/* Column 2: Navigasi Halaman (Text Only, No Icons) (3 cols) */}
          <div className="md:col-span-6 lg:col-span-3 lg:pl-6">
            <FooterNav />
          </div>

          {/* Column 3: Pusat Informasi Lengkap (No Duplicates) (4 cols) */}
          <div className="md:col-span-12 lg:col-span-4">
            <FooterInfo />
          </div>
        </div>

        {/* Full-width Divider Line */}
        <div className="border-t border-[#d8c7b4] pt-8 flex items-center justify-center text-center">
          {/* Centered Copyright Text matching reference screenshot */}
          <p className="text-xs text-[#766350] font-sans">
            © {new Date().getFullYear()} {FOOTER_CONFIG.brandTitle}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
