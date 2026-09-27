import type { Metadata } from "next";
import { VillageProfileContent } from "@/components/profile";

export const metadata: Metadata = {
  title: "Profil Desa Mundu Pesisir - Sentra Kuliner Pesisir Cirebon",
  description:
    "Mengenal Desa Mundu Pesisir, Kecamatan Mundu, Kabupaten Cirebon. Desa nelayan bersejarah dengan tradisi Nadran, sentra Siwang renyah, dan kelestarian ekosistem mangrove Laut Jawa.",
};

export default function ProfilPage() {
  return <VillageProfileContent />;
}
