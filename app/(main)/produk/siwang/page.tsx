import type { Metadata } from "next";
import { AllProductsCatalogView } from "@/components/products";
import { fetchProducts } from "@/lib/supabase";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://umkmmundupesisir.com";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Siwang & Sambal Cumi Khas Mundu Pesisir Cirebon (Ibu Magfiro)",
  description:
    "Katalog resmi Siwang & Sambal Cumi khas Desa Mundu Pesisir Cirebon dari UMKM Ibu Magfiro. Tersedia Siwang Toples Kecil (15k), Sedang (28k), Besar (55k), dan Sambal Cumi Kecil (25k), Sedang (50k). Dibuat dari terasi rebon murni asli pesisir Cirebon tanpa pengawet. Pesan langsung via WhatsApp.",
  keywords: [
    "siwang ibu magfiro",
    "sambal cumi cirebon",
    "sambal cumi mundu pesisir",
    "siwang cirebon",
    "terasi bawang cirebon",
    "siwang toples cirebon",
    "beli siwang online",
    "terasi rebon asli cirebon",
    "oleh-oleh khas cirebon",
  ],
  openGraph: {
    title: "Siwang & Sambal Cumi Ibu Magfiro - Khas Mundu Pesisir Cirebon",
    description:
      "Siwang renyah gurih dan Sambal Cumi pedas mantap asli buatan Ibu Magfiro dari Desa Mundu Pesisir Cirebon. Tersedia 5 varian ukuran toples.",
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
