export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  hasWatermark?: boolean;
  productTag?: string;
  date?: string;
}

export const TESTIMONIALS_CONFIG = {
  badge: "KEPUASAN PELANGGAN",
  headline: "Apa Kata Pembeli Kami?",
  linkText: "Buka Halaman Testimoni",
  linkHref: "/testimoni",
  testimonials: [] as TestimonialItem[],
};
