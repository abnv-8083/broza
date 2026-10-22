import React from 'react';

export default function MarqueeTicker() {
  const items = [
    "WEAR YOUR IDENTITY",
    "SINCE 2026",
    "KANHANGAD, KERALA",
    "280-450 GSM HEAVYWEIGHT",
    "UNISEX SILHOUETTES",
    "DROP 04 LIVE NOW",
    "ALL-INDIA EXPRESS DELIVERY",
    "ARCHITECTURAL STREETWEAR"
  ];

  return (
    <div className="relative w-full overflow-hidden py-4 bg-[#111114] border-y border-white/10 select-none">
      <div className="flex w-max animate-marquee">
        {/* Render twice for continuous loop */}
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-6 px-6 shrink-0">
            <span className="font-display font-black text-xs sm:text-sm tracking-[0.25em] text-[#A5A5A5] uppercase hover:text-white transition-colors">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FF00A8] to-[#FF6A00] shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
