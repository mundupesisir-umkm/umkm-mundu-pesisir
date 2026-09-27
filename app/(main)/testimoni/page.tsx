import type { Metadata } from "next";
import { AllTestimonialsView } from "@/components/testimonials";

export const metadata: Metadata = {
  title: "Testimoni Pelanggan - UMKM Desa Mundu Pesisir Cirebon",
  description:
    "Ulasan dan pengalaman asli para pembeli Siwang (Terasi Bawang), kerupuk ikan payur, dan aneka seafood kering khas Desa Mundu Pesisir Cirebon.",
};

export default function TestimoniPage() {
  return <AllTestimonialsView />;
}
