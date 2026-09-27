import { TestimonialItem } from "@/constants/testimonials";

export type { TestimonialItem };

export interface TestimonialSectionProps {
  className?: string;
  badge?: string;
  headline?: string;
  linkText?: string;
  linkHref?: string;
  items?: TestimonialItem[];
}
