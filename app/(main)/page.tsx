import { HeroSection } from "@/components/hero";
import { ProductCatalogSection } from "@/components/products";
import { ProductHighlightsSection } from "@/components/features";
import { TestimonialSection } from "@/components/testimonials";
import { CtaSection } from "@/components/cta";

export default function Home() {
  return (
    <main className="flex-1 w-full bg-white flex flex-col justify-center">
      {/* 1. Hero Section (Cita Rasa Pesisir Cirebon) */}
      <HeroSection />

      {/* 2. Katalog Produk Unggulan (Siwang, Seafood, & Filter Pills) */}
      <ProductCatalogSection id="produk" />

      {/* 3. Nilai Kualitas & Kenapa Memilih Kami on Warm Coastal Beach Sand */}
      <ProductHighlightsSection />

      {/* 4. Customer Testimonials Section */}
      <TestimonialSection />

      {/* 5. Call to Action Banner Section */}
      <CtaSection />
    </main>
  );
}
