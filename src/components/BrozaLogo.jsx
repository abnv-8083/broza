import React from 'react';

export default function BrozaLogo({ 
  variant = 'full', 
  size = 'md',
  className = '' 
}) {
  // Variants: 'full', 'mark', 'compact'
  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {/* Circular Gradient Ring Logo Mark */}
      <div className="relative flex items-center justify-center shrink-0">
        {/* Ambient Ring Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF00A8] to-[#FF6A00] opacity-40 blur-[8px] group-hover:opacity-75 transition-opacity duration-300" />
        
        {/* SVG Ring with gradient & geometry */}
        <svg 
          className={`relative ${size === 'lg' ? 'w-12 h-12' : size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'} animate-spin-slow`}
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="brozaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF00A8" />
              <stop offset="50%" stopColor="#FF3366" />
              <stop offset="100%" stopColor="#FF6A00" />
            </linearGradient>
            <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="#0B0B0D" stopOpacity="0" />
              <stop offset="100%" stopColor="#FF00A8" stopOpacity="0.3" />
            </radialGradient>
          </defs>

          {/* Background circle */}
          <circle cx="50" cy="50" r="44" fill="#131316" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
          
          {/* Animated gradient ring */}
          <circle 
            cx="50" 
            cy="50" 
            r="42" 
            stroke="url(#brozaGradient)" 
            strokeWidth="4" 
            strokeDasharray="210 50" 
            strokeLinecap="round" 
          />

          {/* Accent dot on orbit */}
          <circle cx="50" cy="8" r="3.5" fill="#FF00A8" filter="drop-shadow(0 0 4px #FF00A8)" />
          <circle cx="92" cy="50" r="2.5" fill="#FF6A00" filter="drop-shadow(0 0 4px #FF6A00)" />
        </svg>

        {/* Central Monogram */}
        <div className="absolute inset-0 flex items-center justify-center font-display font-extrabold text-[#F5F5F5] pointer-events-none tracking-tighter">
          <span className={`${size === 'lg' ? 'text-lg' : size === 'sm' ? 'text-xs' : 'text-sm'}`}>
            B
          </span>
        </div>
      </div>

      {/* Wordmark & Subtitle */}
      {variant !== 'mark' && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-display font-black tracking-[-0.04em] text-[#F5F5F5] ${
              size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-base' : 'text-xl'
            }`}>
              BROZA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF00A8] animate-pulse shrink-0" />
          </div>
          
          {variant === 'full' && (
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#A5A5A5]">
                SINCE 2026
              </span>
              <span className="text-[8px] text-[#A5A5A5]/40">•</span>
              <span className="text-[9px] font-mono tracking-[0.16em] uppercase text-[#FF6A00]/90">
                KANHANGAD
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
