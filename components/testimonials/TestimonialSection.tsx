"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, MessageSquareHeart } from "lucide-react";
import { TESTIMONIALS_CONFIG } from "@/constants/testimonials";
import { TestimonialCard } from "./TestimonialCard";
import { TestimonialSectionProps, TestimonialItem } from "./types";
import { useTestimonials } from "@/hooks/useTestimonials";
import { cn } from "@/lib";

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  className,
  badge = TESTIMONIALS_CONFIG.badge,
  headline = TESTIMONIALS_CONFIG.headline,
  linkText = TESTIMONIALS_CONFIG.linkText,
  linkHref = TESTIMONIALS_CONFIG.linkHref,
  items: propItems,
}) => {
  const { testimonials: dbItems, isLoading } = useTestimonials();
  const items = propItems || dbItems;

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  // Dynamic responsive itemsPerPage calculation
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newItemsPerPage = 3;
      if (width < 640) {
        newItemsPerPage = 1; // Mobile: 1 card per slide
      } else if (width < 1024) {
        newItemsPerPage = 2; // Tablet: 2 cards per slide
      }

      setItemsPerPage(newItemsPerPage);
      setCurrentPage((prev) => {
        const newTotalPages = Math.max(1, Math.ceil(items.length / newItemsPerPage));
        return Math.min(prev, newTotalPages - 1);
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [items.length]);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages - 1);

  // Pre-chunk items into slides based on responsive itemsPerPage
  const pages: TestimonialItem[][] = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(items.slice(i * itemsPerPage, i * itemsPerPage + itemsPerPage));
  }

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  // Gentle auto-slide every 6 seconds, pauses when user hovers
  useEffect(() => {
    if (isHovered || items.length <= itemsPerPage) return;
    const timer = setInterval(() => {
      nextPage();
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered, items.length, itemsPerPage, nextPage]);

  // Responsive touch gesture handlers with vertical scroll preservation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distanceX = touchStartX.current - touchEndX.current;
    const distanceY = (touchStartY.current ?? 0) - (touchEndY.current ?? 0);

    // Only trigger horizontal swipe when horizontal intent is greater than vertical scroll
    if (Math.abs(distanceX) > Math.abs(distanceY) && Math.abs(distanceX) > 40) {
      if (distanceX > 0) {
        nextPage();
      } else {
        prevPage();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
    touchStartY.current = null;
    touchEndY.current = null;
  };

  return (
    <section
      aria-label="Testimoni Pembeli"
      className={cn(
        "w-full relative overflow-hidden bg-white py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle Coastal Sand Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-5xl h-80 bg-linear-to-r from-[#f8efe6]/50 via-[#f2e7db]/30 to-[#f8efe6]/50 rounded-3xl blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 1. Responsive Header Area */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3.5 sm:gap-4 mb-6 sm:mb-8 lg:mb-10">
          {/* Left Title Block */}
          <div className="flex flex-col gap-1.5 sm:gap-2">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 self-start px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-[#f4ece1] text-[#8a6843] border border-[#d8c7b4]">
              <span>{badge}</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0a2642] tracking-tight font-sans">
              {headline}
            </h2>
          </div>

          {/* Right Link */}
          {items.length > 0 && (
            <Link
              href={linkHref}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0a2642] hover:text-[#8a6843] group transition-colors self-start sm:self-end pb-0.5"
            >
              <span>{linkText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#0a2642] group-hover:text-[#8a6843]" />
            </Link>
          )}
        </div>

        {/* 2. Content Viewport (Loading / Carousel / Empty) */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-200" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3.5 w-24 bg-slate-200 rounded" />
                    <div className="h-3 w-16 bg-slate-200 rounded" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-slate-200 rounded" />
                  <div className="h-3 w-4/5 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          /* Empty State when Database has no testimonials */
          <div className="text-center py-12 px-4 bg-[#fcfaf7] rounded-3xl border border-[#d8c7b4]/60 max-w-xl mx-auto shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-[#f4ece1] text-[#8a6843] flex items-center justify-center mx-auto mb-3 border border-[#d8c7b4]">
              <MessageSquareHeart className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-[#0a2642] font-sans">
              Belum Ada Ulasan Testimoni
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-md mx-auto leading-relaxed">
              Jadilah pelanggan pertama yang membagikan pengalaman menikmati
              olahan khas UMKM Desa Mundupesisir.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <a
                href="https://wa.me/6281214145254?text=Halo%20Admin%20UMKM%20Mundu%20Pesisir,%20saya%20ingin%20memberikan%20ulasan%20dan%20testimoni%20produk."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#00c853] hover:bg-[#00b049] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
              >
                Kirim Ulasan via WhatsApp
              </a>
            </div>
          </div>
        ) : (
          /* Carousel View */
          <>
            <div
              className="overflow-hidden w-full cursor-grab active:cursor-grabbing select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
                style={{
                  transform: `translateX(-${safeCurrentPage * 100}%)`,
                }}
              >
                {pages.map((pageCards, pageIndex) => (
                  <div
                    key={pageIndex}
                    className={cn(
                      "w-full shrink-0 grid gap-4 sm:gap-5 md:gap-6 px-0.5 sm:px-1",
                      itemsPerPage === 1 && "grid-cols-1 max-w-md sm:max-w-lg mx-auto",
                      itemsPerPage === 2 && "grid-cols-2",
                      itemsPerPage === 3 && "grid-cols-3"
                    )}
                    aria-hidden={pageIndex !== safeCurrentPage}
                  >
                    {pageCards.map((item) => (
                      <TestimonialCard key={item.id} item={item} />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Controls: Navigation Arrows & Pagination Indicators */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 lg:mt-10">
                <button
                  type="button"
                  onClick={prevPage}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white hover:bg-[#f4ece1] border border-[#d8c7b4] text-[#0a2642] hover:text-[#8a6843] flex items-center justify-center transition-all duration-200 active:scale-95 shadow-xs focus:outline-hidden cursor-pointer"
                  aria-label="Testimoni sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  {Array.from({ length: totalPages }).map((_, index) => {
                    const isActive = index === safeCurrentPage;
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentPage(index)}
                        className={cn(
                          "transition-all duration-500 ease-out focus:outline-hidden cursor-pointer rounded-md",
                          isActive
                            ? "w-6 sm:w-8 h-2 sm:h-2.5 bg-[#0a2642] shadow-xs"
                            : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-[#d8c7b4] hover:bg-[#8a6843]"
                        )}
                        aria-label={`Lihat testimoni halaman ${index + 1}`}
                        aria-current={isActive ? "true" : undefined}
                      />
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={nextPage}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white hover:bg-[#f4ece1] border border-[#d8c7b4] text-[#0a2642] hover:text-[#8a6843] flex items-center justify-center transition-all duration-200 active:scale-95 shadow-xs focus:outline-hidden cursor-pointer"
                  aria-label="Testimoni berikutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
