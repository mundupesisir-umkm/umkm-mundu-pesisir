import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryItem } from "@/constants/features";
import { SiwangIcon, KerupukIcon, SeafoodFishIcon } from "./FeatureIcons";
import { cn } from "@/lib";

interface CategoryCardProps {
  item: CategoryItem;
  className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  item,
  className,
}) => {
  const renderIcon = () => {
    switch (item.icon) {
      case "siwang":
        return <SiwangIcon className="w-10 h-10 sm:w-11 sm:h-11 text-[#0a2642]" />;
      case "fish":
        // Olahan Ikan -> Kerupuk Payur / Kerupuk Ikan icon
        return <KerupukIcon className="w-10 h-10 sm:w-11 sm:h-11 text-[#0a2642]" />;
      case "seafood":
        // Aneka Seafood -> Fish icon
        return <SeafoodFishIcon className="w-10 h-10 sm:w-11 sm:h-11 text-[#0a2642]" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl sm:rounded-3xl bg-white border border-[#e5d5c3]",
        "p-5 sm:p-6 flex flex-col justify-between",
        "shadow-xs hover:shadow-lg hover:shadow-[#0a2642]/8",
        "transition-all duration-300 ease-out hover:-translate-y-1 group",
        className
      )}
    >
      <div>
        {/* Card Icon */}
        <div className="flex items-center justify-start mb-3 text-[#0a2642] group-hover:scale-105 transition-transform duration-300">
          {renderIcon()}
        </div>

        {/* Card Title */}
        <h3 className="text-base sm:text-lg font-bold text-[#0a2642] font-sans mb-1.5">
          {item.title}
        </h3>

        {/* Card Description */}
        <p className="text-xs sm:text-[13px] text-[#5a6b7c] leading-relaxed font-sans mb-4">
          {item.description}
        </p>
      </div>

      {/* Card Action Link */}
      <Link
        href={item.href}
        className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#c26d24] hover:text-[#9a4f10] transition-colors self-start"
      >
        <span>{item.linkText}</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
      </Link>
    </div>
  );
};
