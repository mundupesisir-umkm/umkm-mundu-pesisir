import type { Metadata } from "next";
import { AllProductsCatalogView } from "@/components/products";
import { fetchProducts } from "@/lib/supabase";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://umkmmundupesisir.com";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Katalog Produk - Siwang, Kerupuk Ikan & Seafood Khas Cirebon",
  description:
    "Katalog lengkap produk UMKM Desa Mundu Pesisir: Siwang (Terasi Bawang) Original & Pedas, Kerupuk Ikan Payur Mekar, Terasi Rebon Murni, dan aneka olahan laut segar. Harga terjangkau, tanpa pengawet, kirim seluruh Indonesia via WhatsApp.",
  keywords: [
    "katalog produk siwang cirebon",
    "beli terasi bawang online",
    "kerupuk ikan payur mekar",
    "terasi rebon cirebon",
    "jual produk umkm cirebon",
    "olahan ikan khas cirebon",
    "seafood kering cirebon",
    "produk pesisir halal",
  ],
  openGraph: {
    title: "Katalog Produk UMKM Mundu Pesisir - Siwang & Seafood Khas Cirebon",
    description:
      "Jelajahi seluruh produk olahan khas nelayan Desa Mundu Pesisir: Siwang renyah, Kerupuk Payur gurih, dan aneka olahan laut tanpa pengawet.",
    url: `${siteUrl}/produk`,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Katalog Produk UMKM Mundu Pesisir - Siwang & Olahan Laut Cirebon",
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
