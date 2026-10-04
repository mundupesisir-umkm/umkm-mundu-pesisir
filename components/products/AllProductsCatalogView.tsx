"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Filter,
  ArrowUpDown,
  X,
  ShieldCheck,
  Send,
  Sparkles,
  ShoppingBag,
  HelpCircle,
  Truck,
  CheckCircle2,
  Award,
} from "lucide-react";
import { PRODUCT_CATALOG_CONFIG, ProductItem } from "@/constants/products";
import { useProducts } from "@/hooks/useProducts";
import { useLanguage } from "@/lib/i18n";
import { WhatsAppIcon } from "@/components/icons";
import { ProductCard } from "./ProductCard";
import { PageHero } from "@/components/ui";
import { cn, formatWhatsAppNumber } from "@/lib";

interface AllProductsCatalogViewProps {
  initialProducts?: ProductItem[];
  defaultCategory?: string;
}

export const AllProductsCatalogView: React.FC<AllProductsCatalogViewProps> = ({
  initialProducts,
  defaultCategory = "all",
}) => {
  const { products, isLoading } = useProducts(initialProducts);
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [sortBy, setSortBy] = useState("default");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Sync search query from URL query parameters (?q=... or ?search=...)
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q") || params.get("search");
      if (q) {
        setSearchQuery(q);
      }
    }
  }, []);

  const sortOptions = useMemo(() => [
    { id: "default", label: t.catalog.sortDefault },
    { id: "price-asc", label: t.catalog.sortPriceAsc },
    { id: "price-desc", label: t.catalog.sortPriceDesc },
    { id: "name-asc", label: t.catalog.sortNameAsc },
  ], [t]);

  const localizedCategories = useMemo(() => {
    const base = [
      { id: "all", label: t.catalog.allCategory },
      { id: "siwang", label: t.catalog.siwangCategory },
      { id: "seafood", label: t.catalog.seafoodCategory },
      { id: "beras", label: t.catalog.berasCategory },
    ];
    // Gather any additional custom categories from products that aren't in base
    const customCats: { id: string; label: string }[] = [];
    products.forEach((p) => {
      if (p.categoryKey && !base.some((b) => b.id === p.categoryKey)) {
        if (!customCats.some((c) => c.id === p.categoryKey)) {
          customCats.push({
            id: p.categoryKey,
            label: p.categoryLabel || p.categoryKey.toUpperCase(),
          });
        }
      }
    });
    return [...base, ...customCats];
  }, [t, products]);

  // Filter & Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products];

    // 1. Filter by category
    if (selectedCategory !== "all") {
      list = list.filter((p) => p.categoryKey === selectedCategory);
    }

    // 2. Filter by search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.details?.composition.toLowerCase().includes(q)
      );
    }

    // 3. Sort
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy, products]);

  const hasActiveFilters = searchQuery.trim() !== "" || selectedCategory !== "all" || sortBy !== "default";

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("default");
  };

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen">
      {/* ========================================================= */}
      {/* 1. HERO / BANNER HEADER (Modular PageHero)                */}
      {/* ========================================================= */}
      <PageHero
        badgeIcon={<ShoppingBag className="w-4 h-4 text-[#7ee3c8]" />}
        badgeText={t.catalog.officialBadge}
        titleStart={t.catalog.titleStart}
        titleHighlight={t.catalog.titleHighlight}
        subtitle={t.catalog.subtitle}
        ribbonItems={[
          {
            icon: <Award className="w-5 h-5 text-[#7ee3c8] shrink-0" />,
            title: t.catalog.trust1,
            subtitle: t.catalog.trust1Sub,
          },
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#7ee3c8] shrink-0" />,
            title: t.catalog.trust2,
            subtitle: t.catalog.trust2Sub,
          },
          {
            icon: <Truck className="w-5 h-5 text-[#7ee3c8] shrink-0" />,
            title: t.catalog.trust3,
            subtitle: t.catalog.trust3Sub,
          },
          {
            icon: <CheckCircle2 className="w-5 h-5 text-[#7ee3c8] shrink-0" />,
            title: t.catalog.trust4,
            subtitle: t.catalog.trust4Sub,
          },
        ]}
      />

      {/* ========================================================= */}
      {/* 2. CONTROLS: SEARCH, CATEGORIES, & SORTING BAR            */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl shadow-slate-200/70 border border-slate-100 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.catalog.searchPlaceholder}
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#008276]/30 focus:border-[#008276] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <ArrowUpDown className="w-4 h-4 text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-3 px-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#008276]/30 focus:border-[#008276] cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                {t.catalog.filterLabel}
              </span>
              {localizedCategories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer",
                      isActive
                        ? "bg-[#008276] text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    )}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Counter & Reset Filter */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-500">
                {t.catalog.showingCount} <strong>{filteredAndSortedProducts.length}</strong> produk
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-bold text-[#008276] hover:text-[#064e3b] underline cursor-pointer"
                >
                  {t.catalog.resetFilter}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. PRODUCT GRID / SKELETON / EMPTY STATE                  */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-3xl p-4 bg-white border border-slate-100 shadow-xs animate-pulse flex flex-col gap-3"
              >
                <div className="aspect-4/3 w-full rounded-2xl bg-slate-200" />
                <div className="h-3 w-24 bg-slate-200 rounded" />
                <div className="h-5 w-3/4 bg-slate-200 rounded" />
                <div className="h-3 w-full bg-slate-200 rounded" />
                <div className="h-6 w-28 bg-slate-200 rounded mt-2" />
              </div>
            ))}
          </div>
        ) : filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          /* Empty State when Database has no products */
          <div className="text-center py-20 px-4 bg-white rounded-3xl border border-slate-200/80 shadow-xs max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#008276]/10 text-[#008276] flex items-center justify-center mx-auto mb-4 border border-[#008276]/20">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-[#0a2642] font-sans">
              {t.catalog.emptyTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
              {t.catalog.emptyDesc}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/${PRODUCT_CATALOG_CONFIG.whatsappAdminNumber}?text=${encodeURIComponent(
                  "Halo Admin UMKM Mundu Pesisir, saya ingin menanyakan daftar produk dan ketersediaan stok terbaru."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-[#00c853] hover:bg-[#00b049] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors inline-flex items-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>{t.catalog.contactWaBtn}</span>
              </a>
              <Link
                href="/admin"
                className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-1.5"
              >
                <span>Kelola di Portal Admin</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Empty State when Filter/Search yields no results */
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200/80 shadow-xs max-w-xl mx-auto">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">
              {t.catalog.emptyFilterTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              {t.catalog.emptyFilterDesc}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 px-5 py-2.5 rounded-full bg-[#008276] hover:bg-[#006e64] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
            >
              {t.catalog.viewAllBtn}
            </button>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 4. PRODUCT FAQ & STORAGE GUIDE                            */}
      {/* ========================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008276] uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>{t.catalog.faqBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2642] font-sans">
            {t.catalog.faqTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            {t.catalog.faqSubtitle}
          </p>
        </div>

        <div className="space-y-3">
          {t.catalog.faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#0a2642] hover:text-[#008276] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-slate-400 font-normal shrink-0 text-base">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
