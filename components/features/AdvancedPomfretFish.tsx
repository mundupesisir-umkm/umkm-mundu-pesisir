"use client";

import React from "react";
import { cn } from "@/lib";

interface AdvancedFishProps {
  className?: string;
}

export const AdvancedPomfretFish: React.FC<AdvancedFishProps> = ({
  className,
}) => {
  return (
    <div className={cn("relative select-none pointer-events-none", className)}>
      <style>{`
        @keyframes pomfretSwim {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(-1.5deg);
          }
        }
        @keyframes pomfretTail {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(4deg) skewY(1deg);
          }
        }
        .anim-pomfret {
          animation: pomfretSwim 7s ease-in-out infinite;
        }
        .anim-pomfret-tail {
          transform-origin: 220px 140px;
          animation: pomfretTail 3.5s ease-in-out infinite;
        }
      `}</style>

      <svg
        viewBox="0 0 320 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        <defs>
          {/* Coastal Sand Gold to Bronze Gradient */}
          <linearGradient
            id="pomfretGrad"
            x1="40"
            y1="40"
            x2="280"
            y2="240"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#dfc19c" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#8a6843" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#0a2642" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient
            id="pomfretStroke"
            x1="20"
            y1="20"
            x2="300"
            y2="260"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#c26d24" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8a6843" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0a2642" stopOpacity="0.5" />
          </linearGradient>

          {/* Scale Pattern */}
          <pattern
            id="pomfretScales"
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 7 C3.5 3.5, 10.5 3.5, 14 7 C10.5 10.5, 3.5 10.5, 0 7 Z"
              fill="none"
              stroke="#8a6843"
              strokeWidth="0.8"
              strokeOpacity="0.35"
            />
          </pattern>
        </defs>

        <g className="anim-pomfret">
          {/* 1. TAIL / CAUDAL FIN */}
          <g className="anim-pomfret-tail">
            <path
              d="M220 140 C250 100, 280 65, 305 75 C295 105, 275 130, 272 140 C275 150, 295 175, 305 205 C280 215, 250 180, 220 140 Z"
              fill="url(#pomfretGrad)"
              stroke="url(#pomfretStroke)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Tail Rays */}
            <path
              d="M230 140 C255 115, 275 90, 290 85 M235 140 C255 125, 275 110, 285 108 M235 140 C255 155, 275 170, 285 172 M230 140 C255 165, 275 190, 290 195"
              stroke="url(#pomfretStroke)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeOpacity="0.6"
            />
          </g>

          {/* 2. TALL DORSAL FIN (Top) */}
          <g>
            <path
              d="M110 85 C100 25, 155 15, 195 90 C165 80, 135 80, 110 85 Z"
              fill="url(#pomfretGrad)"
              stroke="url(#pomfretStroke)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Dorsal Rays */}
            <path
              d="M120 78 C122 45, 135 30, 145 25 M135 75 C142 45, 152 35, 160 30 M150 78 C160 52, 170 45, 178 40 M165 80 C175 60, 182 55, 188 52"
              stroke="url(#pomfretStroke)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeOpacity="0.5"
            />
          </g>

          {/* 3. LONG ANAL FIN (Bottom) */}
          <g>
            <path
              d="M120 195 C110 255, 165 265, 195 190 C170 200, 145 200, 120 195 Z"
              fill="url(#pomfretGrad)"
              stroke="url(#pomfretStroke)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Anal Fin Rays */}
            <path
              d="M130 202 C132 235, 145 250, 155 255 M145 205 C152 235, 162 245, 170 250 M160 202 C170 228, 180 235, 188 240"
              stroke="url(#pomfretStroke)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeOpacity="0.5"
            />
          </g>

          {/* 4. MAIN BODY (Round Pomfret / Bawal Silhouette) */}
          <path
            d="M220 140 C200 80, 135 70, 75 95 C35 112, 15 130, 12 140 C15 150, 35 168, 75 185 C135 210, 200 200, 220 140 Z"
            fill="url(#pomfretGrad)"
            stroke="url(#pomfretStroke)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 5. TEXTURED SCALES */}
          <path
            d="M185 140 C170 100, 130 92, 95 110 C80 125, 80 155, 95 170 C130 188, 170 180, 185 140 Z"
            fill="url(#pomfretScales)"
          />

          {/* 6. LATERAL LINE */}
          <path
            d="M210 140 C165 135, 115 132, 60 140"
            stroke="url(#pomfretStroke)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            strokeLinecap="round"
            strokeOpacity="0.5"
          />

          {/* 7. PECTORAL FIN */}
          <g>
            <path
              d="M105 140 C125 150, 145 165, 140 172 C125 172, 100 155, 92 145 Z"
              fill="url(#pomfretGrad)"
              stroke="url(#pomfretStroke)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M104 145 C118 155, 130 162, 135 166 M100 148 C112 156, 122 163, 128 167"
              stroke="url(#pomfretStroke)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeOpacity="0.5"
            />
          </g>

          {/* 8. GILL / OPERCULUM */}
          <path
            d="M80 110 C92 122, 92 158, 80 170"
            stroke="url(#pomfretStroke)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* 9. MOUTH & EYE */}
          <path
            d="M18 136 C22 138, 25 140, 20 144"
            stroke="url(#pomfretStroke)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Eye */}
          <circle
            cx="48"
            cy="132"
            r="6"
            stroke="url(#pomfretStroke)"
            strokeWidth="2"
            fill="#fbf5eb"
          />
          <circle cx="47" cy="132" r="3.2" fill="#0a2642" />
          <circle cx="48.5" cy="130.5" r="1.2" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
};
