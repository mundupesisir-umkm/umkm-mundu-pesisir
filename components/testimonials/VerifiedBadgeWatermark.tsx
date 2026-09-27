import React from "react";
import { cn } from "@/lib";

interface VerifiedBadgeWatermarkProps {
  className?: string;
}

export const VerifiedBadgeWatermark: React.FC<VerifiedBadgeWatermarkProps> = ({
  className,
}) => {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      {/* Outer circular glow ring */}
      <circle
        cx="60"
        cy="52"
        r="40"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeDasharray="6 4"
        className="opacity-70"
      />
      {/* Inner solid ring */}
      <circle
        cx="60"
        cy="52"
        r="32"
        stroke="currentColor"
        strokeWidth="3.5"
        className="opacity-90"
      />
      {/* Center checkmark / ribbon star */}
      <path
        d="M48 53L56 61L73 43"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-90"
      />
      {/* Left ribbon */}
      <path
        d="M46 78L36 108L54 98L60 108L56 78"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
        className="opacity-80"
      />
      {/* Right ribbon */}
      <path
        d="M74 78L84 108L66 98L60 108L64 78"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
        className="opacity-80"
      />
    </svg>
  );
};
