import React, { useEffect, useRef } from 'react';
import { Sparkles, MapPin, CheckCircle2, Feather, Compass, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRAND_VALUES } from '../data/products';
import BrozaLogo from './BrozaLogo';

gsap.registerPlugin(ScrollTrigger);

export default function AboutBroza() {
  const sectionRef = useRef(null);
  const manifestoRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Manifesto Entrance
      if (manifestoRef.current) {
        gsap.fromTo(
          manifestoRef.current,
          { y: 40, opacity: 0 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true
            },
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            clearProps: 'all'
          }
        );
      }

      // Staggered Value Cards
      const cards = cardsRef.current?.querySelectorAll('.value-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true
            },
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'all'
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-28 sm:py-36 bg-[#0B0B0D] overflow-hidden"
    >
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-[#FF00A8]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Top Section */}
        <div ref={manifestoRef} className="max-w-4xl mx-auto text-center mb-20 sm:mb-28">
          
          {/* Logo & Heritage Seal */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <BrozaLogo variant="mark" size="sm" />
            <span className="text-xs font-mono tracking-[0.25em] text-[#A5A5A5] uppercase">
              ORIGIN // KANHANGAD, KERALA • SINCE 2026
            </span>
          </div>

          {/* Primary Statement */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-[#F5F5F5] uppercase leading-[1.08] mb-8">
            "Built for individuality. <br className="hidden sm:inline" />
            Designed for everyday movement."
          </h2>

          <p className="text-base sm:text-xl text-[#A5A5A5] font-light leading-relaxed max-w-2xl mx-auto">
            BROZA brings contemporary unisex fashion and streetwear together in pieces made to express who you are. We challenge conventional fast-fashion tropes with architectural silhouettes and intentional heavyweight textiles.
          </p>

          {/* Stats Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <span className="block text-3xl font-display font-extrabold text-[#F5F5F5]">100%</span>
              <span className="text-[11px] font-mono text-[#A5A5A5] uppercase tracking-wider">UNISEX PATTERNS</span>
            </div>
            <div>
              <span className="block text-3xl font-display font-extrabold gradient-accent-text">280-450</span>
              <span className="text-[11px] font-mono text-[#A5A5A5] uppercase tracking-wider">GSM HEAVY FABRICS</span>
            </div>
            <div>
              <span className="block text-3xl font-display font-extrabold text-[#F5F5F5]">150 PCS</span>
              <span className="text-[11px] font-mono text-[#A5A5A5] uppercase tracking-wider">LIMITED BATCH RUNS</span>
            </div>
            <div>
              <span className="block text-3xl font-display font-extrabold text-[#FF6A00]">EST. 2026</span>
              <span className="text-[11px] font-mono text-[#A5A5A5] uppercase tracking-wider">KANHANGAD STUDIO</span>
            </div>
          </div>

        </div>

        {/* 4 Pillars Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {BRAND_VALUES.map((val) => (
            <div
              key={val.number}
              className="value-card p-6 sm:p-7 rounded-2xl bg-[#131316] border border-white/10 hover:border-[#FF00A8]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-[#FF00A8] font-bold">
                    // {val.number}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#FF6A00] transition-colors" />
                </div>

                <h3 className="font-display font-black text-lg text-[#F5F5F5] group-hover:text-white uppercase tracking-tight mb-3">
                  {val.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#A5A5A5] font-normal leading-relaxed">
                  {val.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-[#A5A5A5]/60 group-hover:text-[#A5A5A5]">
                <span>BROZA STANDARD</span>
                <span>•</span>
                <span>VERIFIED</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
