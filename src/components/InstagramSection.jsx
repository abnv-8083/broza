import React, { useEffect, useRef } from 'react';
import { Heart, MessageCircle, ArrowUpRight } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { INSTAGRAM_POSTS } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

export default function InstagramSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tiles = gridRef.current?.querySelectorAll('.insta-tile');
      if (tiles && tiles.length > 0) {
        gsap.fromTo(
          tiles,
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
            stagger: 0.1,
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
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#0E0E11] overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-[0.2em] text-[#FF00A8] uppercase mb-3">
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>COMMUNITY LOOKBOOK // @BROZA.STR</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-[#F5F5F5] uppercase">
              FOLLOW THE <span className="gradient-accent-text">MOVEMENT.</span>
            </h2>

            <p className="mt-2 text-sm sm:text-base text-[#A5A5A5] font-normal">
              Discover our latest looks, behind-the-scenes fitting sessions, and community street styles.
            </p>
          </div>

          <a
            href="https://www.instagram.com/broza.str/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-[#FF00A8]/60 text-[#F5F5F5] font-display text-xs font-bold tracking-wider uppercase transition-all duration-300 group"
          >
            <InstagramIcon className="w-4 h-4 text-[#FF00A8] group-hover:scale-110 transition-transform" />
            <span>@broza.str</span>
            <ArrowUpRight className="w-4 h-4 text-[#A5A5A5] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        </div>

        {/* 6 Responsive Image Tiles */}
        <div 
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
        >
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://www.instagram.com/broza.str/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="insta-tile group relative aspect-square rounded-xl overflow-hidden bg-[#18181C] border border-white/10 hover:border-[#FF00A8]/50 transition-all duration-300 block shadow-lg"
              aria-label={`View Instagram post with ${post.likes} likes`}
            >
              <img
                src={post.image}
                alt="BROZA Instagram lookbook streetwear post"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                loading="lazy"
              />

              {/* Hover Overlay with Likes & Comments */}
              <div className="absolute inset-0 bg-[#0B0B0D]/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                <div className="flex justify-end">
                  <InstagramIcon className="w-4 h-4 text-[#FF00A8]" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-3 text-xs font-mono text-white">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-[#FF00A8] fill-[#FF00A8]" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 text-white" />
                      {post.comments}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#A5A5A5] line-clamp-2 leading-tight">
                    {post.caption}
                  </p>
                </div>
              </div>

            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
