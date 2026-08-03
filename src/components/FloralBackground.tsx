import React from 'react';

export const FloralBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute right-0 bottom-0 pointer-events-none select-none w-72 sm:w-96 md:w-[420px] opacity-[0.22] dark:opacity-[0.08] transition-opacity duration-300 transform translate-x-8 translate-y-6"
    >
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto text-[#CD0000] dark:text-rose-300"
      >
        {/* Soft Floral & Leaf Stems */}
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Main Eucalyptus / Olive Stem 1 */}
          <path d="M 380 290 Q 320 220 240 180 Q 180 150 120 160" strokeWidth="2" opacity="0.8" />
          
          {/* Leaves along Stem 1 */}
          <path d="M 330 230 C 310 200 280 210 290 235 C 300 250 320 240 330 230 Z" fill="currentColor" fillOpacity="0.1" />
          <path d="M 280 200 C 260 170 230 180 240 205 C 250 220 270 210 280 200 Z" fill="currentColor" fillOpacity="0.1" />
          <path d="M 230 175 C 210 145 180 155 190 180 C 200 195 220 185 230 175 Z" fill="currentColor" fillOpacity="0.1" />
          <path d="M 170 155 C 150 125 120 135 130 160 C 140 175 160 165 170 155 Z" fill="currentColor" fillOpacity="0.1" />

          {/* Opposite Leaves */}
          <path d="M 345 240 C 370 220 380 245 360 255 C 345 260 335 245 345 240 Z" fill="currentColor" fillOpacity="0.1" />
          <path d="M 295 208 C 320 188 330 213 310 223 C 295 228 285 213 295 208 Z" fill="currentColor" fillOpacity="0.1" />
          <path d="M 245 182 C 270 162 280 187 260 197 C 245 202 235 187 245 182 Z" fill="currentColor" fillOpacity="0.1" />

          {/* Rose Blossom Outlines (Bottom Right Corner) */}
          {/* Outer Petals */}
          <path d="M 330 280 Q 290 260 280 220 Q 330 200 370 230 Q 380 270 330 280 Z" fill="currentColor" fillOpacity="0.08" strokeWidth="1.8" />
          <path d="M 310 250 C 290 230 300 210 325 215 C 345 220 350 240 335 255 Z" fill="currentColor" fillOpacity="0.08" />
          <path d="M 320 235 C 310 225 315 215 328 220 C 338 223 340 233 330 240 Z" fill="currentColor" fillOpacity="0.12" />

          {/* Secondary Delicate Floral Branch */}
          <path d="M 390 200 Q 320 150 260 100 Q 210 60 150 40" strokeWidth="1.5" opacity="0.7" />
          {/* Small Round Buds */}
          <circle cx="260" cy="100" r="8" fill="currentColor" fillOpacity="0.15" />
          <circle cx="210" cy="60" r="6" fill="currentColor" fillOpacity="0.15" />
          <circle cx="150" cy="40" r="5" fill="currentColor" fillOpacity="0.15" />

          {/* Small Delicate Petals along top branch */}
          <path d="M 315 145 C 300 130 290 140 300 155 Z" fill="currentColor" fillOpacity="0.1" />
          <path d="M 280 115 C 265 100 255 110 265 125 Z" fill="currentColor" fillOpacity="0.1" />
          <path d="M 230 80 C 215 65 205 75 215 90 Z" fill="currentColor" fillOpacity="0.1" />
        </g>
      </svg>
    </div>
  );
};
