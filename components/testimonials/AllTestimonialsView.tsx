"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  MessageSquareHeart,
  ShieldCheck,
  Share2,
  ChevronDown,
  ChevronUp,
  Star,
  Award,
  Truck,
  Sparkles,
} from "lucide-react";
import { useTestimonials } from "@/hooks/useTestimonials";
import { useLanguage } from "@/lib/i18n";
import { WhatsAppIcon } from "@/components/icons";
import { TestimonialCard } from "./TestimonialCard";
import { TestimonialItem } from "@/constants/testimonials";
import { PageHero } from "@/components/ui";
import { cn } from "@/lib";

interface AllTestimonialsViewProps {
  initialTestimonials?: TestimonialItem[];
}

export const AllTestimonialsView: React.FC<AllTestimonialsViewProps> = ({
  initialTestimonials,
}) => {
  const { testimonials, isLoading } = useTestimonials(initialTestimonials);
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = useMemo(() => [
    { id: "all", label: t.testimonials.allReviews },
    { id: "siwang", label: t.catalog.siwangCategory },
    { id: "ikan", label: t.catalog.crackersCategory },
    { id: "seafood", label: t.catalog.seafoodCategory },
  ], [t]);

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((item) => {
      // 1. Category filter
      if (selectedCategory === "siwang") {
        const isSiwang =
          item.productTag?.toLowerCase().includes("siwang") ||
          item.review.toLowerCase().includes("siwang");
        if (!isSiwang) return false;
      } else if (selectedCategory === "ikan") {
        const isIkan =
          item.productTag?.toLowerCase().includes("ikan") ||
          item.productTag?.toLowerCase().includes("kerupuk") ||
          item.review.toLowerCase().includes("kerupuk") ||
          item.review.toLowerCase().includes("jambal");
        if (!isIkan) return false;
      } else if (selectedCategory === "seafood") {
        const isSeafood =
          item.productTag?.toLowerCase().includes("seafood") ||
          item.productTag?.toLowerCase().includes("terasi") ||
          item.review.toLowerCase().includes("rebon") ||
          item.review.toLowerCase().includes("terasi");
        if (!isSeafood) return false;
      }

      // 2. Search query filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchLocation = item.location.toLowerCase().includes(query);
        const matchReview = item.review.toLowerCase().includes(query);
        const matchTag = item.productTag?.toLowerCase().includes(query);
        return matchName || matchLocation || matchReview || matchTag;
      }

      return true;
    });
  }, [testimonials, searchQuery, selectedCategory]);

  // Show 6 items initially to keep mobile & tablet scroll concise
  const INITIAL_COUNT = 6;
  const visibleTestimonials = isExpanded
    ? filteredTestimonials
    : filteredTestimonials.slice(0, INITIAL_COUNT);

  const hasMore = filteredTestimonials.length > INITIAL_COUNT;

  return (
    <div className="w-full min-h-screen bg-slate-50/60 pb-12 sm:pb-16">
      {/* ========================================================= */}
      {/* 1. HERO / BANNER HEADER (Modular PageHero)                */}
      {/* ========================================================= */}
      <PageHero
        badgeIcon={<ShieldCheck className="w-4 h-4 text-[#7ee3c8]" />}
        badgeText={t.testimonials.badge}
        titleStart={t.testimonials.titleStart}
        titleHighlight={t.testimonials.titleHighlight}
        subtitle={t.testimonials.subtitle}
        ribbonItems={[
          {
            icon: <Star className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" />,
            title: t.testimonials.ratingText,
            subtitle:
              testimonials.length > 0
                ? `${testimonials.length}+ ${t.testimonials.ratingSub}`
                : t.testimonials.ratingSub,
          },
          {
            icon: <Award className="w-5 h-5 text-[#7ee3c8] shrink-0" />,
            title: t.testimonials.naturalText,
            subtitle: t.testimonials.naturalSub,
          },
          {
            icon: <Truck className="w-5 h-5 text-[#7ee3c8] shrink-0" />,
            title: t.testimonials.shippingText,
            subtitle: t.testimonials.shippingSub,
          },
          {
            icon: <Sparkles className="w-5 h-5 text-[#7ee3c8] shrink-0" />,
            title: t.testimonials.authenticText,
            subtitle: t.testimonials.authenticSub,
          },
        ]}
      />

      {/* ========================================================= */}
      {/* 2. SEARCH & COMPACT FILTER CHIPS                          */}
      {/* ========================================================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-xl shadow-slate-200/70 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsExpanded(false);
              }}
              placeholder={t.testimonials.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#008276]/30 focus:border-[#008276] transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setIsExpanded(false);
                }}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer",
                  selectedCategory === cat.id
                    ? "bg-[#008276] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Counter Info */}
        <div className="flex items-center justify-between text-xs text-slate-500 mt-2.5 px-1">
          <span>
            {t.testimonials.showingReviews.replace("{count}", String(visibleTestimonials.length)).replace("{total}", String(filteredTestimonials.length))}
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-[#008276] hover:underline font-medium cursor-pointer"
            >
              {t.catalog.resetFilter}
            </button>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. TESTIMONIALS GRID / SKELETON / EMPTY                   */}
      {/* ========================================================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
        ) : testimonials.length === 0 ? (
          /* Empty state when no testimonials in database */
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 shadow-xs max-w-lg mx-auto">
            <MessageSquareHeart className="w-12 h-12 text-[#8a6843]/50 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-[#0a2642]">
              {t.testimonials.emptyTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-1.5 max-w-sm mx-auto leading-relaxed">
              {t.testimonials.emptyDesc}
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <a
                href="https://wa.me/6281214145254?text=Halo%20Admin%20UMKM%20Mundu%20Pesisir,%20saya%20ingin%20memberikan%20ulasan%20dan%20testimoni%20produk."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#00c853] hover:bg-[#00b049] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors inline-flex items-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>{t.testimonials.sendReviewWa}</span>
              </a>
            </div>
          </div>
        ) : filteredTestimonials.length === 0 ? (
          /* Empty search result */
          <div className="text-center py-12 px-4 bg-white rounded-xl border border-slate-200 shadow-xs">
            <MessageSquareHeart className="w-10 h-10 text-slate-300 mx-auto mb-2.5" />
            <h2 className="text-base font-bold text-slate-700">
              {t.catalog.emptyTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {t.catalog.emptyDesc}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-3 px-3.5 py-1.5 rounded-xl bg-[#008276] text-white text-xs font-semibold hover:bg-[#006e64] transition-colors cursor-pointer"
            >
              {t.catalog.resetFilter}
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 items-stretch">
              {visibleTestimonials.map((item) => (
                <TestimonialCard
                  key={item.id}
                  item={item}
                  className="h-full"
                />
              ))}
            </div>

            {/* Smart Expand / Collapse Button */}
            {hasMore && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#0a2642] hover:text-[#008276] text-xs sm:text-sm font-bold border border-slate-300 shadow-xs hover:shadow-sm transition-all cursor-pointer"
                >
                  {isExpanded ? (
                    <>
                      <span>{t.testimonials.showLess}</span>
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>
                        {t.testimonials.showMore} ({filteredTestimonials.length - INITIAL_COUNT})
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {/* ========================================================= */}
        {/* 4. COMPACT BOTTOM BANNER                                  */}
        {/* ========================================================= */}
        <section
          aria-label="Kirim Ulasan dan Pesan Produk"
          className="mt-8 sm:mt-10 rounded-2xl p-5 sm:p-6 md:p-8 bg-linear-to-r from-[#0a2642] via-[#0d3356] to-[#0a2642] border border-[#d8c7b4]/40 shadow-lg text-white relative overflow-hidden text-center sm:text-left"
        >
          {/* Subtle Coastal Radial Light */}
          <div
            className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-3xl blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6">
            <div className="max-w-xl">
              <span className="inline-block px-3 py-1 rounded-xl text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-[#008276] text-white mb-1.5">
                {t.testimonials.badge}
              </span>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight font-sans">
                {t.testimonials.bottomTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                {t.testimonials.bottomSubtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto shrink-0">
              <a
                href="https://wa.me/6281214145254?text=Halo%20Admin%20UMKM%20Mundu%20Pesisir,%20saya%20ingin%20memberikan%20ulasan%20dan%20testimoni%20produk."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#00c853] hover:bg-[#00b049] text-white text-xs sm:text-sm font-bold shadow-xs hover:-translate-y-0.5 transition-all text-center"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                <span>{t.testimonials.sendReviewWa}</span>
              </a>

              <Link
                href="/produk"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-bold transition-all text-center"
              >
                <span>{t.catalog.viewAllBtn}</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
