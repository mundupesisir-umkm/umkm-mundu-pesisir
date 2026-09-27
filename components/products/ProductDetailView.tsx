"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Share2,
  Check,
  ShieldCheck,
  Clock,
  PackageCheck,
  Truck,
  Star,
  Send,
  Sparkles,
  ShoppingBag,
  MapPin,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Award,
} from "lucide-react";
import { ProductItem, PRODUCT_CATALOG_CONFIG } from "@/constants/products";
import { fetchProductById, fetchProducts, formatRupiah } from "@/lib/supabase";
import { formatWhatsAppNumber } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

interface ProductDetailViewProps {
  productId: string;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  productId,
}) => {
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      try {
        const [prodRes, listRes] = await Promise.all([
          fetchProductById(productId),
          fetchProducts(),
        ]);

        if (!isMounted) return;

        if (prodRes.data) {
          setProduct(prodRes.data);
        } else {
          // Fallback to static config if any
          const fallback = PRODUCT_CATALOG_CONFIG.products.find(
            (p) => p.id === productId
          );
          setProduct(fallback || null);
        }

        if (listRes.data) {
          const others = listRes.data
            .filter((p) => p.id !== productId)
            .slice(0, 3);
          setRelatedProducts(others);
        }
      } catch (err) {
        console.error("Error loading product detail:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [productId]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const incrementQty = () => setQuantity((q) => Math.min(q + 1, 99));
  const decrementQty = () => setQuantity((q) => Math.max(q - 1, 1));

  // Loading State
  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#f8fafc] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto animate-pulse space-y-8">
          <div className="h-6 w-48 bg-slate-200 rounded-lg" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-6 space-y-4">
              <div className="aspect-4/3 w-full bg-slate-200 rounded-3xl" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-16 bg-slate-200 rounded-2xl" />
                <div className="h-16 bg-slate-200 rounded-2xl" />
              </div>
            </div>
            <div className="lg:col-span-6 space-y-5">
              <div className="h-4 w-28 bg-slate-200 rounded" />
              <div className="h-10 w-3/4 bg-slate-200 rounded" />
              <div className="h-8 w-40 bg-slate-200 rounded" />
              <div className="h-24 w-full bg-slate-200 rounded-2xl" />
              <div className="h-14 w-full bg-slate-200 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!product) {
    return (
      <div className="w-full min-h-[75vh] flex items-center justify-center bg-[#f8fafc] px-4 py-24">
        <div className="text-center max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#0a2642] font-sans">
            Produk Tidak Ditemukan
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Maaf, data produk yang Anda cari tidak tersedia atau telah dihapus
            oleh admin UMKM Mundu Pesisir.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/produk"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#008276] hover:bg-[#006e64] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Katalog</span>
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors inline-flex items-center justify-center"
            >
              Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const targetPhone = formatWhatsAppNumber(product.phone);
  const totalPrice = product.price * quantity;
  const totalPriceFormatted = formatRupiah(totalPrice);

  const whatsappOrderUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(
    `Halo Pengrajin UMKM Mundu Pesisir, saya tertarik dan ingin memesan produk:\n\n*${product.name}*\nJumlah: ${quantity} kemasan\nEstimasi Total: ${totalPriceFormatted}\n\nMohon informasi ketersediaan stok terbaru dan rincian ongkos kirim ke alamat saya. Terima kasih!`
  )}`;

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen">
      {/* ========================================================= */}
      {/* 1. TOP BREADCRUMB & BACK NAVIGATION                      */}
      {/* ========================================================= */}
      <div className="border-b border-slate-200/80 sticky top-0 z-30 shadow-2xs backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-none"
          >
            <Link
              href="/"
              className="hover:text-[#008276] font-medium transition-colors"
            >
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link
              href="/produk"
              className="hover:text-[#008276] font-medium transition-colors"
            >
              Katalog Produk
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-[#008276] font-bold">
              {product.categoryLabel}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:inline" />
            <span className="text-slate-800 font-semibold truncate max-w-45 sm:max-w-xs hidden sm:inline">
              {product.name}
            </span>
          </nav>

          {/* Quick Back & Share Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopyLink}
              title="Salin Tautan Produk"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Tersalin!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden sm:inline">Bagikan</span>
                </>
              )}
            </button>
            <Link
              href="/produk"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#008276]/10 hover:bg-[#008276]/20 text-[#008276] text-xs font-bold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Semua Produk</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. PRODUCT HERO & PURCHASE SUMMARY (2 COLUMNS)            */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Product Visuals & Trust Highlights (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Big Main Image Container */}
            <div className="relative aspect-4/3 w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-md group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Tag / Badge Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3.5 py-1.5 rounded-xl bg-[#0a2642]/85 backdrop-blur-md text-white text-[11px] font-bold tracking-wide shadow-xs border border-white/20">
                  {product.categoryLabel}
                </span>
                {product.badge && (
                  <span className="px-3 py-1 rounded-xl bg-[#008276] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Artisan Verified Stamp */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/80 text-[#0a2642] text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
                <Award className="w-4 h-4 text-[#008276]" />
                <span>100% Olahan Pesisir Asli</span>
              </div>
            </div>

            {/* Trust Badges Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    Bebas Pengawet
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Fermentasi garam alami
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#008276] flex items-center justify-center shrink-0 border border-teal-100">
                  <PackageCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    Kemasan Higienis
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Kedap udara & renyah
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    Tahan Lama
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {product.details?.shelfLife || "3–4 Bulan"}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    Kirim Seluruh RI
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Free bubble wrap
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Producer Info Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-br from-[#0a2642] to-[#0d345a] text-white shadow-xs">
              <div className="flex items-center gap-2 text-[#7ee3c8] text-xs font-bold uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>ASAL PRODUKSI & PENGRAJIN</span>
              </div>
              <h4 className="font-extrabold text-sm sm:text-base font-sans">
                Sentra UMKM Desa Mundupesisir
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Diproduksi langsung oleh kelompok usaha mikro warga pesisir
                Kecamatan Mundu, Kabupaten Cirebon, Jawa Barat. Pembelian Anda
                berkontribusi langsung memberdayakan ekonomi keluarga nelayan
                lokal.
              </p>
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-300">Nomor Pengrajin (WA):</span>
                <span className="font-mono font-bold text-[#7ee3c8]">
                  {product.phone || "0812-1414-5254"}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Metadata, Pricing & Order Box (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              {/* Category */}
              <div className="mb-2">
                <span className="text-xs font-extrabold text-[#008276] uppercase tracking-wider">
                  {product.categoryLabel}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0a2642] font-sans tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Rating & Review */}
              <div className="flex items-center gap-2.5 mt-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700">5.0</span>
                <span className="text-xs text-slate-500">
                  (Rekomendasi Oleh-Oleh Khas Pesisir)
                </span>
              </div>

              {/* Price Banner */}
              <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 font-medium block">
                    Harga Satuan Resmi UMKM
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#008276] font-sans mt-0.5">
                    {product.priceFormatted}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-xl bg-teal-50 text-[#008276] text-xs font-bold border border-teal-200/70">
                    Harga Langsung Pengrajin
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    Tanpa biaya perantara / mark-up
                  </span>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4">
                {product.description}
              </p>
            </div>

            {/* Quick Specs Highlight */}
            {product.details && (
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col gap-2.5 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#008276] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Komposisi:</strong>{" "}
                    <span className="text-slate-600">
                      {product.details.composition}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Ketahanan:</strong>{" "}
                    <span className="text-slate-600">
                      {product.details.shelfLife}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <PackageCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Jenis Kemasan:</strong>{" "}
                    <span className="text-slate-600">
                      {product.details.packaging}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Purchase & Quantity Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-[#008276]/30 shadow-md flex flex-col gap-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-extrabold text-[#0a2642] text-sm sm:text-base font-sans">
                    Atur Jumlah Pesanan
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pilih kuantiti untuk menghitung total pesanan Anda
                  </p>
                </div>

                {/* Counter */}
                <div className="inline-flex items-center rounded-2xl border border-slate-300 bg-slate-50 p-1">
                  <button
                    type="button"
                    onClick={decrementQty}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer transition-colors shadow-2xs"
                    aria-label="Kurangi jumlah"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-extrabold text-sm text-[#0a2642] font-sans">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={incrementQty}
                    className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors shadow-2xs"
                    aria-label="Tambah jumlah"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Calculation Display */}
              <div className="pt-4 border-t border-slate-100 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium">
                    Estimasi Total Pembelian ({quantity} item):
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#008276] font-sans">
                  {totalPriceFormatted}
                </div>
              </div>

              {/* Direct WhatsApp Call to Action */}
              <div className="pt-2">
                <a
                  href={whatsappOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#00c853] hover:bg-[#00b049] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 shadow-md shadow-emerald-500/20 hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer"
                >
                  <Send className="w-4 h-4 shrink-0" />
                  <span>Pesan Sekarang ke Pengrajin (WA)</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  Pesan langsung terhubung dengan nomor WhatsApp produsen terkait
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. RELATED PRODUCTS SECTION                               */}
      {/* ========================================================= */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-[#008276] uppercase tracking-wider block mb-1">
                KREASI OLAHAN LAINNYA
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2642] font-sans">
                Produk Terkait UMKM Mundu Pesisir
              </h2>
            </div>
            <Link
              href="/produk"
              className="text-xs sm:text-sm font-bold text-[#008276] hover:text-[#006e64] inline-flex items-center gap-1 group"
            >
              <span>Lihat Semua Katalog</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {relatedProducts.map((relProd) => (
              <ProductCard key={relProd.id} product={relProd} />
            ))}
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 4. BOTTOM HELP / CUSTOM ORDER BANNER                      */}
      {/* ========================================================= */}
      <section className="bg-linear-to-r from-[#0a2642] via-[#0d345a] to-[#0a2642] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-sans">
            Butuh Bantuan atau Mau Diskusi Pesanan Khusus?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl mx-auto leading-relaxed">
            Tim dan pengrajin UMKM Desa Mundupesisir siap membantu memberikan
            informasi ketersediaan stok teranyar, rekomendasi rasa, dan negosiasi
            harga pesanan partai besar.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${targetPhone}?text=${encodeURIComponent(
                `Halo Pengrajin UMKM Mundu Pesisir, saya ingin berkonsultasi mengenai pemesanan produk ${product.name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#00c853] hover:bg-[#00b049] text-white text-xs sm:text-sm font-bold shadow-md transition-all inline-flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Chat WhatsApp Langsung</span>
            </a>
            <Link
              href="/kontak"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2"
            >
              <span>Hubungi Pengurus Desa</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
