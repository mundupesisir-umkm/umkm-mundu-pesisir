import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://umkmmundupesisir.com";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kontak & Lokasi - Gerai UMKM Mundu Pesisir Cirebon",
  description:
    "Hubungi UMKM Desa Mundu Pesisir via WhatsApp +62 812-1414-5254, email umkmmundupesisir@gmail.com, atau kunjungi gerai kami di Desa Mundu Pesisir, Kecamatan Mundu, Kabupaten Cirebon. Buka setiap hari 07:30–17:00 WIB.",
  keywords: [
    "kontak umkm mundu pesisir",
    "alamat gerai siwang cirebon",
    "whatsapp umkm cirebon",
    "lokasi sentra oleh-oleh cirebon",
    "telepon umkm mundu pesisir",
    "cara ke mundu pesisir cirebon",
    "beli siwang langsung cirebon",
  ],
  openGraph: {
    title: "Kontak & Lokasi - Gerai UMKM Mundu Pesisir Cirebon",
    description:
      "Hubungi kami via WhatsApp atau kunjungi gerai UMKM di Desa Mundu Pesisir, Kecamatan Mundu, Kabupaten Cirebon. Buka setiap hari 07:30–17:00 WIB.",
    url: `${siteUrl}/kontak`,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kontak dan Lokasi UMKM Mundu Pesisir Cirebon",
      },
    ],
  },
  alternates: {
    canonical: `${siteUrl}/kontak`,
  },
};

export default function KontakPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Kontak & Lokasi", item: `${siteUrl}/kontak` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Apakah bisa kirim ke luar kota dan luar pulau?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bisa! Kami bekerja sama dengan ekspedisi terpercaya (JNE, J&T, SiCepat, Paxel). Setiap toples Siwang dan olahan seafood dikemas dengan kardus tebal dan lapisan bubble wrap gratis sehingga dijamin tidak remuk dan kedap udara.",
        },
      },
      {
        "@type": "Question",
        name: "Berapa lama daya tahan Siwang tanpa bahan pengawet?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Siwang (Terasi Bawang) kami mampu bertahan renyah hingga 3 - 4 bulan pada suhu ruang dalam toples tertutup rapat, karena proses penirisan minyak menggunakan spinner higienis tanpa tambahan bahan pengawet kimia.",
        },
      },
      {
        "@type": "Question",
        name: "Apakah tersedia harga khusus untuk reseller atau grosir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ya, kami menyediakan paket reseller dan grosir dengan potongan harga khusus untuk minimal order mulai dari 12 toples. Hubungi WhatsApp admin kami untuk mendapatkan katalog harga reseller.",
        },
      },
      {
        "@type": "Question",
        name: "Apakah bisa datang langsung untuk membeli atau melihat produksi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tentu sangat bisa! Gerai UMKM Desa Mundu Pesisir buka setiap hari pukul 07.30 - 17.00 WIB. Anda bisa langsung mencoba tester rasa sebelum membeli.",
        },
      },
      {
        "@type": "Question",
        name: "Di mana lokasi gerai UMKM Mundu Pesisir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Gerai UMKM kami berlokasi di Desa Mundu Pesisir, Kecamatan Mundu, Kabupaten Cirebon, Jawa Barat. Dapat dicapai dari Stasiun Cirebon dalam 15 menit, atau dari Gerbang Tol Kanci/Ciperna dalam 12 menit.",
        },
      },
    ],
  };

  const contactPointJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#organization`,
    name: "UMKM Desa Mundu Pesisir",
    url: siteUrl,
    telephone: "+62-812-1414-5254",
    email: "umkmmundupesisir@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Desa Mundu Pesisir",
      addressLocality: "Kecamatan Mundu",
      addressRegion: "Kabupaten Cirebon",
      postalCode: "45173",
      addressCountry: "ID",
    },
    geo: { "@type": "GeoCoordinates", latitude: -6.7575, longitude: 108.593583 },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "07:30",
        closes: "17:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+62-812-1414-5254",
        contactType: "customer service",
        areaServed: "ID",
        availableLanguage: ["Indonesian"],
      },
      {
        "@type": "ContactPoint",
        email: "umkmmundupesisir@gmail.com",
        contactType: "sales",
        areaServed: "ID",
        availableLanguage: ["Indonesian"],
      },
    ],
    hasMap: "https://maps.google.com/?q=-6.7575,108.593583",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPointJsonLd) }}
      />
      <ContactPageContent />
    </>
  );
}
