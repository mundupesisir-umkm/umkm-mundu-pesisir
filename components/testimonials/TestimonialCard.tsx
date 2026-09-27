import React from "react";
import { Star } from "lucide-react";
import { TestimonialItem } from "./types";
import { VerifiedBadgeWatermark } from "./VerifiedBadgeWatermark";
import { cn } from "@/lib";

interface TestimonialCardProps {
  item: TestimonialItem;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  item,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl sm:rounded-3xl",
        "bg-[#0a2642] hover:bg-[#071c30]",
        "border border-[#d8c7b4]/50 hover:border-[#dfc19c]",
        "p-5 sm:p-6 md:p-8 flex flex-col justify-between",
        "min-h-55 sm:min-h-62.5 md:min-h-67.5",
        "shadow-md shadow-[#0a2642]/10 transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0a2642]/20",
        className
      )}
    >
      {/* Decorative Watermark for featured card in beach sand gold */}
      {item.hasWatermark && (
        <VerifiedBadgeWatermark className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 text-[#dfc19c]/20 pointer-events-none transform rotate-6" />
      )}

      {/* Top Section: Star Rating and Quote */}
      <div className="relative z-10">
        {/* Star Rating in Golden Amber */}
        <div className="flex items-center gap-1 sm:gap-1.5 mb-3.5 sm:mb-5 text-[#f5a623]">
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star
              key={i}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 fill-[#f5a623] text-[#f5a623]"
              strokeWidth={0}
              aria-hidden="true"
            />
          ))}
          <span className="sr-only">{item.rating} dari 5 bintang</span>
        </div>

        {/* Testimonial Quote */}
        <p className="text-[#fbf7f2] italic font-normal text-xs sm:text-[13px] md:text-sm leading-relaxed sm:leading-relaxed tracking-normal font-sans">
          {item.review}
        </p>
      </div>

      {/* Bottom Section: Author and Location */}
      <div className="relative z-10 mt-4 sm:mt-6 pt-2">
        <h3 className="font-bold text-white text-xs sm:text-sm md:text-[15px] tracking-wide font-sans">
          {item.name}
        </h3>
        <p className="text-[#dfc19c] text-[11px] sm:text-xs font-medium mt-0.5 tracking-normal">
          {item.location}
        </p>
      </div>
    </div>
  );
};
