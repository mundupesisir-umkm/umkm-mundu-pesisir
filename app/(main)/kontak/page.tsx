import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact";

export const metadata: Metadata = {
  title: "Kontak & Lokasi - UMKM Desa Mundu Pesisir Cirebon",
  description:
    "Informasi kontak resmi WhatsApp, alamat gerai sentra oleh-oleh, peta lokasi, rute petunjuk arah, dan formulir pemesanan produk UMKM Desa Mundu Pesisir Cirebon.",
};

export default function KontakPage() {
  return <ContactPageContent />;
}
