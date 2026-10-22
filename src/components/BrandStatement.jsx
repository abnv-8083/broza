import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Compass, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStatement() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const imageRef = useRef(null);
  const textBlockRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax movement for background image
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        },
        y: 60,
        scale: 1.05,
        ease: 'none'
      });

      // Headline entrance animation
      const lines = headlineRef.current?.querySelectorAll('.statement-line');
      if (lines && lines.length > 0) {
        gsap.fromTo(
          lines,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true
            },
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.9,
            ease: 'power3.out',
            clearProps: 'all'
          }
        );
      }

      // Text block entrance
      if (textBlockRef.current) {
        gsap.fromTo(
          textBlockRef.current,
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
      className="relative min-h-[90vh] py-28 sm:py-36 bg-[#0B0B0D] overflow-hidden flex items-center border-y border-white/5"
    >
      {/* Background Streetwear Editorial Visual with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          ref={imageRef}
          className="relative w-full h-[120%] -top-[10%] filter contrast-125 brightness-40"
        >
          <img
            src="/images/campaign-drop.jpg"
            alt="BROZA Brand Manifesto - Bold Streetwear Model with neon reflections"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
        {/* Dark film overlays */}
        <div className="absolute inset-0 bg-[#0B0B0D]/80 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0D] via-[#0B0B0D]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-[#0B0B0D]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono tracking-[0.25em] text-[#FF6A00] uppercase mb-6">
            <Zap className="w-3.5 h-3.5" />
            <span>THE BROZA MANIFESTO // 2026</span>
          </div>

          {/* Oversized Typography */}
          <div ref={headlineRef} className="space-y-1 sm:space-y-2 mb-8 sm:mb-12">
            <div className="overflow-hidden">
              <h2 className="statement-line text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-[#F5F5F5] uppercase leading-[0.95]">
                NOT JUST CLOTHING.
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2 className="statement-line text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight uppercase leading-[0.95] gradient-accent-text italic">
                IT'S YOUR ATTITUDE.
              </h2>
            </div>
          </div>

          {/* Editorial Paragraph */}
          <div ref={textBlockRef} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-6 border-t border-white/10">
            <div className="md:col-span-8">
              <p className="text-lg sm:text-xl text-[#F5F5F5] font-light leading-relaxed mb-4">
                BROZA was born out of a refusal to follow monotonous templates. We believe clothing is your rawest form of everyday self-expression — a personal armor crafted for uninhibited movement, unfiltered confidence, and genderless freedom.
              </p>
              <p className="text-sm sm:text-base text-[#A5A5A5] font-normal leading-relaxed">
                From our studio in Kanhangad, Kerala, every seam, heavyweight knit, and dropped shoulder is calibrated to give you unmatched comfort and timeless urban edge.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="block text-xs font-mono text-[#FF00A8] uppercase tracking-wider mb-1">
                  CORE TENET
                </span>
                <span className="text-sm font-display font-bold text-[#F5F5F5]">
                  Individuality over Conformity
                </span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="block text-xs font-mono text-[#FF6A00] uppercase tracking-wider mb-1">
                  ORIGIN
                </span>
                <span className="text-sm font-display font-bold text-[#F5F5F5]">
                  Kanhangad, Kerala, India
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
