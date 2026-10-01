import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://umkm-mundupesisir.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "UMKM Mundu Pesisir - Siwang & Olahan Seafood Khas Cirebon",
    template: "%s | UMKM Mundu Pesisir",
  },
  description:
    "Portal Resmi UMKM Desa Mundu Pesisir, Kabupaten Cirebon. Produsen Siwang (Terasi Bawang) renyah asli, kerupuk ikan payur gurih, terasi rebon murni, dan aneka olahan laut segar tanpa pengawet kimia. Pesan via WhatsApp, kirim ke seluruh Indonesia.",
  keywords: [
    "siwang cirebon",
    "terasi bawang mundu pesisir",
    "olahan seafood cirebon",
    "kerupuk ikan payur",
    "terasi rebon murni",
    "produk umkm cirebon",
    "oleh-oleh khas cirebon",
    "bawang goreng terasi",
    "siwang original",
    "jual siwang online",
    "produk pesisir cirebon",
    "umkm desa mundu pesisir",
    "sentra kuliner pesisir",
  ],
  authors: [{ name: "UMKM Desa Mundu Pesisir", url: siteUrl }],
  creator: "UMKM Desa Mundu Pesisir",
  publisher: "Desa Mundu Pesisir, Kecamatan Mundu, Kabupaten Cirebon",
  category: "Makanan & Minuman / UMKM / Kuliner Lokal",
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: siteUrl,
    siteName: "UMKM Mundu Pesisir",
    title: "UMKM Mundu Pesisir - Siwang & Olahan Seafood Khas Cirebon",
    description:
      "Produsen Siwang (Terasi Bawang) renyah asli, kerupuk ikan payur, dan olahan laut segar khas Desa Mundu Pesisir Cirebon. Tanpa pengawet, langsung dari tangan pengrajin.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Produk Siwang Khas Mundu Pesisir - UMKM Desa Mundu Pesisir Cirebon",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@umkmmundupesisir",
    creator: "@umkmmundupesisir",
    title: "UMKM Mundu Pesisir - Siwang & Olahan Seafood Khas Cirebon",
    description:
      "Produsen Siwang renyah asli, kerupuk ikan payur, dan aneka olahan laut segar khas pesisir Cirebon. Langsung dari tangan pengrajin.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "id-ID": siteUrl,
      "en-US": `${siteUrl}/en`,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

import { LanguageProvider } from "@/lib/i18n";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${poppins.variable} h-full antialiased font-sans`}
    >
      <head>
        {/* Preconnect to critical external origins for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://bxtwyqmldikttqotcwjg.supabase.co" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://maps.gstatic.com" />
        {/* App icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* hreflang for bilingual support */}
        <link rel="alternate" hrefLang="id" href={siteUrl} />
        <link rel="alternate" hrefLang="en" href={siteUrl} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        {/* Theme & geo */}
        <meta name="theme-color" content="#008276" />
        <meta name="geo.region" content="ID-JB" />
        <meta name="geo.placename" content="Desa Mundu Pesisir, Kabupaten Cirebon, Jawa Barat" />
        <meta name="geo.position" content="-6.8165;108.5600" />
        <meta name="ICBM" content="-6.8165, 108.5600" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans selection:bg-[#0a2642] selection:text-[#dfc19c]">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
