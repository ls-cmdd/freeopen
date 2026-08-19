import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface SectionDiagnosisProps {
  lang: Language;
}

export const SectionDiagnosis: React.FC<SectionDiagnosisProps> = ({ lang }) => {
  const t = translations[lang].diagnosis;
  const isRtl = lang === 'ar';
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="diagnosis"
      className="relative w-full py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#050508] via-[#09090f] to-[#050508] overflow-hidden"
    >
      {/* Background Accent Grid / Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(circle, #00c853 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 sm:mb-20">
          <h2
            id="diagnosis-section-title"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#e8e8ed] tracking-tight mb-4"
          >
            {t.title}
          </h2>
          <div className="w-16 h-1 bg-[#00c853]/40 mx-auto rounded-full" />
        </div>

        {/* 2x2 Grid on Large Screens / 1x4 on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {t.cards.map((card, index) => (
            <div
              key={card.id}
              id={`diagnosis-card-${card.id}`}
              className={`group relative glass-panel rounded-[16px] p-7 sm:p-9 transition-all duration-400 glass-panel-hover flex flex-col justify-between overflow-hidden shadow-lg ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
                transitionProperty: 'opacity, transform, background-color, border-color',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDuration: '0.4s',
              }}
            >
              {/* Vertical Indicator Line (Left in Arabic / Right in English) */}
              <div
                className={`absolute top-0 bottom-0 w-[3px] transition-colors duration-400 bg-white/10 group-hover:bg-[#00c853] ${
                  isRtl ? 'left-0' : 'right-0'
                }`}
              />

              <div className="flex items-start justify-between mb-4">
                {/* Large Transparent Emerald Number */}
                <span className="text-4xl sm:text-5xl font-black font-mono tracking-tighter text-[#00c853]/35 group-hover:text-[#00c853]/80 transition-colors duration-400 select-none">
                  {card.number}
                </span>

                {/* Status Dot */}
                <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#00c853] transition-colors duration-400 mt-2" />
              </div>

              <div>
                {/* Short Headline */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#e8e8ed] group-hover:text-white transition-colors duration-300 mb-2.5">
                  {card.title}
                </h3>

                {/* Single Explanatory Line */}
                <p className="text-sm sm:text-base text-[#8a8a95] group-hover:text-[#b4b4c0] transition-colors duration-300 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
