import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Layers, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CATEGORY_SHOWCASE } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

export default function CategoryShowcase({ onSelectCategory }) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.category-tile');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            y: 50,
            opacity: 0,
            scale: 0.96
          },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true
            },
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'all' // Guarantee no stuck opacity/transform values
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCategoryClick = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    const collectionSection = document.querySelector('#collection');
    if (collectionSection) {
      collectionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="categories" 
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#0E0E11] overflow-hidden border-t border-white/5"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-10 w-96 h-96 rounded-full bg-[#FF00A8]/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 rounded-full bg-[#FF6A00]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-[0.2em] text-[#FF6A00] uppercase mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>CATEGORIES // SS26</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-[#F5F5F5] uppercase">
              SHOP BY <span className="gradient-accent-text">DISCIPLINE.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#A5A5A5] max-w-md font-normal leading-relaxed">
            Three foundational pillars engineered with dedicated fabric weights, tailored drape geometry, and intentional unisex fits.
          </p>
        </div>

        {/* 3 Large Category Blocks */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {CATEGORY_SHOWCASE.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="category-tile group relative min-h-[480px] sm:h-[540px] lg:h-[580px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#FF00A8]/60 transition-all duration-500 shadow-2xl bg-[#16161A] flex flex-col justify-between p-6 sm:p-7"
              data-cursor-text="EXPLORE"
            >
              {/* Category Background Image */}
              <div className="absolute inset-0 z-0 bg-[#18181D]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                
                {/* Dark Vignettes & Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/55 to-black/25 opacity-90 group-hover:opacity-75 transition-opacity duration-300" />
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-[#FF00A8] transition-all duration-500" />
              </div>

              {/* Top Tag & Index */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-md text-[10px] font-mono font-bold tracking-widest text-[#F5F5F5] bg-black/60 backdrop-blur-md border border-white/15 uppercase">
                  {cat.tag}
                </span>
                <span className="text-xs font-mono text-[#A5A5A5] tracking-widest bg-black/40 px-2 py-0.5 rounded border border-white/5">
                  0{idx + 1} // 03
                </span>
              </div>

              {/* Bottom Content Area */}
              <div className="relative z-10 flex flex-col justify-end pt-20">
                <p className="text-xs font-mono tracking-[0.2em] text-[#FF00A8] uppercase mb-1 font-semibold">
                  {cat.subtitle}
                </p>

                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-3xl sm:text-4xl font-black font-display text-[#F5F5F5] group-hover:text-white transition-colors uppercase tracking-tight">
                    {cat.title}
                  </h3>

                  {/* Arrow circle button */}
                  <div className="w-11 h-11 rounded-full bg-white/10 group-hover:bg-gradient-to-r group-hover:from-[#FF00A8] group-hover:to-[#FF6A00] flex items-center justify-center text-white border border-white/15 group-hover:border-transparent transition-all duration-300 group-hover:scale-110 shadow-lg shrink-0">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#A5A5A5] group-hover:text-[#F5F5F5]/90 mt-3 line-clamp-2 transition-colors duration-300">
                  {cat.desc}
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#A5A5A5]">
                  <span>DISCOVER PIECES</span>
                  <span className="text-[#FF6A00] group-hover:translate-x-1 transition-transform font-bold">
                    EXPLORE →
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
