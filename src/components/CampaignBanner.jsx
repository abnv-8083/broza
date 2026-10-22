import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Flame, Clock, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CampaignBanner({ onShopLatest }) {
  const bannerRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  // Live countdown timer state for urgency & immersion
  const [timeLeft, setTimeLeft] = useState({
    hours: 18,
    minutes: 42,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scroll on banner image
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        },
        y: 80,
        ease: 'none'
      });

      // Staggered reveal for campaign content
      gsap.from(contentRef.current?.children, {
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out'
      });
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={bannerRef}
      className="relative py-28 sm:py-36 bg-[#0B0B0D] overflow-hidden border-y border-white/5"
    >
      {/* Background Photography with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          ref={imageRef}
          className="relative w-full h-[125%] -top-[12%] filter brightness-45 contrast-125"
        >
          <img
            src="/images/campaign-drop.jpg"
            alt="BROZA Campaign - The Next Drop"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
        
        {/* Dark Vignettes & Magenta/Orange Neon Glow */}
        <div className="absolute inset-0 bg-[#0B0B0D]/85 backdrop-blur-[1px]" />
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-[#FF00A8]/20 blur-[130px] pointer-events-none" />
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 rounded-full bg-[#FF6A00]/20 blur-[130px] pointer-events-none" />
      </div>

      {/* Massive Watermark Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden opacity-5">
        <span className="font-display font-black text-[28vw] tracking-tighter text-white whitespace-nowrap">
          BROZA
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={contentRef}
          className="max-w-3xl mx-auto text-center flex flex-col items-center"
        >
          {/* Eyebrow Drop Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/15 text-xs font-mono tracking-[0.25em] text-[#FF00A8] uppercase mb-6">
            <Flame className="w-3.5 h-3.5 text-[#FF6A00] animate-pulse" />
            <span>DROP 04 // LIMITED RUN</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-[#F5F5F5] uppercase leading-[0.98] mb-6">
            THE NEXT DROP <br />
            <span className="gradient-accent-text italic">IS HERE.</span>
          </h2>

          <p className="text-base sm:text-xl text-[#A5A5A5] max-w-xl font-light leading-relaxed mb-10">
            Engineered in strictly limited batches of 150 pieces per colorway. No restocks once sold out.
          </p>

          {/* Live Urgency Countdown Timer */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-10 p-4 sm:p-6 rounded-2xl bg-[#131316]/80 backdrop-blur-md border border-white/10 max-w-md w-full">
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-display font-black text-[#F5F5F5]">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#A5A5A5] uppercase mt-1">
                HOURS
              </span>
            </div>
            <div className="flex flex-col items-center border-x border-white/10">
              <span className="text-3xl sm:text-4xl font-display font-black text-[#FF00A8]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#A5A5A5] uppercase mt-1">
                MINUTES
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-display font-black text-[#FF6A00]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#A5A5A5] uppercase mt-1">
                SECONDS
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            type="button"
            onClick={onShopLatest}
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-xl font-display font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-[#FF00A8] to-[#FF6A00] text-white shadow-xl shadow-[#FF00A8]/30 hover:shadow-[#FF00A8]/50 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>SHOP THE LATEST</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Subtext info */}
          <p className="text-xs font-mono text-[#A5A5A5] tracking-wider mt-5">
            // ALL-INDIA FAST DISPATCH • SECURE CHECKOUT • ZERO GENDER BOUNDARIES
          </p>

        </div>
      </div>
    </section>
  );
}
