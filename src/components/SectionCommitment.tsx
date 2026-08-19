import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface SectionCommitmentProps {
  lang: Language;
}

export const SectionCommitment: React.FC<SectionCommitmentProps> = ({ lang }) => {
  const t = translations[lang].commitment;
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('free_internet_pledge');
    if (saved) {
      setIsSubmitted(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage(lang === 'ar' ? 'يرجى كتابة بريد إلكتروني صالح' : 'Please enter a valid email address');
      return;
    }

    setErrorMessage('');
    setIsSubmitted(true);
    try {
      localStorage.setItem('free_internet_pledge', email);
    } catch {
      // Local storage fallback
    }
  };

  return (
    <section
      id="commitment"
      className="relative w-full py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#050508] via-[#061009] to-[#021c0b] overflow-hidden"
    >
      {/* Background Emerald Ambient Pulse */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#00c853]/10 rounded-full blur-[160px] pointer-events-none"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 sm:mb-20">
          <h2
            id="commitment-section-title"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#e8e8ed] tracking-tight mb-4"
          >
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-[#8a8a95] font-medium max-w-xl mx-auto mb-4">
            {t.subtitle}
          </p>
          <div className="w-16 h-1 bg-[#00c853]/40 mx-auto rounded-full" />
        </div>

        {/* Commitment Content Box */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-[#00c853]/20 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Perks List (3 Points) */}
            <div className="md:col-span-5 space-y-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#00c853] mb-3">
                {lang === 'ar' ? 'ما ستحصل عليه فوراً:' : 'What you receive:'}
              </h3>
              <ul className="space-y-3.5">
                {t.perks.map((perk, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#e8e8ed]/90">
                    <span className="w-5 h-5 rounded-full bg-[#00c853]/15 text-[#00c853] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border border-[#00c853]/30">
                      ✓
                    </span>
                    <span className="leading-snug">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Form or Success State */}
            <div className="md:col-span-7 md:border-s md:border-white/10 md:ps-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <input
                        id="commitment-email-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.placeholder}
                        required
                        className="w-full px-5 py-4 rounded-xl bg-[#050508]/80 border border-white/10 text-[#e8e8ed] placeholder-white/30 text-sm sm:text-base focus:border-[#00c853] focus:ring-1 focus:ring-[#00c853] transition-all duration-200 outline-none"
                      />
                    </div>
                    {errorMessage && (
                      <p className="text-xs text-rose-400 font-medium ps-1">
                        {errorMessage}
                      </p>
                    )}
                  </div>

                  {/* Large Emerald Submit Button with Scale 1.02 on Hover */}
                  <button
                    id="commitment-submit-button"
                    type="submit"
                    className="w-full py-4 px-8 rounded-xl text-base sm:text-lg font-bold bg-[#00c853] text-[#050508] transition-all duration-400 cursor-pointer shadow-[0_0_20px_rgba(0,200,83,0.25)] hover:shadow-[0_0_40px_rgba(0,200,83,0.45)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {t.button}
                  </button>

                  {/* Anti-Spam Disclaimer */}
                  <p className="text-xs text-[#8a8a95] text-center pt-2 leading-relaxed">
                    {t.disclaimer}
                  </p>
                </form>
              ) : (
                /* Simple, quiet thank-you state without loud fanfare */
                <div
                  id="commitment-success-message"
                  className="bg-[#002812]/50 border border-[#00c853]/30 rounded-2xl p-6 sm:p-8 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#00c853]/20 border border-[#00c853]/40 text-[#00c853] flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-[#e8e8ed] mb-2">
                    {t.successTitle}
                  </h4>
                  <p className="text-sm text-[#8a8a95] leading-relaxed mb-4">
                    {t.successMessage}
                  </p>
                  <span className="inline-block text-xs font-mono font-medium text-[#00c853] bg-[#00c853]/10 px-3 py-1 rounded-full border border-[#00c853]/25">
                    {t.statusJoined}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
