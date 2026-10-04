export interface FooterContactItem {
  icon: "MapPin" | "Phone" | "Mail" | "Clock";
  label: string;
  value: string;
  href?: string;
}

export const FOOTER_CONFIG = {
  brandTitle: "UMKM Mundu Pesisir",
  brandSubtitle: "Kabupaten Cirebon, Jawa Barat",
  description:
    "Sentra digitalisasi promosi produk olahan hasil laut dan Siwang (Terasi Bawang) khas perajin Desa Mundu Pesisir, Cirebon. Menghubungkan langsung pembeli dari seluruh Nusantara dengan pengrajin lokal via WhatsApp.",
  adminLink: {
    label: "Login Admin UMKM",
    href: "/admin/login",
  },
  contacts: [
    {
      icon: "MapPin",
      label: "Alamat",
      value: "Desa Mundu Pesisir, Kec. Mundu, Kab. Cirebon, Jawa Barat 45173",
      href: "https://maps.google.com/?q=-6.7575,108.593583",
    },
    {
      icon: "Phone",
      label: "WhatsApp / Telepon",
      value: "+62 822-1618-2885",
      href: "https://wa.me/6282216182885",
    },
    {
      icon: "Mail",
      label: "Email Resmi",
      value: "umkmmundupesisir@gmail.com",
      href: "mailto:umkmmundupesisir@gmail.com",
    },
    {
      icon: "Clock",
      label: "Jam Operasional",
      value: "Buka Setiap Hari: 07.30 - 17.00 WIB (Pesan WA 24 Jam)",
    },
  ] as FooterContactItem[],
};
