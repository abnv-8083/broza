import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    // Disable on touch devices or small screens
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024;
    if (isTouch) return;

    setIsVisible(true);

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const xDot = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'power2.out' });
    const yDot = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'power2.out' });

    const xFollower = gsap.quickTo(follower, 'x', { duration: 0.25, ease: 'power2.out' });
    const yFollower = gsap.quickTo(follower, 'y', { duration: 0.25, ease: 'power2.out' });

    const onMouseMove = (e) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xFollower(e.clientX);
      yFollower(e.clientY);

      // Check if hovering an element with custom cursor text
      const target = e.target.closest('[data-cursor-text]');
      if (target) {
        const text = target.getAttribute('data-cursor-text');
        setCursorText(text);
        setIsHovered(true);
      } else {
        const clickable = e.target.closest('button, a, input, [role="button"]');
        if (clickable) {
          setCursorText('');
          setIsHovered(true);
        } else {
          setCursorText('');
          setIsHovered(false);
        }
      }
    };

    const onMouseLeave = () => {
      gsap.to([cursor, follower], { opacity: 0, duration: 0.2 });
    };

    const onMouseEnter = () => {
      gsap.to([cursor, follower], { opacity: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Central small dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-200 ${
          cursorText ? 'opacity-0' : 'w-2 h-2 bg-gradient-to-r from-[#FF00A8] to-[#FF6A00] opacity-90'
        }`}
      />

      {/* Outer Follower Circle */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border flex items-center justify-center transition-all duration-300 ${
          cursorText
            ? 'w-24 h-24 bg-gradient-to-r from-[#FF00A8]/80 to-[#FF6A00]/80 backdrop-blur-sm border-transparent shadow-xl shadow-[#FF00A8]/30 scale-100'
            : isHovered
            ? 'w-12 h-12 border-[#FF00A8] bg-[#FF00A8]/10 scale-110'
            : 'w-8 h-8 border-white/30 scale-100'
        }`}
      >
        {cursorText && (
          <span className="text-[10px] font-display font-black tracking-widest text-white text-center uppercase px-2 select-none">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
