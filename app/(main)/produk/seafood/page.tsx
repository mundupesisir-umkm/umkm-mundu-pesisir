import type { Metadata } from "next";
import { AllProductsCatalogView } from "@/components/products";
import { fetchProducts } from "@/lib/supabase";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://umkm-mundupesisir.vercel.app";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Seafood & Olahan Laut Khas Mundu Pesisir Cirebon",
  description:
    "Katalog produk seafood dan olahan laut khas Desa Mundu Pesisir Cirebon: Kerupuk Ikan Payur Mekar gurih, Terasi Udang Rebon murni, ikan kering, dan aneka hasil tangkapan nelayan lokal. Higienis, tanpa pengawet kimia. Pesan via WhatsApp.",
  keywords: [
    "kerupuk ikan payur cirebon",
    "terasi rebon murni cirebon",
    "seafood kering cirebon",
    "olahan laut mundu pesisir",
    "ikan kering cirebon",
    "produk nelayan cirebon",
    "kerupuk mekar cirebon",
    "beli seafood online cirebon",
  ],
  openGraph: {
    title: "Seafood & Olahan Laut Mundu Pesisir - Kerupuk Ikan & Terasi Rebon",
    description:
      "Kerupuk Ikan Payur Mekar, Terasi Rebon Murni, dan aneka seafood kering dari nelayan Desa Mundu Pesisir Cirebon. Higienis, tanpa pengawet.",
    url: `${siteUrl}/produk/seafood`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: `${siteUrl}/produk/seafood` },
};

export default async function SeafoodCategoryPage() {
  const productsRes = await fetchProducts().catch(() => ({ data: [] }));
  const products = (productsRes.data || []).filter(
    (p) => p.categoryKey === "seafood"
  );

  const categoryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Katalog Seafood & Olahan Laut Mundu Pesisir Cirebon",
    description:
      "Kerupuk Ikan Payur Mekar, Terasi Rebon Murni, dan aneka olahan laut khas nelayan Desa Mundu Pesisir Cirebon.",
    url: `${siteUrl}/produk/seafood`,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.description,
        url: `${siteUrl}/produk/${p.id}`,
        offers: {
          "@type": "Offer",
          priceCurrency: "IDR",
          price: p.price,
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Katalog Produk", item: `${siteUrl}/produk` },
      { "@type": "ListItem", position: 3, name: "Seafood & Olahan Laut", item: `${siteUrl}/produk/seafood` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AllProductsCatalogView
        initialProducts={products}
        defaultCategory="seafood"
      />
    </>
  );
}
