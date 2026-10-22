import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Check, ShieldCheck, Sparkles, Ruler } from 'lucide-react';

export default function QuickViewModal({ product, isOpen, onClose, onAddToCart }) {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.name || '');
      setSelectedSize('M');
      setQuantity(1);
      setActiveImage(product.image);
    }
  }, [product]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0B0B0D]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-4xl bg-[#131316] border border-white/15 rounded-3xl overflow-hidden shadow-2xl my-8 flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Preview & Gallery Thumbnails */}
        <div className="md:w-1/2 p-6 bg-[#0E0E11] flex flex-col justify-between">
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#18181C]">
            <img
              src={activeImage || product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.tag && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-md text-[10px] font-mono font-bold tracking-widest uppercase bg-gradient-to-r from-[#FF00A8] to-[#FF6A00] text-white">
                {product.tag}
              </span>
            )}
          </div>

          {/* Gallery selector if multiple images */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex items-center gap-3 mt-4">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border transition-all ${
                    activeImage === img ? 'border-[#FF00A8] ring-2 ring-[#FF00A8]/30' : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Specs & Purchase Options */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#A5A5A5] mb-1">
              <span>{product.categoryLabel.toUpperCase()}</span>
              <span className="text-[#FF6A00] font-bold">SINCE 2026 // KANHANGAD</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-display text-[#F5F5F5] uppercase tracking-tight">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-3 my-3">
              <span className="text-3xl font-display font-black gradient-accent-text">
                {product.formattedPrice}
              </span>
              <span className="text-xs font-mono text-[#A5A5A5]">INCL. OF ALL TAXES</span>
            </div>

            <p className="text-xs sm:text-sm text-[#A5A5A5] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="mb-5">
              <label className="block text-xs font-mono text-[#F5F5F5] mb-2 uppercase tracking-wider">
                COLORWAY: <span className="text-[#FF00A8]">{selectedColor}</span>
              </label>
              <div className="flex items-center gap-2.5">
                {product.colors.map(col => (
                  <button
                    key={col.name}
                    type="button"
                    onClick={() => setSelectedColor(col.name)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                      selectedColor === col.name
                        ? 'border-[#FF00A8] bg-[#FF00A8]/10 text-white'
                        : 'border-white/15 bg-white/[0.02] text-[#A5A5A5] hover:border-white/30'
                    }`}
                  >
                    <span 
                      className="w-3 h-3 rounded-full border border-white/20 shrink-0" 
                      style={{ backgroundColor: col.hex }} 
                    />
                    <span>{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono text-[#F5F5F5] uppercase tracking-wider">
                  SELECT UNISEX SIZE
                </label>
                <span className="text-[11px] font-mono text-[#A5A5A5] flex items-center gap-1">
                  <Ruler className="w-3 h-3 text-[#FF6A00]" />
                  <span>TRUE TO OVERSIZED FIT</span>
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 rounded-xl text-xs font-display font-bold transition-all ${
                      selectedSize === size
                        ? 'bg-gradient-to-r from-[#FF00A8] to-[#FF6A00] text-white shadow-md'
                        : 'bg-white/[0.04] text-[#A5A5A5] hover:text-[#F5F5F5] border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-mono text-[#A5A5A5] uppercase tracking-wider">
                QUANTITY:
              </span>
              <div className="flex items-center border border-white/15 rounded-lg bg-white/[0.02]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-base text-[#F5F5F5] hover:text-[#FF00A8] transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-1 text-sm font-mono text-[#F5F5F5] border-x border-white/15">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-base text-[#F5F5F5] hover:text-[#FF00A8] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Product Details Bullet Points */}
            <div className="border-t border-white/10 pt-4 mb-6">
              <span className="text-[11px] font-mono tracking-wider text-[#A5A5A5] uppercase block mb-2">
                FABRIC & CRAFT SPECIFICATIONS:
              </span>
              <ul className="space-y-1.5 text-xs text-[#A5A5A5]">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#FF00A8]">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Add to Bag CTA Button */}
          <button
            type="button"
            onClick={handleAdd}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF00A8] to-[#FF6A00] text-white font-display text-sm font-bold tracking-widest uppercase hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#FF00A8]/20"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ADD TO BAG • ₹{product.price * quantity}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
