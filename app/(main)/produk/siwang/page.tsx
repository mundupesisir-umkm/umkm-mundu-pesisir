import type { Metadata } from "next";
import { AllProductsCatalogView } from "@/components/products";
import { fetchProducts } from "@/lib/supabase";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://umkm-mundupesisir.vercel.app";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Siwang (Terasi Bawang) Asli Khas Mundu Pesisir Cirebon",
  description:
    "Katalog lengkap Siwang (Terasi Bawang) renyah khas Desa Mundu Pesisir Cirebon. Tersedia varian Original Gurih, Pedas Nagih, Super Pedas, dan Bawang Spesial. Dibuat dari terasi udang rebon asli tanpa pengawet. Pesan via WhatsApp, kirim ke seluruh Indonesia.",
  keywords: [
    "siwang cirebon",
    "terasi bawang cirebon",
    "siwang original mundu pesisir",
    "siwang pedas cirebon",
    "beli siwang online",
    "terasi rebon asli",
    "bawang goreng terasi cirebon",
    "sambal siwang cirebon",
    "oleh-oleh cirebon siwang",
  ],
  openGraph: {
    title: "Siwang Khas Mundu Pesisir - Terasi Bawang Renyah Asli Cirebon",
    description:
      "Siwang (Terasi Bawang) renyah asli dari Desa Mundu Pesisir Cirebon. Varian Original, Pedas, dan Spesial. Tanpa pengawet, kirim seluruh Indonesia.",
    url: `${siteUrl}/produk/siwang`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: `${siteUrl}/produk/siwang` },
};

export default async function SiwangCategoryPage() {
  const productsRes = await fetchProducts().catch(() => ({ data: [] }));
  const products = (productsRes.data || []).filter(
    (p) => p.categoryKey === "siwang"
  );

  const categoryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Katalog Siwang (Terasi Bawang) Khas Mundu Pesisir Cirebon",
    description:
      "Semua varian Siwang (Terasi Bawang) asli Desa Mundu Pesisir: Original Gurih, Pedas Nagih, dan Spesial.",
    url: `${siteUrl}/produk/siwang`,
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
      { "@type": "ListItem", position: 3, name: "Siwang (Terasi Bawang)", item: `${siteUrl}/produk/siwang` },
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
        defaultCategory="siwang"
      />
    </>
  );
}
