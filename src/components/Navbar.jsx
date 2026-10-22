import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import InstagramIcon from './InstagramIcon';
import BrozaLogo from './BrozaLogo';

export default function Navbar({ cartCount = 0, onOpenCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        delay: 0.2
      })
      .from('.nav-item', {
        y: -20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7
      }, '-=0.5')
      .from('.nav-action', {
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6
      }, '-=0.4');
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'HOME', href: '#hero' },
    { label: 'SHOP', href: '#collection' },
    { label: 'COLLECTIONS', href: '#categories' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#newsletter' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-nav py-3.5 shadow-2xl shadow-black/80'
            : 'bg-transparent py-5 lg:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a 
              href="#hero" 
              onClick={(e) => handleLinkClick(e, '#hero')}
              className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF00A8] rounded-md"
              aria-label="BROZA Home"
            >
              <BrozaLogo variant={scrolled ? 'compact' : 'full'} size={scrolled ? 'sm' : 'md'} />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-8">
              {navLinks.map((link, idx) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="nav-item relative font-display text-xs lg:text-[13px] font-semibold tracking-[0.16em] text-[#A5A5A5] hover:text-[#F5F5F5] transition-colors duration-200 py-1.5 px-2 group"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-[#FF00A8] to-[#FF6A00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ))}
            </nav>

            {/* Right Action Icons: Bag & Mobile Menu Toggle */}
            <div className="flex items-center gap-3">
              {/* Instagram link badge */}
              <a
                href="https://www.instagram.com/broza.str/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-action hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium tracking-wider text-[#A5A5A5] hover:text-[#F5F5F5] border border-white/10 hover:border-[#FF00A8]/40 rounded-full bg-white/[0.02] hover:bg-white/[0.06] transition-all duration-200"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-[#FF00A8]" />
                <span>@broza.str</span>
              </a>

              {/* Shopping Bag Button */}
              <button
                type="button"
                onClick={onOpenCart}
                className="nav-action relative p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all duration-200 text-[#F5F5F5] group"
                aria-label={`Shopping bag with ${cartCount} items`}
              >
                <ShoppingBag className="w-5 h-5 text-[#F5F5F5] group-hover:scale-110 transition-transform duration-200" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-[#FF00A8] to-[#FF6A00] text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-full bg-white/[0.04] text-[#F5F5F5] border border-white/10 hover:border-white/20"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Navigation */}
      <div 
        className={`fixed inset-0 z-40 bg-[#0B0B0D]/95 backdrop-blur-2xl md:hidden transition-all duration-500 flex flex-col justify-between p-6 sm:p-8 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
        style={{ top: '64px' }}
      >
        <div className="pt-8 flex flex-col space-y-6">
          <p className="text-xs font-mono tracking-[0.25em] text-[#FF00A8] uppercase">
            // NAVIGATION DIRECTORY
          </p>
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-display text-3xl font-extrabold tracking-tight text-[#F5F5F5] hover:text-[#FF00A8] transition-colors flex items-center justify-between border-b border-white/10 pb-4"
            >
              <span>{link.label}</span>
              <span className="text-xs font-mono text-[#A5A5A5]">0{idx + 1}</span>
            </a>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#A5A5A5]">
            <span>FLAGSHIP: KANHANGAD, INDIA</span>
            <span className="text-[#FF6A00]">SINCE 2026</span>
          </div>

          <a
            href="https://www.instagram.com/broza.str/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gradient-to-r from-[#FF00A8] to-[#FF6A00] text-white font-display text-sm font-bold tracking-wider"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>FOLLOW @BROZA.STR</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </>
  );
}
