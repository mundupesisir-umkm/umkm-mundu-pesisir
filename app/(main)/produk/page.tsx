import type { Metadata } from "next";
import { AllProductsCatalogView } from "@/components/products";

export const metadata: Metadata = {
  title: "Katalog Produk UMKM Mundu Pesisir - Siwang & Olahan Seafood Khas Cirebon",
  description:
    "Katalog resmi produk olahan UMKM Desa Mundupesisir: Siwang (Terasi Bawang) gurih renyah, kerupuk payur mekar, terasi rebon murni, dan aneka hasil laut asli tangkapan nelayan Cirebon.",
};

export default function ProdukPage() {
  return <AllProductsCatalogView />;
}
