import React from "react";
import { cn } from "@/lib";

interface IconProps {
  className?: string;
}

/**
 * 1. Siwang (Terasi Bawang) - Chili Pepper
 */
export const SiwangIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 48 48"
    fill="currentColor"
    className={cn("w-11 h-11 sm:w-12 sm:h-12 text-[#0a2642]", className)}
    aria-hidden="true"
  >
    {/* Stem */}
    <path
      d="M26 4C28 6.5 27 10 24 11.5C27 12 29 13.5 30 15.5C28.5 16 26.5 15.5 25 14.5C24.5 16 23 17 21 17.5C21.5 16 21 14.5 20 13.5C18 14 17 13 16.5 12C18.5 11.5 20 10.5 20.5 9C21.5 7.5 23.5 4 26 4Z"
      fill="currentColor"
    />
    {/* Chili Pod Body curving down to left tip */}
    <path
      d="M29 15C33 19 34 25.5 31.5 31.5C28 39 20.5 44 12 45C10.5 45.2 9.8 43.6 11 42.6C16 38.5 19.8 33.5 21.2 27C22.2 22 21.2 18.5 19 15.5C22 14 26 13 29 15Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * 2. Olahan Ikan - Kerupuk Ikan / Payur (Crispy Indonesian fish crackers)
 */
export const KerupukIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("w-11 h-11 sm:w-12 sm:h-12 text-[#0a2642]", className)}
    aria-hidden="true"
  >
    {/* Crispy wavy-edged kerupuk cracker body */}
    <path
      d="M24 6C18.5 6 13.5 8.2 10 11.8C6.5 15.2 4.5 20 5 25.5C5.5 31 8.5 36 13 39C17.5 42 23 42.5 28 41C33.5 39.5 38.5 35.8 41 31C43.5 26.2 43.5 20 40.5 15C37.5 10 32.5 6.5 26.5 6.1C25.7 6 24.8 6 24 6Z"
      fill="currentColor"
      opacity="0.12"
    />
    {/* Outer crispy scalloped border */}
    <path
      d="M24 6C21 6 18 7 15.5 8.5C13 10 10.8 12 9 14.5C7.2 17 6 20 6 23C6 26.5 7.5 29.5 9.5 32C11.5 34.5 14 36.8 17 38.2C20 39.6 23.5 40 27 39.5C30.5 39 34 37.2 36.8 34.8C39.5 32.2 41.2 29 41.8 25.5C42.4 22 41.8 18 40 15C38.2 12 35.2 9.5 32 8C29.5 6.8 26.8 6.2 24 6Z"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Inner crispy noodle/swirl pattern typical of Indonesian fish crackers */}
    <path
      d="M20 13C16 15 13 19 13.5 24C14 29 18 33 23 33.5C28 34 32.5 31 34 26.5C35.5 22 34 17 30 14.5C26 12 21 13 18 16"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M21 19C19 21 19 25 21.5 27C24 29 27.5 28 29 25.5C30.5 23 29.5 20 27 19C24.5 18 22.5 19 22 20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Crispy bubbles/air pockets in the cracker */}
    <circle cx="16" cy="31" r="1.8" fill="currentColor" />
    <circle cx="31" cy="19" r="1.8" fill="currentColor" />
    <circle cx="34" cy="31" r="1.5" fill="currentColor" />
    <circle cx="28" cy="11" r="1.5" fill="currentColor" />
  </svg>
);

/**
 * 3. Aneka Seafood - Classic Beautiful Fish Icon (Requested by user)
 */
export const SeafoodFishIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 48 48"
    fill="currentColor"
    className={cn("w-11 h-11 sm:w-12 sm:h-12 text-[#0a2642]", className)}
    aria-hidden="true"
  >
    {/* Clean, sleek fish silhouette without top/bottom fins */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M44 24C41 18 34 13 24 13C16 13 9 17 5 21L1 17V31L5 27C9 31 16 35 24 35C34 35 41 30 44 24ZM34 20C32.9 20 32 19.1 32 18C32 16.9 32.9 16 34 16C35.1 16 36 16.9 36 18C36 19.1 35.1 20 34 20Z"
      fill="currentColor"
    />
    {/* Gill Slit */}
    <path
      d="M28 17C26 21 26 27 28 31"
      stroke="#fbf5eb"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

/**
 * 4. 100% Tangkapan Nelayan Lokal - Standing fisherman with fishing rod and fish
 */
export const FishermanIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 48 48"
    fill="currentColor"
    className={cn("w-11 h-11 sm:w-12 sm:h-12 text-[#0a2642]", className)}
    aria-hidden="true"
  >
    {/* Fisherman Head */}
    <circle cx="16" cy="10" r="4.5" fill="currentColor" />
    {/* Fisherman Body & Legs */}
    <path
      d="M13 16H19C21.5 16 23 17.5 23 20V26H20.5V40H17V30H15V40H11.5V26H9V20C9 17.5 10.5 16 13 16Z"
      fill="currentColor"
    />
    {/* Fishing Rod held in right hand */}
    <path
      d="M19 22L34 6"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Fishing line dangling from rod tip */}
    <path
      d="M34 6V26"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Caught Fish hanging on line */}
    <path
      d="M34 26C36.5 26 38.5 28 38.5 30.5C38.5 32.5 36.5 34.5 34 34.5C31.5 34.5 29.5 32.5 29.5 30.5C29.5 28 31.5 26 34 26Z"
      fill="currentColor"
    />
    {/* Fish tail */}
    <path d="M34 34L37 38H31L34 34Z" fill="currentColor" />
  </svg>
);

/**
 * 5. Bebas Pengawet & Kimia Berbahaya - Solid Shield with Checkmark Cutout
 */
export const ShieldSafeIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 48 48"
    fill="currentColor"
    className={cn("w-11 h-11 sm:w-12 sm:h-12 text-[#0a2642]", className)}
    aria-hidden="true"
  >
    {/* Solid shield with transparent checkmark cutout */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 4L8 10V22C8 32.5 14.8 41.8 24 45C33.2 41.8 40 32.5 40 22V10L24 4ZM21.5 32.5L14 25L17.5 21.5L21.5 25.5L31.5 15.5L35 19L21.5 32.5Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * 6. Mendukung Kesejahteraan Desa - 3 People Community Silhouette
 */
export const CommunityIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 48 48"
    fill="currentColor"
    className={cn("w-11 h-11 sm:w-12 sm:h-12 text-[#0a2642]", className)}
    aria-hidden="true"
  >
    {/* Center Leader Figure */}
    <circle cx="24" cy="14" r="5" fill="currentColor" />
    <path
      d="M17 22H31C34 22 36 24 36 27V31H12V27C12 24 14 22 17 22Z"
      fill="currentColor"
    />
    {/* Left Person */}
    <circle cx="11" cy="18" r="4" fill="currentColor" />
    <path
      d="M6 25H14C14.8 25 15.5 25.2 16 25.6V30H4V27C4 25.9 4.9 25 6 25Z"
      fill="currentColor"
    />
    {/* Right Person */}
    <circle cx="37" cy="18" r="4" fill="currentColor" />
    <path
      d="M34 25H42C43.1 25 44 25.9 44 27V30H32V25.6C32.5 25.2 33.2 25 34 25Z"
      fill="currentColor"
    />
  </svg>
);
