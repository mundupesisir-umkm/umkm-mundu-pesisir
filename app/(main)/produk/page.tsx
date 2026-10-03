import type { Metadata } from "next";
import { AllProductsCatalogView } from "@/components/products";
import { fetchProducts } from "@/lib/supabase";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://umkmmundupesisir.com";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Katalog Produk UMKM - Siwang, Beras Lokal, & Olahan Laut Mundu Pesisir Cirebon",
  description:
    "Katalog lengkap produk unggulan UMKM Desa Mundu Pesisir Cirebon: Siwang & Sambal Cumi Ibu Magfiro, Beras Berkualitas panen lokal Ibu Santi (IR 64, Pandan Wangi, Rojolele), serta Bandeng Presto, Sarden & Pindang Biles Siti Maemunah. Pesan langsung ke pengrajin via WhatsApp.",
  keywords: [
    "katalog produk umkm mundu pesisir",
    "siwang sambal cumi ibu magfiro",
    "beras lokal ibu santi cirebon",
    "bandeng presto siti maemunah",
    "ikan sarden pindang biles cirebon",
    "beli terasi bawang cirebon online",
    "beras murah cirebon",
    "produk umkm cirebon",
    "pesan wa pengrajin mundu",
  ],
  openGraph: {
    title: "Katalog Produk UMKM Mundu Pesisir - Siwang, Beras & Olahan Laut Asli Cirebon",
    description:
      "Jelajahi aneka produk unggulan UMKM asli Desa Mundu Pesisir Cirebon: Siwang & Sambal Cumi, Beras Panen Lokal, dan Olahan Ikan Laut segar. Pesan langsung via WhatsApp.",
    url: `${siteUrl}/produk`,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Katalog Produk UMKM Mundu Pesisir Cirebon",
      },
    ],
  },
  alternates: {
    canonical: `${siteUrl}/produk`,
  },
};

export default async function ProdukPage() {
  const productsRes = await fetchProducts().catch(() => ({ data: [] }));
  const products = productsRes.data || [];

  const productListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Katalog Produk UMKM Desa Mundu Pesisir",
    description:
      "Seluruh produk olahan khas Desa Mundu Pesisir Cirebon: Siwang, Kerupuk Ikan, Terasi Rebon, dan Seafood Kering.",
    url: `${siteUrl}/produk`,
    numberOfItems: products.length,
    itemListElement: products.slice(0, 10).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        "@id": `${siteUrl}/produk/${product.id}`,
        name: product.name,
        description: product.description,
        image: product.image?.startsWith("http")
          ? product.image
          : `${siteUrl}${product.image}`,
        url: `${siteUrl}/produk/${product.id}`,
        offers: {
          "@type": "Offer",
          priceCurrency: "IDR",
          price: product.price,
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "UMKM Desa Mundu Pesisir",
          },
        },
        brand: {
          "@type": "Brand",
          name: "UMKM Mundu Pesisir",
        },
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Katalog Produk",
        item: `${siteUrl}/produk`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AllProductsCatalogView initialProducts={products} />
    </>
  );
}
