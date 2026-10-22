import React, { useState, useEffect } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, CheckCircle } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

export default function CartDrawer({
  isOpen,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onShowToast
}) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 1999;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 99;
  const discountAmount = Math.round(subtotal * appliedDiscount);
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'BROZA10') {
      setAppliedDiscount(0.10);
      setPromoMessage('10% VIP discount applied!');
      if (onShowToast) onShowToast('VIP Code BROZA10 applied: 10% OFF');
    } else if (code === 'KANHANGAD') {
      setAppliedDiscount(0.15);
      setPromoMessage('15% Hometown exclusive discount applied!');
      if (onShowToast) onShowToast('Hometown Code applied: 15% OFF');
    } else {
      setPromoMessage('Invalid code. Try "BROZA10" or "KANHANGAD".');
    }
  };

  const handleCheckoutDemo = () => {
    setCheckoutModalOpen(true);
  };

  return (
    <>
      {/* Drawer Overlay */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Slide-out Panel */}
        <div 
          className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#111114] border-l border-white/10 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out z-10 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#FF00A8]" />
              <h2 className="font-display font-black text-lg text-[#F5F5F5] uppercase tracking-wider">
                SHOPPING BAG
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs font-mono text-white">
                {items.reduce((acc, curr) => acc + curr.quantity, 0)}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-[#A5A5A5] hover:text-white transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-3 bg-[#17171B] border-b border-white/5">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-[#A5A5A5]">
                {amountToFreeShipping === 0 ? (
                  <span className="text-[#FF6A00] font-bold">🎉 FREE ALL-INDIA SHIPPING UNLOCKED</span>
                ) : (
                  <>Add <span className="text-white font-bold">₹{amountToFreeShipping}</span> for Free Shipping</>
                )}
              </span>
              <span className="text-[#A5A5A5] font-mono">₹{freeShippingThreshold}</span>
            </div>
            
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#FF00A8] to-[#FF6A00] transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#A5A5A5]">
                <div className="w-16 h-16 rounded-full bg-white/[0.04] flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-[#A5A5A5]/60" />
                </div>
                <h3 className="font-display font-bold text-base text-[#F5F5F5] uppercase">
                  YOUR BAG IS EMPTY
                </h3>
                <p className="text-xs text-[#A5A5A5] max-w-xs mt-1 mb-6">
                  Explore our Drop 04 streetwear releases and build your aesthetic.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/15 text-xs font-display font-bold tracking-widest text-[#F5F5F5] uppercase transition-all"
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={`${item.product.id}-${item.color}-${item.size}`}
                  className="p-3.5 rounded-xl bg-[#17171B] border border-white/5 flex gap-3.5 items-center justify-between"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-20 object-cover rounded-lg bg-[#222] shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-bold text-sm text-[#F5F5F5] truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] font-mono text-[#A5A5A5] mt-0.5">
                      {item.color} • SIZE {item.size}
                    </p>
                    <p className="text-xs font-display font-bold text-[#FF00A8] mt-1">
                      ₹{item.product.price}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-white/15 rounded-md bg-white/[0.03]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.color, item.size, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#A5A5A5] hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-mono text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.color, item.size, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#A5A5A5] hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id, item.color, item.size)}
                        className="p-1 text-[#A5A5A5] hover:text-red-400 transition-colors ml-auto"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-[#0E0E11] space-y-4">
              
              {/* Promo code field */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code (e.g. BROZA10)"
                  className="flex-1 px-3 py-2 text-xs font-mono bg-[#17171B] border border-white/10 rounded-lg text-white placeholder-[#A5A5A5]/60 focus:outline-none focus:border-[#FF00A8]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 text-xs font-mono font-bold uppercase rounded-lg bg-white/10 hover:bg-white/20 text-white"
                >
                  APPLY
                </button>
              </form>
              {promoMessage && (
                <p className="text-[11px] font-mono text-[#FF6A00] pl-1">
                  {promoMessage}
                </p>
              )}

              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-[#A5A5A5]">
                  <span>SUBTOTAL</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#FF00A8]">
                    <span>DISCOUNT</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#A5A5A5]">
                  <span>ESTIMATED DELIVERY</span>
                  <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
                </div>

                <div className="pt-2 border-t border-white/10 flex justify-between text-base font-display font-black text-white">
                  <span>TOTAL (INR)</span>
                  <span className="gradient-accent-text">₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout demonstration button */}
              <button
                type="button"
                onClick={handleCheckoutDemo}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF00A8] to-[#FF6A00] text-white font-display text-sm font-bold tracking-widest uppercase hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#FF00A8]/20"
              >
                <span>DEMO CHECKOUT • ₹{total.toLocaleString()}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] font-mono text-center text-[#A5A5A5]">
                🔒 Static Frontend Demo. DM @broza.str to place real orders.
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Checkout Demo Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setCheckoutModalOpen(false)}
          />

          <div className="relative z-10 w-full max-w-lg p-6 sm:p-8 bg-[#131316] border border-white/20 rounded-3xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FF00A8] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>DEMO STORE CHECKOUT</span>
              </div>
              <button 
                type="button" 
                onClick={() => setCheckoutModalOpen(false)}
                className="p-1 rounded-full text-[#A5A5A5] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="font-display font-black text-2xl text-[#F5F5F5] uppercase">
                READY TO WEAR YOUR IDENTITY?
              </h3>
              <p className="text-xs text-[#A5A5A5] mt-1.5 leading-relaxed">
                As specified, this is a static frontend showcase for the BROZA streetwear brand. Real orders are handled exclusively via direct order messaging.
              </p>
            </div>

            {/* Order Summary Snapshot */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <div className="text-xs font-mono text-[#A5A5A5] flex justify-between">
                <span>ITEMS:</span>
                <span className="text-white">{items.length} unique styles</span>
              </div>
              <div className="text-xs font-mono text-[#A5A5A5] flex justify-between">
                <span>TOTAL ESTIMATE:</span>
                <span className="text-[#FF6A00] font-bold">₹{total.toLocaleString()}</span>
              </div>
              <div className="text-xs font-mono text-[#A5A5A5] flex justify-between">
                <span>FULFILLMENT LOCATION:</span>
                <span className="text-white">Kanhangad, Kerala, India</span>
              </div>
            </div>

            {/* Order via Instagram DM action */}
            <a
              href={`https://www.instagram.com/broza.str/?hl=en`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF00A8] to-[#FF6A00] text-white font-display text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:brightness-110 shadow-xl"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>SEND ORDER TO @BROZA.STR ON INSTAGRAM</span>
            </a>

            <button
              type="button"
              onClick={() => {
                onClearCart();
                setCheckoutModalOpen(false);
                onClose();
                if (onShowToast) onShowToast('Demo Order Simulated! Thank you for testing BROZA.');
              }}
              className="w-full py-3 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs font-mono tracking-wider text-[#A5A5A5] hover:text-white transition-all"
            >
              Simulate Complete & Clear Bag
            </button>
          </div>
        </div>
      )}
    </>
  );
}
