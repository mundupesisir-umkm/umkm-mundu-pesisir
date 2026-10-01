"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Send, ShoppingBag } from "lucide-react";
import { PRODUCT_CATALOG_CONFIG } from "@/constants/products";
import { useProducts } from "@/hooks/useProducts";
import { useLanguage } from "@/lib/i18n";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib";

interface ProductCatalogSectionProps {
  id?: string;
  className?: string;
  initialProducts?: import("@/constants/products").ProductItem[];
}

export const ProductCatalogSection: React.FC<ProductCatalogSectionProps> = ({
  id = "produk",
  className,
  initialProducts,
}) => {
  const { products, isLoading } = useProducts(initialProducts);
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(
    () => [
      { id: "all", label: t.catalog.allCategory },
      { id: "siwang", label: t.catalog.siwangCategory },
      { id: "seafood", label: t.catalog.seafoodCategory },
    ],
    [t]
  );

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") {
      return products;
    }
    return products.filter(
      (p) => p.categoryKey === selectedCategory
    );
  }, [selectedCategory, products]);

  return (
    <section
      id={id}
      aria-label="Katalog Produk Unggulan UMKM"
      className={cn(
        "w-full relative overflow-hidden bg-linear-to-b from-[#f2f9f8] via-[#e8f6f5] to-[#f4f7f6] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#d8ebe7] scroll-mt-16 sm:scroll-mt-20",
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* ========================================================= */}
        {/* HEADER: Title & Filter Pill Tabs                          */}
        {/* ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 lg:mb-12">
          {/* Left Title Area */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0a2642] tracking-tight font-sans">
              {t.catalog.sectionHeadline}
            </h2>
            <p className="text-xs sm:text-sm text-[#4b5563] mt-1 font-medium">
              {t.catalog.sectionSubtitle}
            </p>
          </div>

          {/* Right Category Filter Pills (matching reference image) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-[#7ee3c8] text-[#064e3b] shadow-2xs"
                      : "bg-transparent border border-slate-400 text-slate-700 hover:bg-white/80"
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* PRODUCT CARDS GRID / SKELETON / EMPTY STATE               */}
        {/* ========================================================= */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {[1, 2, 3].map((i) => (
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
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          /* Empty State when no products in DB */
          <div className="text-center py-16 px-4 bg-white/90 backdrop-blur-xs rounded-3xl border border-[#d8ebe7] shadow-xs max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#008276]/10 text-[#008276] flex items-center justify-center mx-auto mb-4 border border-[#008276]/20">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#0a2642] font-sans">
              Belum Ada Produk Tersedia
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
              Katalog produk saat ini belum ditambahkan atau sedang dalam pembaruan oleh pengrajin UMKM Desa Mundu Pesisir.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/6281214145254?text=Halo%20Admin%20UMKM%20Mundu%20Pesisir%2C%20saya%20ingin%20menanyakan%20katalog%20produk%20terbaru."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#008276] hover:bg-[#006e64] text-white text-xs sm:text-sm font-bold shadow-xs transition-all inline-flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Hubungi Admin via WA</span>
              </a>
              <Link
                href="/admin"
                className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-1.5"
              >
                <span>Kelola di Portal Admin</span>
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* BOTTOM BUTTON: Lihat Semua Katalog ->                     */}
        {/* ========================================================= */}
        {filteredProducts.length > 0 && (
          <div className="mt-10 sm:mt-14 flex justify-center">
            <Link
              href="/produk"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white hover:bg-teal-50 text-[#0a2642] hover:text-[#008276] border-2 border-[#008276] text-xs sm:text-sm md:text-base font-bold shadow-xs hover:shadow-md transition-all duration-200 group"
            >
              <span>{t.catalog.viewAllBtn}</span>
              <ArrowRight className="w-4 h-4 text-[#008276] group-hover:translate-x-1.5 transition-transform duration-200" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
