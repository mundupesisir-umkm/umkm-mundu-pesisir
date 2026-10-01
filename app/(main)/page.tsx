import type { Metadata } from "next";
import { ProductCatalogSection } from "@/components/products";
import { ProductHighlightsSection } from "@/components/features";
import { TestimonialSection } from "@/components/testimonials";
import { CtaSection } from "@/components/cta";
import { HeroSection } from "@/components/hero";
import { fetchProducts, fetchTestimonials } from "@/lib/supabase";

// Vercel Edge ISR: Incremental Static Regeneration every 60 seconds
export const revalidate = 60;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://umkmmundupesisir.com";

export const metadata: Metadata = {
  title: "Beranda - Siwang & Seafood Khas Cirebon Langsung dari Pengrajin",
  description:
    "Selamat datang di Portal UMKM Desa Mundu Pesisir Cirebon! Temukan Siwang (Terasi Bawang) renyah asli, kerupuk ikan payur gurih, terasi rebon murni, dan olahan laut segar tanpa pengawet. Pesan via WhatsApp, gratis ongkir area Cirebon.",
  keywords: [
    "siwang cirebon beranda",
    "oleh-oleh khas cirebon",
    "siwang terasi bawang",
    "produk nelayan mundu pesisir",
    "beli siwang online cirebon",
  ],
  openGraph: {
    title: "UMKM Mundu Pesisir - Siwang & Seafood Khas Pesisir Cirebon",
    description:
      "Siwang (Terasi Bawang) renyah asli, kerupuk ikan payur, dan olahan laut segar dari tangan pengrajin Desa Mundu Pesisir Cirebon. Kirim ke seluruh Indonesia.",
    url: siteUrl,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Produk UMKM Siwang Khas Mundu Pesisir Cirebon",
      },
    ],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default async function Home() {
  const [productsRes, testimonialsRes] = await Promise.all([
    fetchProducts().catch(() => ({ data: [] })),
    fetchTestimonials().catch(() => ({ data: [] })),
  ]);

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "FoodEstablishment", "Store"],
    "@id": `${siteUrl}/#organization`,
    name: "UMKM Desa Mundu Pesisir",
    alternateName: ["UMKM Mundupesisir", "Sentra UMKM Mundu Pesisir"],
    description:
      "Sentra UMKM Desa Mundu Pesisir, produsen Siwang (Terasi Bawang) renyah asli, kerupuk ikan payur, terasi rebon murni, dan aneka olahan laut segar khas Kabupaten Cirebon, Jawa Barat.",
    url: siteUrl,
    logo: `${siteUrl}/Mundupesisir.png`,
    image: `${siteUrl}/og-image.jpg`,
    telephone: "+62-812-1414-5254",
    email: "umkm.mundupesisir@gmail.com",
    priceRange: "Rp 15.000 - Rp 75.000",
    currenciesAccepted: "IDR",
    paymentAccepted: "Cash, Transfer Bank, OVO, GoPay, QRIS",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Desa Mundu Pesisir",
      addressLocality: "Kecamatan Mundu",
      addressRegion: "Kabupaten Cirebon",
      postalCode: "45173",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.8165,
      longitude: 108.56,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "07:30",
        closes: "17:00",
      },
    ],
    sameAs: [
      "https://wa.me/6281214145254",
      "https://www.instagram.com/umkm.mundupesisir",
    ],
    hasMap: "https://maps.google.com/?q=-6.8165,108.5600",
    servesCuisine: ["Kuliner Pesisir", "Makanan Tradisional Cirebon"],
    menu: `${siteUrl}/produk`,
    foundingDate: "2020",
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "UMKM Mundu Pesisir",
    description:
      "Portal Resmi UMKM Desa Mundu Pesisir, Kabupaten Cirebon",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/produk?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <main className="flex-1 w-full bg-white flex flex-col justify-center">
        <HeroSection />
        <ProductCatalogSection id="produk" initialProducts={productsRes.data || []} />
        <ProductHighlightsSection />
        <TestimonialSection items={testimonialsRes.data || []} />
        <CtaSection />
      </main>
    </>
  );
}
