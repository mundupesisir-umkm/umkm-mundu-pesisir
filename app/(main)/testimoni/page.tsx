import type { Metadata } from "next";
import { AllTestimonialsView } from "@/components/testimonials";
import { fetchTestimonials } from "@/lib/supabase";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://umkm-mundupesisir.vercel.app";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Testimoni Pelanggan - Ulasan Nyata Pembeli Siwang & Seafood Mundu Pesisir",
  description:
    "Baca ratusan ulasan jujur dari pembeli Siwang (Terasi Bawang), Kerupuk Ikan Payur, dan aneka olahan laut khas Desa Mundu Pesisir Cirebon. Ribuan pelanggan puas dari Sabang sampai Merauke. Pesan sekarang via WhatsApp!",
  keywords: [
    "ulasan siwang cirebon",
    "testimoni produk umkm mundu pesisir",
    "review terasi bawang cirebon",
    "pelanggan puas siwang",
    "rating produk olahan laut",
    "kepuasan pembeli siwang",
  ],
  openGraph: {
    title:
      "Testimoni Pelanggan UMKM Mundu Pesisir - Ulasan Nyata Pembeli Siwang",
    description:
      "Ratusan ulasan jujur pembeli Siwang Cirebon dan olahan laut Mundu Pesisir. Ribuan pelanggan puas dari seluruh Indonesia.",
    url: `${siteUrl}/testimoni`,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Testimoni Pelanggan UMKM Mundu Pesisir",
      },
    ],
  },
  alternates: {
    canonical: `${siteUrl}/testimoni`,
  },
};

export default async function TestimoniPage() {
  const testimonialsRes = await fetchTestimonials().catch(() => ({ data: [] }));
  const testimonials = testimonialsRes.data || [];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Testimoni Pelanggan",
        item: `${siteUrl}/testimoni`,
      },
    ],
  };

  const reviewsJsonLd =
    testimonials.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          "@id": `${siteUrl}/#main-product`,
          name: "Siwang (Terasi Bawang) Khas Mundu Pesisir",
          brand: { "@type": "Brand", name: "UMKM Mundu Pesisir" },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue:
              testimonials.reduce((acc, t) => acc + (t.rating ?? 5), 0) /
              testimonials.length,
            reviewCount: testimonials.length,
            bestRating: 5,
            worstRating: 1,
          },
          review: testimonials.slice(0, 5).map((t) => ({
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: t.rating ?? 5,
              bestRating: 5,
            },
            author: { "@type": "Person", name: t.name },
            reviewBody: t.review,
            datePublished: t.date ?? new Date().toISOString().split("T")[0],
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {reviewsJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
        />
      )}
      <AllTestimonialsView initialTestimonials={testimonials} />
    </>
  );
}
