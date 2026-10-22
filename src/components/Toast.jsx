import React, { useEffect } from 'react';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-60 max-w-sm w-full animate-slide-up">
      <div className="p-4 rounded-2xl bg-[#131316]/95 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF00A8] to-[#FF6A00] flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <p className="text-xs font-mono font-medium tracking-wide">
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-full text-[#A5A5A5] hover:text-white"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
