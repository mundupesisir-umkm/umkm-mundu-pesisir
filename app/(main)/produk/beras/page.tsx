import type { Metadata } from "next";
import { AllProductsCatalogView } from "@/components/products";
import { fetchProducts } from "@/lib/supabase";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://umkmmundupesisir.com";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Beras Berkualitas Panen Lokal Khas Mundu Pesisir Cirebon",
  description:
    "Katalog Beras Berkualitas panen lokal Desa Mundu Pesisir Cirebon dari UMKM Ibu Santi. Tersedia pilihan Beras Super IR 64, Pandan Wangi, dan Rojolele Premium. Kemasan perkilo mulai Rp 14.500 dan kemasan karung 25kg mulai Rp 355.000. Pesan langsung via WhatsApp.",
  keywords: [
    "beras cirebon",
    "beras panen lokal mundu pesisir",
    "beras super ir 64 cirebon",
    "beras pandan wangi cirebon",
    "beras rojolele cirebon",
    "beras perkarung cirebon",
    "beras perkilo cirebon",
    "beras ibu santi mundu pesisir",
    "beli beras murah cirebon",
  ],
  openGraph: {
    title: "Beras Berkualitas Panen Lokal - UMKM Ibu Santi Mundu Pesisir Cirebon",
    description:
      "Beras panen lokal asli: Beras Super IR 64, Pandan Wangi, dan Rojolele Premium. Tersedia kemasan perkilo & karung 25kg.",
    url: `${siteUrl}/produk/beras`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: `${siteUrl}/produk/beras` },
};

export default async function BerasCategoryPage() {
  const productsRes = await fetchProducts().catch(() => ({ data: [] }));
  const products = (productsRes.data || []).filter(
    (p) => p.categoryKey === "beras"
  );

  const categoryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Katalog Beras Berkualitas Panen Lokal Desa Mundu Pesisir",
    description:
      "Pilihan Beras Super IR 64, Pandan Wangi, dan Rojolele Premium hasil panen lokal Desa Mundu Pesisir Cirebon.",
    url: `${siteUrl}/produk/beras`,
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
      { "@type": "ListItem", position: 3, name: "Beras & Hasil Tani", item: `${siteUrl}/produk/beras` },
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
        defaultCategory="beras"
      />
    </>
  );
}
