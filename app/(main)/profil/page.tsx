import type { Metadata } from "next";
import { VillageProfileContent } from "@/components/profile";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://umkmmundupesisir.com";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Profil Desa Mundu Pesisir - Desa Nelayan Bersejarah di Pesisir Cirebon",
  description:
    "Mengenal Desa Mundu Pesisir, Kecamatan Mundu, Kabupaten Cirebon. Desa nelayan bersejarah dengan tradisi Nadran, sentra Siwang (Terasi Bawang) renyah, ekosistem mangrove Laut Jawa, dan UMKM binaan pemerintah desa.",
  keywords: [
    "profil desa mundu pesisir",
    "desa nelayan cirebon",
    "tradisi nadran cirebon",
    "sejarah desa mundu",
    "wisata kuliner cirebon",
    "sentra umkm cirebon",
    "mangrove mundu cirebon",
    "kecamatan mundu kabupaten cirebon",
  ],
  openGraph: {
    title: "Profil Desa Mundu Pesisir - Desa Nelayan & Sentra UMKM Cirebon",
    description:
      "Desa Mundu Pesisir, sentra Siwang renyah dan tradisi Nadran di pesisir Cirebon. Kenali sejarah, potensi, dan kehidupan nelayan lokal.",
    url: `${siteUrl}/profil`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: `${siteUrl}/profil` },
};

export default function ProfilPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Profil Desa", item: `${siteUrl}/profil` },
    ],
  };

  const aboutPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${siteUrl}/profil/#about`,
    name: "Profil Desa Mundu Pesisir",
    url: `${siteUrl}/profil`,
    description:
      "Mengenal Desa Mundu Pesisir: desa nelayan bersejarah, sentra Siwang (Terasi Bawang) asli, dan tradisi Nadran khas pesisir Cirebon.",
    about: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "UMKM Desa Mundu Pesisir",
      foundingDate: "2020",
      foundingLocation: {
        "@type": "Place",
        name: "Desa Mundu Pesisir",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kecamatan Mundu",
          addressRegion: "Kabupaten Cirebon",
          addressCountry: "ID",
        },
      },
      member: {
        "@type": "OrganizationRole",
        member: {
          "@type": "Person",
          name: "Pengelola UMKM Desa Mundu Pesisir",
        },
        roleName: "Ketua Pengelola",
      },
    },
    mainEntity: {
      "@type": "Place",
      name: "Desa Mundu Pesisir",
      description:
        "Desa nelayan bersejarah di Kecamatan Mundu, Kabupaten Cirebon. Terkenal sebagai sentra Siwang (Terasi Bawang) dan memiliki tradisi Nadran warisan leluhur.",
      geo: {
        "@type": "GeoCoordinates",
        latitude: -6.7575,
        longitude: 108.593583,
      },
    },
  };

  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Place", "AdministrativeArea"],
    name: "Desa Mundu Pesisir",
    description:
      "Desa nelayan bersejarah di Kecamatan Mundu, Kabupaten Cirebon, Jawa Barat. Sentra Siwang (Terasi Bawang) renyah khas dan tradisi Nadran warisan leluhur nelayan Cirebon.",
    url: `${siteUrl}/profil`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.7575,
      longitude: 108.593583,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Desa Mundu Pesisir, Kecamatan Mundu",
      addressRegion: "Kabupaten Cirebon",
      addressCountry: "ID",
      postalCode: "45173",
    },
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "Kabupaten Cirebon",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }}
      />
      <VillageProfileContent />
    </>
  );
}
