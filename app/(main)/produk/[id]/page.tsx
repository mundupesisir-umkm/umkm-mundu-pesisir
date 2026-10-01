import type { Metadata } from "next";
import { ProductDetailView } from "@/components/products";
import { fetchProductById, fetchProducts } from "@/lib/supabase";
import { PRODUCT_CATALOG_CONFIG } from "@/constants/products";

interface Props {
  params: Promise<{ id: string }>;
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://umkm-mundupesisir.vercel.app";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const res = await fetchProducts();
    const dbProducts = res.data || [];
    const allIds = new Set<string>([
      ...dbProducts.map((p) => p.id),
      ...PRODUCT_CATALOG_CONFIG.products.map((p) => p.id),
    ]);
    return Array.from(allIds).map((id) => ({ id: encodeURIComponent(id) }));
  } catch {
    return PRODUCT_CATALOG_CONFIG.products.map((p) => ({
      id: encodeURIComponent(p.id),
    }));
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const { data: product } = await fetchProductById(decodedId).catch(() => ({
    data: null,
  }));

  const p =
    product || PRODUCT_CATALOG_CONFIG.products.find((x) => x.id === decodedId);

  if (!p) {
    return {
      title: "Detail Produk - UMKM Mundu Pesisir",
      description:
        "Informasi detail produk olahan khas Desa Mundupesisir Cirebon.",
    };
  }

  const title = `${p.name} - UMKM Mundu Pesisir Cirebon`;
  const description = `${p.description}. Harga: ${p.priceFormatted}. Produk olahan asli pesisir Cirebon, higienis tanpa pengawet kimia. Pesan via WhatsApp, kirim ke seluruh Indonesia.`;
  const imageUrl = p.image?.startsWith("http") ? p.image : `${siteUrl}${p.image}`;
  const productUrl = `${siteUrl}/produk/${p.id}`;

  return {
    title,
    description,
    keywords: [
      p.name.toLowerCase(),
      "siwang cirebon",
      "terasi bawang cirebon",
      "produk umkm mundu pesisir",
      p.categoryLabel.toLowerCase(),
      "beli online",
      "pesan whatsapp",
    ],
    openGraph: {
      title,
      description,
      url: productUrl,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: `${p.name} - Produk UMKM Mundu Pesisir Cirebon`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: productUrl,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  const [detailRes, listRes] = await Promise.all([
    fetchProductById(decodedId).catch(() => ({ data: null })),
    fetchProducts().catch(() => ({ data: [] })),
  ]);

  const product =
    detailRes.data ||
    PRODUCT_CATALOG_CONFIG.products.find((p) => p.id === decodedId) ||
    null;

  const relatedProducts = (listRes.data || [])
    .filter((p) => p.id !== decodedId)
    .slice(0, 3);

  const imageUrl = product?.image?.startsWith("http")
    ? product.image
    : `${siteUrl}${product?.image || "/siwang-pouch.jpg"}`;

  const productJsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": `${siteUrl}/produk/${product.id}`,
        name: product.name,
        description: product.description,
        image: imageUrl,
        url: `${siteUrl}/produk/${product.id}`,
        sku: product.id,
        brand: {
          "@type": "Brand",
          name: "UMKM Mundu Pesisir",
        },
        manufacturer: {
          "@type": "Organization",
          name: "UMKM Desa Mundu Pesisir",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Mundu",
            addressRegion: "Kabupaten Cirebon",
            addressCountry: "ID",
          },
        },
        category: product.categoryLabel,
        offers: {
          "@type": "Offer",
          priceCurrency: "IDR",
          price: product.price,
          priceValidUntil: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          )
            .toISOString()
            .split("T")[0],
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/produk/${product.id}`,
          seller: {
            "@type": "Organization",
            name: "UMKM Desa Mundu Pesisir",
            telephone: "+62-812-1414-5254",
          },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
              "@type": "MonetaryAmount",
              value: 0,
              currency: "IDR",
            },
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "ID",
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              businessDays: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
              },
              cutoffTime: "14:00",
            },
          },
        },
        ...(product.details && {
          additionalProperty: [
            product.details.composition && {
              "@type": "PropertyValue",
              name: "Komposisi",
              value: product.details.composition,
            },
            product.details.shelfLife && {
              "@type": "PropertyValue",
              name: "Masa Simpan",
              value: product.details.shelfLife,
            },
            product.details.packaging && {
              "@type": "PropertyValue",
              name: "Kemasan",
              value: product.details.packaging,
            },
          ].filter(Boolean),
        }),
      }
    : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Katalog Produk",
        item: `${siteUrl}/produk`,
      },
      ...(product
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: product.name,
              item: `${siteUrl}/produk/${product.id}`,
            },
          ]
        : []),
    ],
  };

  return (
    <>
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetailView
        productId={decodedId}
        initialProduct={product}
        initialRelatedProducts={relatedProducts}
      />
    </>
  );
}
