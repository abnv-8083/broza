import React, { useState, useEffect, useRef } from 'react';
import { Eye, ShoppingBag, Check, Sparkles, Filter } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS, CATEGORIES } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedCollection({ onQuickView, onAddToCart, activeCategoryFilter = 'all', onSelectCategory }) {
  const [selectedFilter, setSelectedFilter] = useState(activeCategoryFilter);
  const [selectedColors, setSelectedColors] = useState({});
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  // Sync prop changes to local filter
  useEffect(() => {
    setSelectedFilter(activeCategoryFilter);
  }, [activeCategoryFilter]);

  const handleFilterChange = (catId) => {
    setSelectedFilter(catId);
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
  };

  const filteredProducts = selectedFilter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedFilter);

  // GSAP ScrollTrigger Animation for the collection
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      });

      // Products staggered reveal
      const cards = gridRef.current?.querySelectorAll('.product-card');
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
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'all'
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedFilter]);

  const handleColorSelect = (productId, colorName) => {
    setSelectedColors(prev => ({
      ...prev,
      [productId]: colorName
    }));
  };

  return (
    <section 
      id="collection" 
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#0B0B0D] overflow-hidden border-t border-white/5"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#FF00A8]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#FF6A00]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-[0.2em] text-[#FF00A8] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CURATED RELEASE // DROP 04</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-[#F5F5F5] uppercase">
              THE NEW <span className="gradient-accent-text">STANDARD.</span>
            </h2>
            
            <p className="mt-3 text-base text-[#A5A5A5] max-w-xl font-normal">
              Engineered silhouettes with high-density combed cottons, drop shoulders, and unisex geometry. Every garment is cut for architectural presence.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleFilterChange(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium tracking-wider transition-all duration-200 ${
                  selectedFilter === cat.id
                    ? 'bg-gradient-to-r from-[#FF00A8] to-[#FF6A00] text-white shadow-md shadow-[#FF00A8]/20'
                    : 'bg-white/[0.03] text-[#A5A5A5] hover:text-[#F5F5F5] border border-white/10 hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredProducts.map((product) => {
            const activeColor = selectedColors[product.id] || product.colors[0]?.name;

            return (
              <div
                key={product.id}
                className="product-card group relative bg-[#131316] rounded-2xl overflow-hidden border border-white/10 hover:border-[#FF00A8]/40 transition-all duration-500 flex flex-col justify-between"
                data-cursor-text="VIEW PRODUCT"
              >
                {/* Product Image Area */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#18181C]">
                  
                  {/* Badge */}
                  <div className="absolute top-3.5 left-3.5 z-20 flex flex-col gap-1.5">
                    {product.tag && (
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-widest uppercase ${
                        product.tag === 'NEW DROP' 
                          ? 'bg-gradient-to-r from-[#FF00A8] to-[#FF6A00] text-white shadow-sm'
                          : product.tag === 'LIMITED'
                          ? 'bg-[#FF6A00]/90 text-white'
                          : 'bg-white/10 backdrop-blur-md text-[#F5F5F5] border border-white/15'
                      }`}>
                        {product.tag}
                      </span>
                    )}
                  </div>

                  {/* Fabric GSM Tag */}
                  <div className="absolute top-3.5 right-3.5 z-20">
                    <span className="backdrop-blur-md bg-black/60 border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-[#A5A5A5]">
                      {product.gsm.split(' ')[0]} {product.gsm.split(' ')[1]}
                    </span>
                  </div>

                  {/* Product Image with Hover Zoom */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Overlay gradient on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Quick Action Floating Bar on Hover */}
                  <div className="absolute inset-x-3 bottom-3 z-20 flex items-center gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      type="button"
                      onClick={() => onQuickView(product)}
                      className="flex-1 py-3 px-3 rounded-xl backdrop-blur-xl bg-[#0B0B0D]/90 hover:bg-[#0B0B0D] border border-white/20 text-[#F5F5F5] font-display text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg"
                      aria-label={`Quick view ${product.name}`}
                    >
                      <Eye className="w-3.5 h-3.5 text-[#FF00A8]" />
                      <span>QUICK VIEW</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onAddToCart(product, activeColor, 'M')}
                      className="p-3 rounded-xl bg-gradient-to-r from-[#FF00A8] to-[#FF6A00] text-white hover:brightness-110 shadow-lg"
                      aria-label={`Add ${product.name} to bag`}
                      title="Quick Add to Bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Product Metadata Area */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Category & Color indicators */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-mono tracking-widest uppercase text-[#A5A5A5]">
                        {product.categoryLabel}
                      </span>

                      {/* Interactive Color Swatches */}
                      <div className="flex items-center gap-1.5">
                        {product.colors.map(col => (
                          <button
                            key={col.name}
                            type="button"
                            onClick={() => handleColorSelect(product.id, col.name)}
                            title={col.name}
                            className={`w-3.5 h-3.5 rounded-full border transition-all ${
                              activeColor === col.name
                                ? 'scale-125 border-[#FF00A8] ring-1 ring-[#FF00A8]/50'
                                : 'border-white/20 hover:scale-110 opacity-70'
                            }`}
                            style={{ backgroundColor: col.hex }}
                            aria-label={`Select color ${col.name}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Product Title */}
                    <h3 
                      onClick={() => onQuickView(product)}
                      className="font-display text-lg font-bold text-[#F5F5F5] group-hover:text-[#FF00A8] transition-colors duration-200 cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    {/* Subtitle / Fit note */}
                    <p className="text-xs font-normal text-[#A5A5A5] mt-1 line-clamp-1">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Price & Add to Bag Trigger */}
                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono text-[#A5A5A5] block">PRICE (INR)</span>
                      <span className="text-xl font-display font-extrabold text-[#F5F5F5]">
                        {product.formattedPrice}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onQuickView(product)}
                      className="text-xs font-mono tracking-wider text-[#A5A5A5] hover:text-[#F5F5F5] underline underline-offset-4 decoration-white/20 hover:decoration-[#FF00A8]"
                    >
                      DETAILS →
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Editorial Callout */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-white/[0.02] to-white/[0.04] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-[#FF00A8]" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-[#F5F5F5]">
                ALL-INDIA EXPRESS DELIVERY & WORLDWIDE SHIPPING
              </h4>
              <p className="text-xs text-[#A5A5A5] mt-0.5">
                Every order dispatched within 24 hours from our Kanhangad, Kerala studio. Free shipping over ₹1,999.
              </p>
            </div>
          </div>

          <a
            href="https://www.instagram.com/broza.str/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 rounded-xl border border-white/20 hover:border-[#FF00A8] text-xs font-mono font-semibold tracking-wider text-[#F5F5F5] hover:bg-white/[0.05] transition-all"
          >
            DM TO ORDER ON INSTAGRAM →
          </a>
        </div>

      </div>
    </section>
  );
}
