"use client";

import React from "react";

interface FishIllustrationProps {
  className?: string;
}

export const FishIllustration: React.FC<FishIllustrationProps> = ({
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <style>{`
        @keyframes fishSwim {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-5px) rotate(1.2deg);
          }
          50% {
            transform: translateY(3px) rotate(-0.8deg);
          }
          75% {
            transform: translateY(-2px) rotate(0.6deg);
          }
        }
        @keyframes tailWaggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(3.5deg) skewY(1.5deg);
          }
        }
        @keyframes bubbleRise {
          0% {
            transform: translateY(0px) scale(0.8);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-14px) scale(1.1);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-28px) scale(0.5);
            opacity: 0;
          }
        }
        .animate-fish {
          animation: fishSwim 6.5s ease-in-out infinite;
        }
        .animate-tail {
          transform-origin: 95px 118px;
          animation: tailWaggle 3.2s ease-in-out infinite;
        }
        .bubble-1 {
          animation: bubbleRise 3.2s ease-in infinite;
        }
        .bubble-2 {
          animation: bubbleRise 4.5s ease-in infinite 1.2s;
        }
        .bubble-3 {
          animation: bubbleRise 3.8s ease-in infinite 2s;
        }
      `}</style>

      <svg
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible select-none"
      >
        <defs>
          {/* Coastal Sand to Ocean Gradient */}
          <linearGradient id="fishBodyGrad" x1="40" y1="60" x2="360" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#dfc19c" stopOpacity="0.16" />
            <stop offset="60%" stopColor="#8a6843" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0a2642" stopOpacity="0.04" />
          </linearGradient>

          <linearGradient id="finGrad" x1="100" y1="20" x2="260" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#dfc19c" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0a2642" stopOpacity="0.12" />
          </linearGradient>

          <linearGradient id="strokeGrad" x1="20" y1="50" x2="380" y2="190" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c4975d" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#8a6843" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0a2642" stopOpacity="0.6" />
          </linearGradient>

          {/* Scale Pattern Definition */}
          <pattern id="fishScales" width="16" height="16" patternUnits="userSpaceOnUse">
            <path
              d="M0 8 C4 4, 12 4, 16 8 C12 12, 4 12, 0 8 Z"
              fill="none"
              stroke="#8a6843"
              strokeWidth="0.85"
              strokeOpacity="0.25"
            />
          </pattern>
        </defs>

        {/* Outer Fish Group with Undulating Swimming Motion */}
        <g className="animate-fish">
          {/* 1. TAIL / CAUDAL FIN (With Tail Waggle Animation) */}
          <g className="animate-tail">
            {/* Outer Tail Fin Profile */}
            <path
              d="M95 118 C65 72, 28 32, 10 42 C24 78, 48 108, 52 118 C48 128, 24 158, 10 194 C28 204, 65 164, 95 118 Z"
              fill="url(#finGrad)"
              stroke="url(#strokeGrad)"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Internal Tail Fin Rays */}
            <path
              d="M85 118 C55 85, 30 55, 18 52 M80 118 C52 95, 30 78, 22 76 M78 118 C52 108, 35 102, 28 102 M78 118 C52 128, 35 134, 28 134 M80 118 C52 141, 30 158, 22 160 M85 118 C55 151, 30 181, 18 184"
              stroke="url(#strokeGrad)"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeOpacity="0.55"
            />
          </g>

          {/* 2. DORSAL FIN (Top) seamlessly attached to body line */}
          <g>
            <path
              d="M138 72 C158 20, 222 18, 252 70 C220 74, 175 74, 138 72 Z"
              fill="url(#finGrad)"
              stroke="url(#strokeGrad)"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Dorsal Rays */}
            <path
              d="M162 60 C170 36, 180 28, 186 26 M182 58 C190 34, 200 28, 206 27 M202 56 C212 36, 220 32, 228 34 M222 58 C230 42, 238 40, 244 44"
              stroke="url(#strokeGrad)"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeOpacity="0.5"
            />
          </g>

          {/* 3. ANAL & PELVIC FINS (Bottom) seamlessly attached to body line */}
          <g>
            {/* Pelvic Fin */}
            <path
              d="M170 166 C190 216, 232 210, 250 164 C222 170, 195 170, 170 166 Z"
              fill="url(#finGrad)"
              stroke="url(#strokeGrad)"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M188 175 C198 195, 212 204, 224 205 M208 178 C218 194, 228 198, 236 195"
              stroke="url(#strokeGrad)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeOpacity="0.45"
            />

            {/* Small Ventral Fin near tail seamlessly connected */}
            <path
              d="M112 135 C102 160, 122 164, 132 142 Z"
              fill="url(#finGrad)"
              stroke="url(#strokeGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.6"
            />
          </g>

          {/* 4. MAIN BODY SILHOUETTE */}
          <path
            d="M95 118 C118 64, 205 52, 290 75 C335 88, 368 108, 372 118 C368 128, 335 148, 290 161 C205 184, 118 172, 95 118 Z"
            fill="url(#fishBodyGrad)"
            stroke="url(#strokeGrad)"
            strokeWidth="3.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 5. TEXTURED FISH SCALES */}
          <g opacity="0.8">
            <path
              d="M130 118 C145 80, 200 70, 260 85 C230 115, 230 135, 260 151 C200 166, 145 156, 130 118 Z"
              fill="url(#fishScales)"
            />
          </g>

          {/* 6. LATERAL SENSORY LINE */}
          <path
            d="M102 118 C155 112, 225 110, 310 118"
            stroke="url(#strokeGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            strokeLinecap="round"
            strokeOpacity="0.45"
          />

          {/* 7. PECTORAL FIN on Mid-Body */}
          <g>
            <path
              d="M210 120 C185 130, 160 152, 165 160 C180 160, 215 142, 228 128 C226 122, 218 120, 210 120 Z"
              fill="url(#finGrad)"
              stroke="url(#strokeGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Pectoral Fin Rays */}
            <path
              d="M212 126 C196 136, 178 148, 174 154 M218 128 C204 136, 192 146, 185 152 M222 130 C212 136, 205 142, 198 148"
              stroke="url(#strokeGrad)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeOpacity="0.5"
            />
          </g>

          {/* 8. OPERCULUM & GILL CURVES */}
          <path
            d="M278 84 C260 98, 260 138, 278 152"
            stroke="url(#strokeGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M292 88 C278 102, 278 134, 292 148"
            stroke="url(#strokeGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />

          {/* 9. MOUTH & SNOUT DETAILS */}
          <path
            d="M366 114 C360 116, 355 118, 362 122"
            stroke="url(#strokeGrad)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* 10. EXPRESSIVE EYE WITH LIGHT REFLECTION */}
          <g>
            {/* Eye Sclera */}
            <circle
              cx="332"
              cy="104"
              r="9"
              fill="#ffffff"
              fillOpacity="0.9"
              stroke="url(#strokeGrad)"
              strokeWidth="2.75"
            />
            {/* Iris */}
            <circle cx="332" cy="104" r="5" fill="#0a2642" />
            {/* Light Catch Highlight */}
            <circle cx="330" cy="102" r="1.75" fill="#ffffff" />
          </g>

          {/* 11. STREAMLINE WATER CURRENT FLOW LINES */}
          <path
            d="M70 70 C40 65, 20 75, 5 70"
            stroke="url(#strokeGrad)"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeOpacity="0.35"
          />
          <path
            d="M80 168 C50 175, 25 168, 5 174"
            stroke="url(#strokeGrad)"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeOpacity="0.35"
          />
        </g>

        {/* 12. FLOATING EFFERVESCENT WATER BUBBLES */}
        <g>
          <circle
            cx="378"
            cy="86"
            r="4.5"
            stroke="url(#strokeGrad)"
            strokeWidth="1.75"
            fill="#ffffff"
            fillOpacity="0.5"
            className="bubble-1"
          />
          <circle
            cx="386"
            cy="68"
            r="3"
            stroke="url(#strokeGrad)"
            strokeWidth="1.5"
            fill="#ffffff"
            fillOpacity="0.5"
            className="bubble-2"
          />
          <circle
            cx="392"
            cy="102"
            r="2.5"
            stroke="url(#strokeGrad)"
            strokeWidth="1.25"
            fill="#ffffff"
            fillOpacity="0.4"
            className="bubble-3"
          />
        </g>
      </svg>
    </div>
  );
};
