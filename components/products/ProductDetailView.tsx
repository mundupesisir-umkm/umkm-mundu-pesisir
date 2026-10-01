"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Star, AlertCircle, ArrowLeft } from "lucide-react";
import { ProductItem, PRODUCT_CATALOG_CONFIG } from "@/constants/products";
import { fetchProductById, fetchProducts, formatRupiah } from "@/lib/supabase";
import { formatWhatsAppNumber } from "@/lib/utils";
import { useLanguage, translateProductDetails, formatOrderWhatsAppMessage } from "@/lib/i18n";
import { ProductCard } from "./ProductCard";
import { ProductDetailBreadcrumb } from "./ProductDetailBreadcrumb";
import { ProductDetailGallery } from "./ProductDetailGallery";
import { ProductProducerCard } from "./ProductProducerCard";
import { ProductDetailSpecs } from "./ProductDetailSpecs";
import { ProductOrderCard } from "./ProductOrderCard";
import { ProductHelpBanner } from "./ProductHelpBanner";

interface ProductDetailViewProps {
  productId: string;
  initialProduct?: ProductItem | null;
  initialRelatedProducts?: ProductItem[];
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  productId,
  initialProduct,
  initialRelatedProducts,
}) => {
  const { t, language } = useLanguage();
  const [product, setProduct] = useState<ProductItem | null>(initialProduct ?? null);
  const [relatedProducts, setRelatedProducts] = useState<ProductItem[]>(
    initialRelatedProducts ?? []
  );
  const [isLoading, setIsLoading] = useState<boolean>(!initialProduct);
  const [quantity, setQuantity] = useState<number>(1);

  // Load product detail & related items
  useEffect(() => {
    if (initialProduct && initialProduct.id === productId) {
      return;
    }
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      try {
        const [detailRes, listRes] = await Promise.all([
          fetchProductById(productId),
          fetchProducts(),
        ]);

        if (detailRes.data) {
          setProduct(detailRes.data);
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

  const incrementQty = () => setQuantity((q) => Math.min(q + 1, 99));
  const decrementQty = () => setQuantity((q) => Math.max(q - 1, 1));

  const localizedDetails = useMemo(() => {
    return translateProductDetails(product?.details, language);
  }, [product?.details, language]);

  // Loading Skeleton State
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
            {t.productDetail.notFoundTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            {t.productDetail.notFoundDesc}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/produk"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#008276] hover:bg-[#006e64] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.productDetail.backToCatalogBtn}</span>
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors inline-flex items-center justify-center"
            >
              {t.productDetail.breadcrumbHome}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const targetPhone = formatWhatsAppNumber(product.phone);
  const totalPrice = product.price * quantity;
  const totalPriceFormatted = formatRupiah(totalPrice);

  const orderMsg = formatOrderWhatsAppMessage({
    productName: product.name,
    quantity,
    totalPriceFormatted,
    language,
  });

  const whatsappOrderUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(orderMsg)}`;

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen">
      {/* 1. TOP BREADCRUMB & BACK NAVIGATION (Modular) */}
      <ProductDetailBreadcrumb product={product} />

      {/* 2. PRODUCT HERO & PURCHASE SUMMARY (2 COLUMNS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Product Visuals, Trust Badges, Producer Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <ProductDetailGallery
              product={product}
              shelfLifeText={localizedDetails?.shelfLife}
            />
            <ProductProducerCard product={product} />
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
                  {language === "en"
                    ? "(Recommended Coastal Specialty)"
                    : "(Rekomendasi Oleh-Oleh Khas Pesisir)"}
                </span>
              </div>

              {/* Price Banner */}
              <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 font-medium block">
                    {t.productDetail.officialPrice}
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#008276] font-sans mt-0.5">
                    {product.priceFormatted}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-xl bg-teal-50 text-[#008276] text-xs font-bold border border-teal-200/70">
                    {t.productDetail.directArtisan}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    {t.productDetail.noMarkup}
                  </span>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4">
                {product.description}
              </p>
            </div>

            {/* Quick Specs Highlight (Modular) */}
            <ProductDetailSpecs
              details={product.details}
              localizedDetails={localizedDetails}
            />

            {/* Purchase & Quantity Card (Modular) */}
            <ProductOrderCard
              quantity={quantity}
              incrementQty={incrementQty}
              decrementQty={decrementQty}
              totalPriceFormatted={totalPriceFormatted}
              whatsappOrderUrl={whatsappOrderUrl}
            />
          </div>
        </div>
      </section>

      {/* 3. RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="bg-slate-100/70 border-t border-slate-200 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#008276]">
                  {t.productDetail.relatedSubtitle}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0a2642] font-sans mt-0.5">
                  {t.productDetail.relatedTitle}
                </h2>
              </div>
              <Link
                href="/produk"
                className="text-xs sm:text-sm font-bold text-[#008276] hover:text-[#006e64] transition-colors self-start sm:self-auto"
              >
                {t.catalog.viewAllBtn} →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. HELP & ASSISTANCE BANNER (Modular) */}
      <ProductHelpBanner product={product} targetPhone={targetPhone} />
    </div>
  );
};
