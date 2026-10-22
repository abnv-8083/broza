import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import BrozaLogo from './BrozaLogo';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);

  const statusMessages = [
    "INITIALIZING KANHANGAD STUDIO ASSETS",
    "LOADING DROP 04 SS26 CATALOG",
    "CALIBRATING 280-450 GSM ARCHITECTURE",
    "SYNCHRONIZING UNISEX SILHOUETTES",
    "WEAR YOUR IDENTITY"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter proxy object for smooth interpolation
      const counterProxy = { val: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          // Exit curtain animation
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 1,
            ease: 'power4.inOut',
            onComplete: () => {
              if (onComplete) onComplete();
            }
          });
        }
      });

      // Animate progress 0 -> 100%
      tl.to(counterProxy, {
        val: 100,
        duration: 2.0,
        ease: 'power2.inOut',
        onUpdate: () => {
          const current = Math.floor(counterProxy.val);
          setProgress(current);
          
          // Cycle status messages
          const nextIdx = Math.min(
            statusMessages.length - 1,
            Math.floor((current / 100) * statusMessages.length)
          );
          setStatusIndex(nextIdx);
        }
      });

      // Pulsing and scaling of central elements
      tl.fromTo(
        ringRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.5)' },
        0
      );

      // Bar width animation
      tl.to(
        barRef.current,
        { width: '100%', duration: 2.0, ease: 'power2.inOut' },
        0
      );

      // Wordmark entrance
      tl.from(
        '.loader-brand-text',
        { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 },
        0.3
      );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const handleSkip = () => {
    gsap.to(containerRef.current, {
      yPercent: -100,
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 bg-[#0B0B0D] flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none"
    >
      {/* Background ambient glow spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#FF00A8]/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#FF6A00]/15 blur-[140px] pointer-events-none" />

      {/* Top Header Information */}
      <div className="flex items-center justify-between text-xs font-mono text-[#A5A5A5] z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF00A8] animate-ping" />
          <span className="tracking-[0.2em] uppercase text-white font-semibold">
            BROZA CLOTHING STORE
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline tracking-wider">
            KANHANGAD, KERALA // EST. 2026
          </span>
          <button
            type="button"
            onClick={handleSkip}
            className="px-3 py-1 rounded-full border border-white/20 hover:border-[#FF00A8] hover:text-white text-[#A5A5A5] transition-colors text-[11px] font-mono tracking-widest uppercase cursor-pointer"
          >
            SKIP [ENTER] ↵
          </button>
        </div>
      </div>

      {/* Central Visual Focus */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
        {/* Animated Circular Ring Logo */}
        <div ref={ringRef} className="relative mb-6">
          <BrozaLogo variant="mark" size="lg" />
        </div>

        {/* Brand Wordmark with Letter Spacing */}
        <div className="loader-brand-text flex items-center gap-3">
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-[#F5F5F5] tracking-[-0.04em] uppercase">
            BROZA
          </h1>
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF00A8] animate-pulse" />
        </div>

        {/* Tagline */}
        <p className="loader-brand-text text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-[#A5A5A5] mt-2">
          WEAR YOUR IDENTITY
        </p>

        {/* Dynamic Status Log Line */}
        <div className="mt-8 h-6 flex items-center justify-center">
          <span 
            ref={textRef}
            className="text-[11px] sm:text-xs font-mono tracking-[0.2em] text-[#FF6A00] uppercase transition-all duration-200"
          >
            // {statusMessages[statusIndex]}
          </span>
        </div>
      </div>

      {/* Bottom Progress Bar & Percentage Counter */}
      <div className="relative z-10 max-w-xl mx-auto w-full space-y-3">
        <div className="flex items-baseline justify-between text-xs font-mono">
          <span className="text-[#A5A5A5] tracking-widest">
            SYSTEM BOOT // DROP 04
          </span>
          <span 
            ref={counterRef} 
            className="text-2xl font-display font-black text-[#F5F5F5] tracking-tight"
          >
            {String(progress).padStart(2, '0')}%
          </span>
        </div>

        {/* Progress Track */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            ref={barRef}
            className="h-full bg-gradient-to-r from-[#FF00A8] via-[#FF3366] to-[#FF6A00] rounded-full"
            style={{ width: '0%' }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-[#A5A5A5]/60 pt-1">
          <span>COMPILED FOR HIGH DENSITY SCREENS</span>
          <span>© 2026 BROZA APPAREL</span>
        </div>
      </div>
    </div>
  );
}
