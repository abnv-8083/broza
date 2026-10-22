import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CATEGORY_SHOWCASE } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

export default function CategoryShowcase({ onSelectCategory }) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal of category blocks
      const cards = gridRef.current?.querySelectorAll('.category-tile');
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          y: 60,
          opacity: 0,
          stagger: 0.18,
          duration: 0.9,
          ease: 'power3.out'
        });
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
      className="relative py-24 sm:py-32 bg-[#0E0E11] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-14 sm:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-[0.2em] text-[#FF6A00] uppercase mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>CATEGORIES // SS26</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-[#F5F5F5] uppercase">
              SHOP BY <span className="gradient-accent-text">DISCIPLINE.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#A5A5A5] max-w-md font-normal">
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
              className="category-tile group relative h-[520px] sm:h-[580px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#FF00A8]/60 transition-all duration-500 shadow-2xl"
              data-cursor-text="EXPLORE"
            >
              {/* Category Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/50 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300" />
              
              {/* Subtle top edge glow */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FF00A8]/0 to-transparent group-hover:via-[#FF00A8] transition-all duration-500" />

              {/* Top Tag & Index */}
              <div className="absolute top-5 inset-x-5 flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-md text-[10px] font-mono tracking-widest text-[#F5F5F5] bg-black/60 backdrop-blur-md border border-white/15">
                  {cat.tag}
                </span>
                <span className="text-xs font-mono text-[#A5A5A5] tracking-widest">
                  0{idx + 1} // 03
                </span>
              </div>

              {/* Bottom Content Area */}
              <div className="absolute inset-x-6 bottom-6 z-10 flex flex-col justify-end">
                <p className="text-xs font-mono tracking-[0.2em] text-[#FF00A8] uppercase mb-1">
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

                <p className="text-xs sm:text-sm text-[#A5A5A5] group-hover:text-[#F5F5F5]/80 mt-3 line-clamp-2 transition-colors duration-300">
                  {cat.desc}
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#A5A5A5]">
                  <span>DISCOVER PIECES</span>
                  <span className="text-[#FF6A00] group-hover:translate-x-1 transition-transform">
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
