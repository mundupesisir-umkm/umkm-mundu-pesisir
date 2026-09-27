import { NavItem, LanguageOption } from "@/components/navbar/types";

export const SITE_CONFIG = {
  name: "UMKM MUNDUPESISIR",
  tagline: "DESA MUNDUPESISIR",
  description: "Portal Resmi UMKM Desa Mundupesisir, Kabupaten Cirebon",
  logoSrc: "/Mundupesisir.png",
  defaultLanguage: "id",
};

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Produk UMKM", href: "/produk" },
  { label: "Testimoni", href: "/testimoni" },
  { label: "Profil Desa", href: "/profil" },
  { label: "Kontak & Lokasi", href: "/kontak" },
];

export const DEFAULT_LANGUAGES: LanguageOption[] = [
  { code: "id", label: "Bahasa (ID)", flag: "🇮🇩" },
  { code: "en", label: "English (US)", flag: "🇺🇸" },
];
