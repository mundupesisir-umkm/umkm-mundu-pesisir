import type { Metadata } from "next";
import { AllProductsCatalogView } from "@/components/products";
import { fetchProducts } from "@/lib/supabase";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://umkmmundupesisir.com";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Olahan Ikan & Seafood Khas Mundu Pesisir Cirebon (Siti Maemunah)",
  description:
    "Katalog olahan hasil laut segar khas nelayan Desa Mundu Pesisir Cirebon dari UMKM Siti Maemunah: Bandeng Presto duri lunak (35k), Ikan Sarden bumbu segar (12k), dan Pindang Biles gurih (3k). Diolah higienis dari ikan laut segar langsung dari tangkapan nelayan. Pesan via WhatsApp.",
  keywords: [
    "bandeng presto siti maemunah",
    "bandeng presto cirebon",
    "ikan sarden cirebon",
    "pindang biles cirebon",
    "olahan ikan mundu pesisir",
    "produk nelayan cirebon",
    "seafood olahan cirebon",
    "oleh-oleh ikan cirebon",
  ],
  openGraph: {
    title: "Olahan Ikan Laut Siti Maemunah - Khas Mundu Pesisir Cirebon",
    description:
      "Bandeng Presto duri lunak, Ikan Sarden segar, dan Pindang Biles asli olahan nelayan Desa Mundu Pesisir Cirebon.",
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
