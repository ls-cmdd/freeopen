import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface SectionPrinciplesProps {
  lang: Language;
}

export const SectionPrinciples: React.FC<SectionPrinciplesProps> = ({ lang }) => {
  const t = translations[lang].principles;

  // Custom Inline SVG Icons
  const renderIcon = (id: string) => {
    switch (id) {
      case 'p-1': // Data in your hands / Shield Key
        return (
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
        );
      case 'p-2': // Software for all / Open Code & Sharing
        return (
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
            <line x1="14" y1="4" x2="10" y2="20" />
          </svg>
        );
      case 'p-3': // Decentralized web / Peer Mesh
        return (
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="3" />
            <circle cx="5" cy="19" r="3" />
            <circle cx="19" cy="19" r="3" />
            <line x1="12" y1="8" x2="6.5" y2="16.5" />
            <line x1="12" y1="8" x2="17.5" y2="16.5" />
            <line x1="8" y1="19" x2="16" y2="19" />
          </svg>
        );
      case 'p-4': // Attention reclaimed / Serene Sun & Focus
      default:
        return (
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        );
    }
  };

  return (
    <section
      id="principles"
      className="relative w-full py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#050508] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-20 sm:mb-24">
          <h2
            id="principles-section-title"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#e8e8ed] tracking-tight mb-4"
          >
            {t.title}
          </h2>
          <div className="w-16 h-1 bg-[#00c853]/40 mx-auto rounded-full" />
        </div>

        {/* 4 Large Circles Distributed Horizontally */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 text-center">
          {t.items.map((item) => (
            <div
              key={item.id}
              id={`principle-${item.id}`}
              className="flex flex-col items-center group cursor-default"
            >
              {/* Outer 120px Circle Container */}
              <div className="relative w-[120px] h-[120px] mb-8 flex items-center justify-center">
                {/* Slow Rotating Ring (20s cycle) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-dashed border-[#00c853]/40 animate-spin-slow group-hover:border-[#00c853] transition-colors duration-300"
                />

                {/* Inner Dark Emerald Circle (104px) */}
                <div className="relative w-[100px] h-[100px] rounded-full bg-[#002d13] border border-[#00c853]/30 flex items-center justify-center shadow-[0_0_25px_rgba(0,200,83,0.15)] group-hover:shadow-[0_0_35px_rgba(0,200,83,0.3)] group-hover:scale-105 transition-all duration-300">
                  {renderIcon(item.id)}
                </div>
              </div>

              {/* Title Underneath */}
              <h3 className="text-xl font-bold text-[#e8e8ed] group-hover:text-[#00c853] transition-colors duration-200 mb-3">
                {item.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-[#8a8a95] max-w-[240px] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
