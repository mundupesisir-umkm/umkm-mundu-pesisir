import React from "react";
import { WhyUsItem } from "@/constants/features";
import { FishermanIcon, ShieldSafeIcon, CommunityIcon } from "./FeatureIcons";
import { cn } from "@/lib";

interface WhyUsCardProps {
  item: WhyUsItem;
  className?: string;
}

export const WhyUsCard: React.FC<WhyUsCardProps> = ({ item, className }) => {
  const renderIcon = () => {
    switch (item.icon) {
      case "fisherman":
        return <FishermanIcon className="w-8 h-8 sm:w-9 sm:h-9 text-[#0a2642]" />;
      case "shield":
        return <ShieldSafeIcon className="w-8 h-8 sm:w-9 sm:h-9 text-[#0a2642]" />;
      case "community":
        return <CommunityIcon className="w-8 h-8 sm:w-9 sm:h-9 text-[#0a2642]" />;
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
        <p className="text-xs sm:text-[13px] text-[#5a6b7c] leading-relaxed font-sans">
          {item.description}
        </p>
      </div>
    </div>
  );
};
