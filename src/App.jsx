import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeTicker from './components/MarqueeTicker';
import FeaturedCollection from './components/FeaturedCollection';
import BrandStatement from './components/BrandStatement';
import CategoryShowcase from './components/CategoryShowcase';
import CampaignBanner from './components/CampaignBanner';
import AboutBroza from './components/AboutBroza';
import InstagramSection from './components/InstagramSection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import CustomCursor from './components/CustomCursor';
import Toast from './components/Toast';
import Preloader from './components/Preloader';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([
    // Start with 1 default mock item so the bag isn't empty on first visit
    {
      product: {
        id: "broza-tee-01",
        name: "ACID VISION HEAVYWEIGHT TEE",
        subtitle: "280 GSM Boxy Drop-Shoulder Graphic",
        price: 999,
        formattedPrice: "₹999",
        category: "tshirts",
        categoryLabel: "Oversized Tees",
        image: "/images/product-acid-tee.jpg",
        isNewDrop: true,
        tag: "NEW DROP",
        gsm: "280 GSM Heavy Combed Cotton",
        colors: [
          { name: "Acid Black", hex: "#1A1A1D" },
          { name: "Vintage Charcoal", hex: "#2E2E33" },
          { name: "Bleached Chalk", hex: "#E8E6E1" }
        ],
        sizes: ["S", "M", "L", "XL", "XXL"]
      },
      color: "Acid Black",
      size: "L",
      quantity: 1
    }
  ]);

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Add to cart handler
  const handleAddToCart = (product, color = '', size = 'M', quantity = 1) => {
    const selectedColor = color || product.colors[0]?.name || 'Standard';

    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.color === selectedColor && item.size === size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, color: selectedColor, size, quantity }];
      }
    });

    setToastMessage(`Added "${product.name}" (${selectedColor} / ${size}) to Bag.`);
  };

  // Update item quantity
  const handleUpdateQuantity = (productId, color, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId, color, size);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId && item.color === color && item.size === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  // Remove item
  const handleRemoveItem = (productId, color, size) => {
    setCartItems(prev =>
      prev.filter(
        item => !(item.product.id === productId && item.color === color && item.size === size)
      )
    );
    setToastMessage('Item removed from Bag.');
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Quick view
  const handleOpenQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };

  // Filter selection
  const handleSelectCategory = (catId) => {
    setActiveCategoryFilter(catId);
  };

  // Smooth scroll triggers
  const handleExploreClick = () => {
    const el = document.querySelector('#collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDiscoverClick = () => {
    const el = document.querySelector('#about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F5F5F5] relative selection:bg-[#FF00A8] selection:text-white">
      {/* High-Fashion Initial Loading Sequence */}
      {isLoading && (
        <Preloader onComplete={() => setIsLoading(false)} />
      )}

      {/* Desktop Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Sticky Minimal Navigation */}
      <Navbar 
        cartCount={totalCartCount} 
        onOpenCart={() => setCartDrawerOpen(true)} 
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero 
          onExploreClick={handleExploreClick} 
          onDiscoverClick={handleDiscoverClick} 
        />

        {/* Marquee Ticker */}
        <MarqueeTicker />

        {/* Featured Collection Section ("THE NEW STANDARD.") */}
        <FeaturedCollection 
          onQuickView={handleOpenQuickView}
          onAddToCart={handleAddToCart}
          activeCategoryFilter={activeCategoryFilter}
          onSelectCategory={handleSelectCategory}
        />

        {/* Brand Statement ("NOT JUST CLOTHING. IT'S YOUR ATTITUDE.") */}
        <BrandStatement />

        {/* Shop by Category ("SHOP BY DISCIPLINE.") */}
        <CategoryShowcase 
          onSelectCategory={handleSelectCategory} 
        />

        {/* Campaign Banner ("THE NEXT DROP IS HERE") */}
        <CampaignBanner 
          onShopLatest={handleExploreClick} 
        />

        {/* About BROZA Section */}
        <AboutBroza />

        {/* Instagram Section ("FOLLOW THE MOVEMENT.") */}
        <InstagramSection />

        {/* Newsletter Section ("STAY IN THE LOOP.") */}
        <Newsletter 
          onShowToast={(msg) => setToastMessage(msg)} 
        />
      </main>

      {/* Footer */}
      <Footer 
        onCategoryClick={handleSelectCategory} 
        onReplayIntro={() => setIsLoading(true)}
      />

      {/* Interactive Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={handleCloseQuickView}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Bag Slide-Over Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onShowToast={(msg) => setToastMessage(msg)}
      />

      {/* Feedback Toast */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
