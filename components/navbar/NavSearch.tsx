"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Loader2, ArrowRight, Tag, AlertCircle } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { ProductItem } from "@/constants/products";
import { cn } from "@/lib";

interface NavSearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onSelectProduct?: (product: ProductItem) => void;
  className?: string;
  isMobile?: boolean;
}

const POPULAR_SUGGESTIONS = ["Siwang Original", "Siwang Pedas", "Kerupuk Payur", "Terasi Rebon"];

export const NavSearch: React.FC<NavSearchProps> = ({
  placeholder = "Cari produk & info...",
  onSearch,
  onSelectProduct,
  className = "",
  isMobile = false,
}) => {
  const router = useRouter();
  const { products, isLoading } = useProducts();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce typing (250ms) like Steam search
  useEffect(() => {
    if (!query) {
      setDebouncedQuery("");
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
      setIsTyping(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // Filter matching products
  const matchingProducts = useMemo(() => {
    if (!debouncedQuery) return [];
    const q = debouncedQuery.toLowerCase();

    return products
      .filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryKey.toLowerCase().includes(q) ||
          (p.badge && p.badge.toLowerCase().includes(q)) ||
          (p.details?.composition && p.details.composition.toLowerCase().includes(q))
        );
      })
      .slice(0, 5); // Steam-style top 5 suggestions
  }, [debouncedQuery, products]);

  // Count total matches (for the "Lihat semua X produk" footer)
  const totalMatchesCount = useMemo(() => {
    if (!debouncedQuery) return 0;
    const q = debouncedQuery.toLowerCase();
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryKey.toLowerCase().includes(q) ||
        (p.badge && p.badge.toLowerCase().includes(q))
      );
    }).length;
  }, [debouncedQuery, products]);

  // Reset selectedIndex when results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [matchingProducts]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
    onSearch?.(value);
  };

  const handleClear = () => {
    setQuery("");
    setDebouncedQuery("");
    setIsOpen(false);
    onSearch?.("");
    inputRef.current?.focus();
  };

  const handleSelectProduct = (product: ProductItem) => {
    setIsOpen(false);
    onSelectProduct?.(product);
    router.push(`/produk/${product.id}`);
  };

  const handleViewAll = () => {
    setIsOpen(false);
    if (query.trim()) {
      router.push(`/produk?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/produk");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" && query.trim()) {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < matchingProducts.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : matchingProducts.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && matchingProducts[selectedIndex]) {
        handleSelectProduct(matchingProducts[selectedIndex]);
      } else {
        handleViewAll();
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const showDropdown = isOpen && query.trim().length > 0;

  return (
    <div ref={containerRef} className={cn("relative flex items-center shrink-0", className)}>
      <div className="absolute left-3 text-[#8a6843] pointer-events-none flex items-center z-10">
        {isTyping || isLoading ? (
          <Loader2 className="w-3.5 h-3.5 text-[#008276] animate-spin" />
        ) : (
          <Search className="w-3.5 h-3.5 text-[#8a6843]" />
        )}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => {
          if (query.trim()) setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "bg-white/95 text-[#0a2642] placeholder:text-[#8c7a68] text-xs sm:text-sm pl-8.5 pr-7 py-1.5 sm:py-2 rounded-lg border border-[#d3c1ac] focus:border-[#0a2642] focus:outline-hidden focus:ring-2 focus:ring-[#0a2642]/15 transition-all duration-300 shadow-2xs",
          isMobile
            ? "w-full"
            : "w-full lg:w-36 xl:w-56 focus:lg:w-48 focus:xl:w-64"
        )}
        autoComplete="off"
        role="combobox"
        aria-expanded={showDropdown}
        aria-autocomplete="list"
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2.5 text-[#8c7a68] hover:text-[#0a2642] transition-colors p-0.5 z-10"
          title="Hapus pencarian"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Steam-Style Autocomplete Popover Dropdown */}
      {showDropdown && (
        <div
          className={cn(
            "absolute top-full mt-2 bg-white/98 backdrop-blur-md border border-[#d8c7b4] rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150",
            isMobile
              ? "left-0 right-0 w-full"
              : "right-0 w-90 sm:w-105 max-w-[92vw]"
          )}
        >
          {/* Header Bar */}
          <div className="px-4 py-2.5 bg-linear-to-r from-[#f8efe6] to-[#f2e7db] border-b border-[#ebdccb] flex items-center justify-between text-xs text-[#6e5843]">
            <div className="flex items-center gap-1.5 font-semibold text-[#0a2642]">
              <Search className="w-3 h-3 text-[#008276]" />
              <span>
                {isTyping
                  ? "Mencari produk..."
                  : matchingProducts.length > 0
                  ? `Hasil Pencarian (${totalMatchesCount} Produk)`
                  : "Hasil Pencarian"}
              </span>
            </div>
            {matchingProducts.length > 0 && (
              <span className="text-[11px] text-[#8a6843]">
                Pilih atau tekan Enter
              </span>
            )}
          </div>

          {/* Product Items List (Steam Style) */}
          {matchingProducts.length > 0 ? (
            <div className="max-h-80 overflow-y-auto divide-y divide-[#f2e7db]/70">
              {matchingProducts.map((product, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleSelectProduct(product)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={cn(
                      "w-full text-left p-3 flex items-center gap-3 transition-all duration-150 group",
                      isSelected
                        ? "bg-[#f2e7db] text-[#0a2642]"
                        : "hover:bg-[#f8efe6]/80 text-[#1b3d64]"
                    )}
                  >
                    {/* Thumbnail Image */}
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-[#ebdccb] shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="48px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#008276] bg-[#008276]/10 px-1.5 py-0.5 rounded">
                          {product.categoryLabel}
                        </span>
                        {product.badge && (
                          <span className="text-[10px] font-semibold text-amber-800 bg-amber-100/70 px-1.5 py-0.5 rounded">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-[#0a2642] truncate group-hover:text-[#008276] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs font-bold text-[#008276] mt-0.5">
                        {product.priceFormatted}
                      </p>
                    </div>

                    {/* Arrow Action Indicator */}
                    <div className="text-[#8c7a68] group-hover:text-[#0a2642] group-hover:translate-x-0.5 transition-all p-1">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                );
              })}
            </div>
          ) : !isTyping && debouncedQuery.length > 0 ? (
            /* Empty State */
            <div className="p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2.5">
                <AlertCircle className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#0a2642]">
                Tidak ada produk yang cocok
              </p>
              <p className="text-xs text-[#8c7a68] mt-1">
                Tidak ditemukan olahan dengan kata kunci &ldquo;{debouncedQuery}&rdquo;
              </p>

              {/* Suggestions */}
              <div className="mt-4 pt-3 border-t border-[#ebdccb]">
                <div className="flex items-center justify-center gap-1 text-[11px] text-[#8a6843] mb-2 font-medium">
                  <Tag className="w-3 h-3" />
                  <span>Coba cari produk populer ini:</span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {POPULAR_SUGGESTIONS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleSelectSuggestion(item)}
                      className="text-xs px-2.5 py-1 rounded-full bg-[#f4ece1] hover:bg-[#ebdccb] text-[#0a2642] border border-[#d8c7b4]/60 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {/* Steam-Style Footer: View all results in catalog */}
          {matchingProducts.length > 0 && (
            <div className="p-2.5 bg-[#f8efe6] border-t border-[#ebdccb] flex items-center justify-between">
              <button
                type="button"
                onClick={handleViewAll}
                className="w-full py-2 px-3 rounded-lg bg-[#0a2642] hover:bg-[#06192d] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span>Lihat semua {totalMatchesCount} produk di katalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
