import { ArrowUp, MapPin, Globe, Sparkles, MessageSquare } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import BrozaLogo from './BrozaLogo';

export default function Footer({ onCategoryClick }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, href, catId) => {
    e.preventDefault();
    if (catId && onCategoryClick) {
      onCategoryClick(catId);
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#070709] border-t border-white/10 pt-20 pb-12 overflow-hidden text-[#A5A5A5]">
      {/* Subtle background ambient glow */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-[#FF00A8]/10 to-[#FF6A00]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <BrozaLogo variant="full" size="lg" />
            
            <p className="text-sm font-light text-[#A5A5A5] max-w-sm leading-relaxed">
              Premium unisex clothing and streetwear engineered with architectural silhouettes and heavyweight textiles. Designed to express who you are.
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#F5F5F5]">
                <MapPin className="w-3.5 h-3.5 text-[#FF6A00]" />
                <span>Flagship Studio: Kanhangad, Kerala, India</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#A5A5A5]">
                <Globe className="w-3.5 h-3.5 text-[#FF00A8]" />
                <span>All-India Express Delivery & Worldwide Shipping Available</span>
              </div>
            </div>

            {/* Instagram Link Badge */}
            <div className="pt-2">
              <a
                href="https://www.instagram.com/broza.str/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-[#FF00A8] text-xs font-mono text-[#F5F5F5] transition-all"
              >
                <InstagramIcon className="w-4 h-4 text-[#FF00A8]" />
                <span>Follow @broza.str on Instagram</span>
              </a>
            </div>
          </div>

          {/* Shop Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm tracking-widest uppercase text-[#F5F5F5]">
              SHOP COLLECTION
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <a 
                  href="#collection" 
                  onClick={(e) => handleNavClick(e, '#collection', 'tshirts')}
                  className="hover:text-[#FF00A8] transition-colors"
                >
                  Oversized Graphic Tees
                </a>
              </li>
              <li>
                <a 
                  href="#collection" 
                  onClick={(e) => handleNavClick(e, '#collection', 'hoodies')}
                  className="hover:text-[#FF00A8] transition-colors"
                >
                  Heavyweight 450GSM Hoodies
                </a>
              </li>
              <li>
                <a 
                  href="#collection" 
                  onClick={(e) => handleNavClick(e, '#collection', 'unisex')}
                  className="hover:text-[#FF00A8] transition-colors"
                >
                  Unisex Cargo & Trousers
                </a>
              </li>
              <li>
                <a 
                  href="#collection" 
                  onClick={(e) => handleNavClick(e, '#collection', 'all')}
                  className="hover:text-[#FF00A8] transition-colors"
                >
                  Drop 04 // All Releases
                </a>
              </li>
              <li>
                <a 
                  href="#hero" 
                  onClick={(e) => handleNavClick(e, '#hero')}
                  className="hover:text-[#FF00A8] transition-colors text-[#FF6A00]"
                >
                  SS26 Official Lookbook
                </a>
              </li>
            </ul>
          </div>

          {/* Brand & Studio Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-sm tracking-widest uppercase text-[#F5F5F5]">
              ABOUT BROZA
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => handleNavClick(e, '#about')}
                  className="hover:text-[#FF00A8] transition-colors"
                >
                  Brand Philosophy
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => handleNavClick(e, '#about')}
                  className="hover:text-[#FF00A8] transition-colors"
                >
                  Fabric & Craft (280-450 GSM)
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => handleNavClick(e, '#about')}
                  className="hover:text-[#FF00A8] transition-colors"
                >
                  Unisex Sizing Guide
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => handleNavClick(e, '#about')}
                  className="hover:text-[#FF00A8] transition-colors"
                >
                  Since 2026 Heritage
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Support & Orders (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-sm tracking-widest uppercase text-[#F5F5F5]">
              DIRECT ORDERS
            </h4>
            <p className="text-xs text-[#A5A5A5] leading-relaxed">
              Customers can place orders by sending a Direct Message to our Instagram account.
            </p>
            <a
              href="https://www.instagram.com/broza.str/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FF00A8] hover:text-[#FF6A00] transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>DM @broza.str →</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A5A5A5]/70">
          <div>
            © 2026 BROZA CLOTHING STORE. ALL RIGHTS RESERVED. KANHANGAD, KERALA.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">
              PRIVACY POLICY
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              TERMS OF SERVICE
            </span>
            
            {/* Back to top button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white transition-colors border border-white/10 hover:border-white/20"
              aria-label="Scroll back to top of page"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
