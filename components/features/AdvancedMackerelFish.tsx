"use client";

import React from "react";
import { cn } from "@/lib";

interface AdvancedFishProps {
  className?: string;
}

export const AdvancedMackerelFish: React.FC<AdvancedFishProps> = ({
  className,
}) => {
  return (
    <div className={cn("relative select-none pointer-events-none", className)}>
      <style>{`
        @keyframes mackerelGlide {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-6px) rotate(1.2deg);
          }
          66% {
            transform: translateY(4px) rotate(-1deg);
          }
        }
        @keyframes mackerelTail {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-5deg) skewX(2deg);
          }
        }
        .anim-mackerel {
          animation: mackerelGlide 8s ease-in-out infinite;
        }
        .anim-mackerel-tail {
          transform-origin: 100px 75px;
          animation: mackerelTail 2.8s ease-in-out infinite;
        }
      `}</style>

      <svg
        viewBox="0 0 380 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        <defs>
          <linearGradient
            id="mackerelGrad"
            x1="20"
            y1="40"
            x2="360"
            y2="120"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#0a2642" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#8a6843" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#dfc19c" stopOpacity="0.32" />
          </linearGradient>

          <linearGradient
            id="mackerelStroke"
            x1="20"
            y1="75"
            x2="360"
            y2="75"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#0a2642" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#8a6843" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#c26d24" stopOpacity="0.8" />
          </linearGradient>

          {/* Mackerel Tiger Stripes / Vertical Bar Pattern */}
          <pattern
            id="mackerelStripes"
            width="20"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M10 0 C8 10, 12 20, 10 30"
              stroke="#8a6843"
              strokeWidth="1.2"
              strokeOpacity="0.3"
              strokeLinecap="round"
            />
          </pattern>
        </defs>

        <g className="anim-mackerel">
          {/* 1. FORKED CRESCENT TAIL (Caudal Fin) */}
          <g className="anim-mackerel-tail">
            {/* Deeply forked tail characteristic of fast ocean pelagics like Tenggiri */}
            <path
              d="M95 75 C65 42, 28 12, 12 18 C28 45, 52 68, 55 75 C52 82, 28 105, 12 132 C28 138, 65 108, 95 75 Z"
              fill="url(#mackerelGrad)"
              stroke="url(#mackerelStroke)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Caudal Fin Rays */}
            <path
              d="M85 75 C58 50, 35 28, 22 25 M82 75 C58 60, 38 46, 28 44 M82 75 C58 90, 38 104, 28 106 M85 75 C58 100, 35 122, 22 125"
              stroke="url(#mackerelStroke)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeOpacity="0.5"
            />
            {/* Small Caudal Keel */}
            <path
              d="M98 72 L115 75 L98 78 Z"
              fill="url(#mackerelGrad)"
              stroke="url(#mackerelStroke)"
              strokeWidth="1.5"
            />
          </g>

          {/* 2. DORSAL FIN & SPUR FINLETS (Top) */}
          <g>
            {/* Main First Dorsal Fin (Spiny) */}
            <path
              d="M190 48 C205 18, 235 22, 250 46 C230 46, 210 46, 190 48 Z"
              fill="url(#mackerelGrad)"
              stroke="url(#mackerelStroke)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M205 47 L215 25 M218 46 L226 27 M232 46 L238 32"
              stroke="url(#mackerelStroke)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeOpacity="0.5"
            />

            {/* Second Dorsal Fin */}
            <path
              d="M150 56 C160 38, 175 42, 180 52 C170 54, 160 55, 150 56 Z"
              fill="url(#mackerelGrad)"
              stroke="url(#mackerelStroke)"
              strokeWidth="1.8"
            />

            {/* Mackerel Finlets along back */}
            <path d="M110 68 L116 63 L118 69 M124 66 L130 61 L132 67 M138 64 L144 59 L146 65" stroke="url(#mackerelStroke)" strokeWidth="1.5" strokeLinejoin="round" />
          </g>

          {/* 3. VENTRAL FINLETS & ANAL FIN (Bottom) */}
          <g>
            {/* Anal Fin */}
            <path
              d="M152 94 C162 108, 175 106, 182 96 C172 95, 162 94, 152 94 Z"
              fill="url(#mackerelGrad)"
              stroke="url(#mackerelStroke)"
              strokeWidth="1.8"
            />
            {/* Ventral Finlets */}
            <path d="M110 82 L116 87 L118 81 M124 84 L130 89 L132 83 M138 86 L144 91 L146 85" stroke="url(#mackerelStroke)" strokeWidth="1.5" strokeLinejoin="round" />
          </g>

          {/* 4. SLEEK HYDRODYNAMIC TORPEDO BODY */}
          <path
            d="M95 75 C120 54, 180 44, 260 48 C310 52, 350 65, 368 75 C350 85, 310 98, 260 102 C180 106, 120 96, 95 75 Z"
            fill="url(#mackerelGrad)"
            stroke="url(#mackerelStroke)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 5. TIGER STRIPES / BAR PATTERN (Upper flank) */}
          <path
            d="M140 70 C160 52, 220 50, 290 56 C270 72, 200 75, 140 70 Z"
            fill="url(#mackerelStripes)"
          />

          {/* 6. STREAMLINED LATERAL LINE */}
          <path
            d="M98 75 C140 76, 200 78, 250 72 C290 68, 320 72, 345 75"
            stroke="url(#mackerelStroke)"
            strokeWidth="1.4"
            strokeDasharray="4 2.5"
            strokeLinecap="round"
            strokeOpacity="0.55"
          />

          {/* 7. PECTORAL FIN (Tucked close to body) */}
          <g>
            <path
              d="M265 78 C242 84, 218 96, 222 102 C236 102, 262 92, 276 83 C274 79, 270 78, 265 78 Z"
              fill="url(#mackerelGrad)"
              stroke="url(#mackerelStroke)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M260 83 C245 90, 235 96, 228 99 M266 84 C255 90, 245 95, 238 98"
              stroke="url(#mackerelStroke)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeOpacity="0.5"
            />
          </g>

          {/* 8. PELVIC FIN */}
          <path
            d="M230 100 C218 112, 230 115, 238 103 Z"
            fill="url(#mackerelGrad)"
            stroke="url(#mackerelStroke)"
            strokeWidth="1.6"
          />

          {/* 9. GILL COVERS (Streamlined curved operculum) */}
          <path
            d="M305 56 C290 64, 290 86, 305 94"
            stroke="url(#mackerelStroke)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M318 58 C306 66, 306 84, 318 92"
            stroke="url(#mackerelStroke)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />

          {/* 10. POINTED CONICAL MOUTH & EYE */}
          <path
            d="M365 72 C358 74, 348 75, 355 77"
            stroke="url(#mackerelStroke)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Eye with marine iris */}
          <circle
            cx="336"
            cy="70"
            r="5"
            stroke="url(#mackerelStroke)"
            strokeWidth="1.8"
            fill="#fbf5eb"
          />
          <circle cx="337" cy="70" r="2.8" fill="#0a2642" />
          <circle cx="338" cy="68.8" r="1" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
};
