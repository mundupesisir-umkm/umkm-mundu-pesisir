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
import { ProductCard } from "./ProductCard";
import { cn, formatWhatsAppNumber } from "@/lib";

const SORT_OPTIONS = [
  { id: "default", label: "Urutan Rekomendasi" },
  { id: "price-asc", label: "Harga: Termurah" },
  { id: "price-desc", label: "Harga: Tertinggi" },
  { id: "name-asc", label: "Nama: A — Z" },
];

const FAQS = [
  {
    q: "Berapa lama daya tahan Sambal Siwang di suhu ruangan?",
    a: "Siwang kami tahan hingga 3–4 bulan di suhu ruang selama disimpan rapat dalam standing pouch zipper dan tidak terkena sinar matahari langsung atau kelembapan tinggi.",
  },
  {
    q: "Apakah produk terasi rebon menggunakan pewarna sintetis atau pengawet?",
    a: "Sama sekali tidak. Warna merah kecokelatan alami berasal dari fermentasi 100% udang rebon asli perairan pesisir Cirebon dengan garam laut alami.",
  },
  {
    q: "Bagaimana cara memesan dalam jumlah banyak (grosir / oleh-oleh)?",
    a: "Anda dapat menghubungi WhatsApp admin kami langsung. Kami menyediakan harga khusus reseller, kemasan kardus khusus oleh-oleh, dan bisa request stiker atau label khusus hajatan.",
  },
  {
    q: "Apakah aman dikirim ke luar kota atau luar Pulau Jawa?",
    a: "Sangat aman. Setiap pesanan dikemas menggunakan standing pouch tebal dan dilapisi bubble wrap serta kardus tebal untuk memastikan kerenyahan produk tetap terjaga hingga tujuan.",
  },
];

export const AllProductsCatalogView: React.FC = () => {
  const { products, isLoading } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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
      {/* 1. HERO / BANNER HEADER                                   */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#0a2642] via-[#0c2f52] to-[#081f36] text-white pt-24 sm:pt-28 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8">
        {/* Subtle Decorative Background Circles */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-[#008276]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 translate-y-10 w-80 h-80 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#7ee3c8] text-xs sm:text-sm font-semibold tracking-wide mb-4">
            <span>KATALOG RESMI UMKM DESA MUNDU PESISIR</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans text-white max-w-4xl mx-auto leading-tight">
            Produk Olahan Pesisir{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#7ee3c8] via-teal-200 to-amber-200">
              Otentik Cirebon
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
            {PRODUCT_CATALOG_CONFIG.pageSubtitle}
          </p>

          {/* Trust Value Badges Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-8 sm:mt-10">
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-left">
              <Award className="w-5 h-5 text-[#7ee3c8] shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">100% Rebon Pesisir</p>
                <p className="text-[11px] text-slate-300">Fermentasi murni tanpa kimia</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-left">
              <ShieldCheck className="w-5 h-5 text-[#7ee3c8] shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Higienis & P-IRT</p>
                <p className="text-[11px] text-slate-300">Standar mutu teruji</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-left">
              <Truck className="w-5 h-5 text-[#7ee3c8] shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Kirim Se-Indonesia</p>
                <p className="text-[11px] text-slate-300">Pouch zipper kedap udara</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-left">
              <CheckCircle2 className="w-5 h-5 text-[#7ee3c8] shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Berdayakan Nelayan</p>
                <p className="text-[11px] text-slate-300">Langsung dari pengrajin</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                placeholder="Cari Siwang original, pedas, kerupuk, terasi, dll..."
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
                {SORT_OPTIONS.map((opt) => (
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
                Kategori:
              </span>
              {PRODUCT_CATALOG_CONFIG.categories.map((cat) => {
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
                Menampilkan <strong>{filteredAndSortedProducts.length}</strong> produk
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-bold text-[#008276] hover:text-[#064e3b] underline cursor-pointer"
                >
                  Reset Filter
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
              Katalog Produk Belum Tersedia
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
              Saat ini belum ada produk yang terdaftar di dalam database UMKM Desa Mundu Pesisir. Silakan hubungi kami untuk informasi pesanan atau gunakan portal admin untuk mengelola katalog.
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
                <Send className="w-4 h-4" />
                <span>Hubungi via WhatsApp</span>
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
              Tidak Ada Produk yang Ditemukan
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              Tidak ada produk yang cocok dengan pencarian &quot;{searchQuery}&quot;. Coba gunakan kata kunci lain atau bersihkan filter.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 px-5 py-2.5 rounded-full bg-[#008276] hover:bg-[#006e64] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
            >
              Lihat Semua Produk
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
            <span>PANDUAN PEMBELIAN & PENYIMPANAN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2642] font-sans">
            Pertanyaan Seputar Produk
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Informasi penting mengenai kualitas bahan baku, ketahanan simpan, dan prosedur pengiriman produk UMKM kami.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
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
