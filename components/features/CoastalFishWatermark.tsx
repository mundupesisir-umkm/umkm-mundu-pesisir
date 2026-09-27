import React from "react";
import { cn } from "@/lib";

interface WatermarkProps {
  className?: string;
}

export const CoastalFishWatermark: React.FC<WatermarkProps> = ({ className }) => (
  <svg
    viewBox="0 0 160 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("pointer-events-none select-none", className)}
    aria-hidden="true"
  >
    {/* Stylized coastal fish outline matching screenshot */}
    <path
      d="M10 70C30 35 75 15 130 18C142 20 152 14 156 8C154 28 155 42 148 55C155 70 158 88 152 108C146 102 138 98 128 100C85 106 40 92 10 70Z"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M45 42C55 58 55 82 45 98"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="32" cy="52" r="5" fill="currentColor" />
    <path
      d="M80 32C95 48 95 72 80 88"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeDasharray="4 4"
      strokeLinecap="round"
    />
  </svg>
);
