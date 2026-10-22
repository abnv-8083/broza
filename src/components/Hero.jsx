import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import gsap from 'gsap';

export default function Hero({ onExploreClick, onDiscoverClick }) {
  const heroRef = useRef(null);
  const headlineWordsRef = useRef([]);
  const imageWrapperRef = useRef(null);
  const rotatingRingRef = useRef(null);
  const contentRef = useRef(null);

  headlineWordsRef.current = [];
  const addToHeadline = (el) => {
    if (el && !headlineWordsRef.current.includes(el)) {
      headlineWordsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Circular ring continuous slow rotation
      gsap.to(rotatingRingRef.current, {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: 'none'
      });

      // Hero image reveal animation
      tl.fromTo(
        imageWrapperRef.current,
        {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          scale: 1.15,
          opacity: 0.6
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1,
          opacity: 1,
          duration: 1.6,
          ease: 'power4.inOut'
        },
        0.1
      )
      // Small label entrance
      .from('.hero-badge', {
        y: 20,
        opacity: 0,
        duration: 0.7
      }, 0.5)
      // Headline words reveal word by word
      .from(headlineWordsRef.current, {
        y: 60,
        opacity: 0,
        rotateX: -25,
        stagger: 0.16,
        duration: 0.9,
        ease: 'back.out(1.2)'
      }, 0.7)
      // Supporting copy
      .from('.hero-subtext', {
        y: 25,
        opacity: 0,
        duration: 0.8
      }, 1.1)
      // CTA Buttons
      .from('.hero-cta-btn', {
        y: 20,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7
      }, 1.25)
      // Floating metadata badges
      .from('.hero-meta-badge', {
        scale: 0.8,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7
      }, 1.3)
      // Scroll indicator
      .from('.hero-scroll-indicator', {
        y: -15,
        opacity: 0,
        duration: 0.8
      }, 1.5);

      // Mouse Parallax on Desktop
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 18;
        const yPos = (clientY / window.innerHeight - 0.5) * 18;

        gsap.to('.hero-parallax-bg', {
          x: xPos,
          y: yPos,
          duration: 1.2,
          ease: 'power1.out'
        });

        gsap.to('.hero-floating-watermark', {
          x: -xPos * 1.5,
          y: -yPos * 1.5,
          duration: 1.5,
          ease: 'power1.out'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const headline = "WEAR YOUR IDENTITY.";
  const words = headline.split(' ');

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 lg:py-0 overflow-hidden bg-[#0B0B0D]"
    >
      {/* Ambient background light gradients */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#FF00A8]/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#FF6A00]/15 blur-[120px] pointer-events-none" />
      
      {/* Oversized BROZA Watermark Typography */}
      <div className="hero-floating-watermark absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden opacity-5">
        <span className="font-display font-black text-[22vw] tracking-tighter leading-none text-white whitespace-nowrap">
          BROZA
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[calc(100vh-8rem)]">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div ref={contentRef} className="lg:col-span-7 flex flex-col justify-center pt-6 lg:pt-0">
            
            {/* Top Brand Tag & Location */}
            <div className="hero-badge flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono font-medium tracking-[0.2em] text-[#F5F5F5]">
                <span className="w-2 h-2 rounded-full bg-[#FF00A8] animate-ping" />
                BROZA CLOTHING STORE
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5 text-xs font-mono tracking-wider text-[#A5A5A5]">
                <MapPin className="w-3 h-3 text-[#FF6A00]" />
                KANHANGAD, INDIA
              </span>
            </div>

            {/* Main Headline: WEAR YOUR IDENTITY */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black font-display tracking-tight text-[#F5F5F5] leading-[0.98] uppercase mb-6">
              {words.map((word, idx) => (
                <span 
                  key={idx} 
                  ref={addToHeadline}
                  className={`inline-block mr-3 sm:mr-4 ${
                    idx === 2 ? 'gradient-accent-text italic' : ''
                  }`}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Supporting Editorial Paragraph */}
            <p className="hero-subtext text-base sm:text-lg md:text-xl font-normal text-[#A5A5A5] max-w-xl leading-relaxed mb-8">
              Premium fits. Unisex essentials. Streetwear without limits. Engineered with heavyweight cottons and architectural drapes designed to reflect who you are.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-10">
              <button
                type="button"
                onClick={onExploreClick}
                className="hero-cta-btn group relative inline-flex items-center justify-center gap-3 px-7 sm:px-9 py-4 rounded-xl font-display font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-[#FF00A8] to-[#FF6A00] text-white shadow-lg shadow-[#FF00A8]/25 hover:shadow-[#FF00A8]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                type="button"
                onClick={onDiscoverClick}
                className="hero-cta-btn inline-flex items-center justify-center px-7 sm:px-8 py-4 rounded-xl font-display font-semibold text-sm tracking-widest uppercase text-[#F5F5F5] bg-white/[0.03] hover:bg-white/[0.08] border border-white/15 hover:border-white/30 transition-all duration-300"
              >
                <span>DISCOVER BROZA</span>
              </button>
            </div>

            {/* Brand Specs Ticker */}
            <div className="grid grid-cols-3 gap-3 max-w-lg pt-4 border-t border-white/10">
              <div className="hero-meta-badge">
                <span className="block text-[11px] font-mono text-[#A5A5A5] uppercase tracking-wider">FABRIC WEIGHT</span>
                <span className="text-sm font-display font-bold text-[#F5F5F5]">280 - 450 GSM</span>
              </div>
              <div className="hero-meta-badge border-l border-white/10 pl-3">
                <span className="block text-[11px] font-mono text-[#A5A5A5] uppercase tracking-wider">SILHOUETTES</span>
                <span className="text-sm font-display font-bold text-[#F5F5F5]">100% UNISEX</span>
              </div>
              <div className="hero-meta-badge border-l border-white/10 pl-3">
                <span className="block text-[11px] font-mono text-[#A5A5A5] uppercase tracking-wider">DROP CADENCE</span>
                <span className="text-sm font-display font-bold text-[#FF6A00]">DROP 04 // LIVE</span>
              </div>
            </div>

          </div>

          {/* Right Column: Layered Editorial Fashion Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Rotating Circular Instagram Gradient Ring */}
            <div 
              ref={rotatingRingRef}
              className="absolute -inset-4 sm:-inset-6 pointer-events-none z-0 flex items-center justify-center"
            >
              <svg 
                className="w-full h-full max-w-[460px] max-h-[460px] opacity-70"
                viewBox="0 0 400 400" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle 
                  cx="200" 
                  cy="200" 
                  r="190" 
                  stroke="url(#heroRingGradient)" 
                  strokeWidth="2.5" 
                  strokeDasharray="40 25 15 20 60 30" 
                  strokeLinecap="round" 
                />
                <circle cx="200" cy="10" r="4.5" fill="#FF00A8" filter="drop-shadow(0 0 8px #FF00A8)" />
                <circle cx="390" cy="200" r="4.5" fill="#FF6A00" filter="drop-shadow(0 0 8px #FF6A00)" />
                <circle cx="10" cy="200" r="3.5" fill="#FF00A8" />
                <defs>
                  <linearGradient id="heroRingGradient" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF00A8" />
                    <stop offset="0.5" stopColor="#FF3366" />
                    <stop offset="1" stopColor="#FF6A00" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Main Editorial Image Card */}
            <div 
              ref={imageWrapperRef}
              className="hero-parallax-bg relative z-10 w-full max-w-md sm:max-w-lg aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/90 group"
            >
              <img
                src="/images/hero-editorial.jpg"
                alt="BROZA Editorial Streetwear Collection - Diverse young adults in oversized hoodie and boxy graphic tee"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />

              {/* Dark subtle vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-black/20" />

              {/* Floating Editorial Badge on Image */}
              <div className="absolute top-4 right-4 backdrop-blur-md bg-black/60 border border-white/15 px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-widest text-[#F5F5F5] uppercase flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#FF00A8]" />
                <span>SS26 LOOKBOOK</span>
              </div>

              {/* Bottom Image Info Label */}
              <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md bg-[#0B0B0D]/80 border border-white/10 p-3.5 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-mono text-[#A5A5A5] uppercase tracking-wider">
                    FLAGSHIP EDITORIAL
                  </p>
                  <p className="text-sm font-display font-bold text-[#F5F5F5]">
                    THE KANHANGAD SERIES
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block text-[10px] font-mono tracking-widest px-2 py-0.5 rounded bg-[#FF00A8]/20 border border-[#FF00A8]/40 text-[#FF00A8]">
                    SINCE 2026
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="hero-scroll-indicator absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none z-10">
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#A5A5A5] uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-gradient-to-b from-[#FF00A8] to-[#FF6A00] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
