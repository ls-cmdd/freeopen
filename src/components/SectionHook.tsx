import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface SectionHookProps {
  lang: Language;
}

export const SectionHook: React.FC<SectionHookProps> = ({ lang }) => {
  const t = translations[lang].hook;

  const handleDiscoverClick = () => {
    const diagnosisEl = document.getElementById('diagnosis');
    if (diagnosisEl) {
      diagnosisEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hook"
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#050508] overflow-hidden px-4 sm:px-6 select-none"
      style={{ height: '100vh' }}
    >
      {/* Slow pulsing emerald atmospheric light in the top-right corner (4s cycle) */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[300px] sm:w-[500px] lg:w-[650px] h-[300px] sm:h-[500px] lg:h-[650px] rounded-full pointer-events-none blur-[90px] sm:blur-[140px] animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle at 75% 25%, rgba(0, 200, 83, 0.28) 0%, rgba(0, 200, 83, 0.08) 45%, rgba(5, 5, 8, 0) 75%)',
        }}
      />

      {/* Subtle secondary ambient glow in the bottom-left */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full pointer-events-none blur-[100px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0, 200, 83, 0.15) 0%, rgba(5, 5, 8, 0) 70%)',
        }}
      />

      {/* Center Sacred Space Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center justify-center">
        {/* Massive Headline in Cairo ExtraBold */}
        <h1
          id="hook-main-headline"
          className="font-black text-[#e8e8ed] tracking-tight leading-[1.08] mb-6"
          style={{
            fontSize: 'clamp(2.75rem, 7.5vw, 6.75rem)',
            fontWeight: 800,
          }}
        >
          {t.headline}
        </h1>

        {/* Single Subtitle Line in Light Gray */}
        <p
          id="hook-subline"
          className="text-[#8a8a95] text-base sm:text-lg md:text-xl lg:text-2xl font-medium max-w-3xl leading-relaxed mb-10 sm:mb-12"
        >
          {t.subline}
        </p>

        {/* Single Center Action Button */}
        <button
          id="hook-discover-button"
          onClick={handleDiscoverClick}
          className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-bold bg-[#00c853] text-[#050508] transition-all duration-400 cursor-pointer shadow-[0_0_20px_rgba(0,200,83,0.22)] hover:shadow-[0_0_40px_rgba(0,200,83,0.45)] hover:scale-[1.03] active:scale-[0.98] focus:outline-none"
          aria-label={t.cta}
        >
          {t.cta}
        </button>
      </div>

      {/* Minimalist Downward Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40 hover:opacity-80 transition-opacity pointer-events-none">
        <span className="text-[11px] text-[#8a8a95] tracking-wider uppercase font-medium">
          {t.scrollPrompt}
        </span>
        <svg
          className="w-4 h-4 text-[#8a8a95] animate-bounce"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};
