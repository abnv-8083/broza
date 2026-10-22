import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import BrozaLogo from './BrozaLogo';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Smooth fade-out reveal
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
              if (onComplete) onComplete();
            }
          });
        }
      });

      // Subtle entrance of logo & brand
      tl.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      )
      // Clean thin progress line expands
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.0, ease: 'power1.inOut' },
        0.1
      )
      // Slight hold then exit
      .to({}, { duration: 0.2 });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#0B0B0D] flex flex-col items-center justify-center p-6 select-none"
    >
      {/* Ambient background glow */}
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#FF00A8]/20 to-[#FF6A00]/20 blur-[120px] pointer-events-none" />

      {/* Centered Minimal Content */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center">
        {/* BROZA Logo with rotating gradient ring */}
        <div className="mb-4">
          <BrozaLogo variant="mark" size="lg" />
        </div>

        {/* Wordmark */}
        <div className="flex items-center gap-2">
          <h1 className="font-display font-black text-3xl sm:text-4xl tracking-[-0.03em] text-[#F5F5F5] uppercase">
            BROZA
          </h1>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF00A8]" />
        </div>

        <p className="text-[11px] font-mono tracking-[0.25em] text-[#A5A5A5] uppercase mt-1">
          WEAR YOUR IDENTITY
        </p>

        {/* Thin minimal gradient progress line */}
        <div className="w-48 h-[2px] bg-white/10 rounded-full mt-6 overflow-hidden">
          <div
            ref={lineRef}
            className="w-full h-full bg-gradient-to-r from-[#FF00A8] to-[#FF6A00] origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </div>
  );
}
