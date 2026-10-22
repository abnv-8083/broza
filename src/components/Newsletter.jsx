import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';

export default function Newsletter({ onShowToast }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Client-side regex email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      if (onShowToast) {
        onShowToast('Subscribed! Welcome to the BROZA Inner Circle.');
      }
    }, 600);
  };

  const handleReset = () => {
    setEmail('');
    setSubmitted(false);
    setError('');
  };

  return (
    <section 
      id="newsletter" 
      className="relative py-24 sm:py-32 bg-[#0B0B0D] overflow-hidden border-t border-white/5"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-[#FF00A8]/10 to-[#FF6A00]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-[0.2em] text-[#FF6A00] uppercase mb-4">
          <Mail className="w-3.5 h-3.5" />
          <span>INNER CIRCLE DISPATCH</span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-[#F5F5F5] uppercase mb-4">
          STAY IN <span className="gradient-accent-text">THE LOOP.</span>
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg text-[#A5A5A5] max-w-xl mx-auto font-light leading-relaxed mb-8">
          Gain early 1-hour access to Drop 05, private sample sale invitations, and archival editorial lookbooks directly to your inbox.
        </p>

        {/* Email Signup Form */}
        <div className="max-w-md mx-auto">
          {submitted ? (
            <div className="p-6 rounded-2xl bg-[#131316] border border-[#FF00A8]/40 shadow-xl flex flex-col items-center animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-[#FF00A8]/20 flex items-center justify-center text-[#FF00A8] mb-3">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#F5F5F5] uppercase">
                WELCOME TO THE INNER CIRCLE
              </h3>
              <p className="text-xs text-[#A5A5A5] mt-1 text-center">
                You're now on the priority list for Drop 05. Check your inbox for our curated SS26 lookbook preview.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-4 text-xs font-mono text-[#FF6A00] hover:underline"
              >
                Sign up another email →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-3">
              <div className="relative flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your email address..."
                    className="w-full px-5 py-4 rounded-xl bg-[#131316] border border-white/15 focus:border-[#FF00A8] focus:outline-none focus:ring-1 focus:ring-[#FF00A8] text-sm text-[#F5F5F5] placeholder-[#A5A5A5]/60 transition-all font-sans"
                    aria-label="Email address for newsletter"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#FF00A8] to-[#FF6A00] text-white font-display text-xs font-bold tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 shrink-0 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>SUBSCRIBE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono text-left pl-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <p className="text-[11px] font-mono text-[#A5A5A5]/60">
                No spam. Unsubscribe at any time. We respect your privacy.
              </p>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
