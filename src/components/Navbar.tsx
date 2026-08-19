import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hook');
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);

      const sections = ['hook', 'diagnosis', 'principles', 'map', 'tools', 'community', 'commitment'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050508]/85 backdrop-blur-md border-b border-white/5 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          id="nav-brand-button"
          onClick={() => scrollTo('hook')}
          className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
          aria-label={t.brand}
        >
          <div className="w-8 h-8 rounded-full border border-[#00c853]/40 bg-[#00c853]/10 flex items-center justify-center text-[#00c853] transition-transform duration-300 group-hover:scale-105">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-[#e8e8ed] group-hover:text-[#00c853] transition-colors duration-200">
              {t.brand}
            </span>
            <span className="text-[10px] text-[#8a8a95] tracking-widest hidden sm:inline-block">
              {t.manifestoBadge}
            </span>
          </div>
        </button>

        {/* Quick Nav Links for Desktop */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0f0f14]/80 p-1 rounded-full border border-white/5" aria-label="Sections">
          <button
            id="nav-link-diagnosis"
            onClick={() => scrollTo('diagnosis')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer ${
              activeSection === 'diagnosis'
                ? 'bg-[#00c853]/15 text-[#00c853]'
                : 'text-[#8a8a95] hover:text-[#e8e8ed]'
            }`}
          >
            {t.diagnosis}
          </button>
          <button
            id="nav-link-principles"
            onClick={() => scrollTo('principles')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer ${
              activeSection === 'principles'
                ? 'bg-[#00c853]/15 text-[#00c853]'
                : 'text-[#8a8a95] hover:text-[#e8e8ed]'
            }`}
          >
            {t.principles}
          </button>
          <button
            id="nav-link-map"
            onClick={() => scrollTo('map')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer ${
              activeSection === 'map'
                ? 'bg-[#00c853]/15 text-[#00c853]'
                : 'text-[#8a8a95] hover:text-[#e8e8ed]'
            }`}
          >
            {t.map}
          </button>
          <button
            id="nav-link-tools"
            onClick={() => scrollTo('tools')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer ${
              activeSection === 'tools'
                ? 'bg-[#00c853]/15 text-[#00c853]'
                : 'text-[#8a8a95] hover:text-[#e8e8ed]'
            }`}
          >
            {t.tools}
          </button>
          <button
            id="nav-link-community"
            onClick={() => scrollTo('community')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer ${
              activeSection === 'community'
                ? 'bg-[#00c853]/15 text-[#00c853]'
                : 'text-[#8a8a95] hover:text-[#e8e8ed]'
            }`}
          >
            {t.community}
          </button>
        </nav>

        {/* Actions: Language Switch & Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="lang-toggle-button"
            onClick={onToggleLang}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0f0f14] border border-white/10 text-[#e8e8ed] hover:border-[#00c853]/40 hover:text-[#00c853] transition-all cursor-pointer"
            aria-label="Toggle language"
          >
            {t.langSwitch}
          </button>

          <button
            id="nav-join-button"
            onClick={() => scrollTo('commitment')}
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#00c853] text-[#050508] hover:bg-[#00e676] hover:shadow-[0_0_15px_rgba(0,200,83,0.35)] transition-all duration-200 cursor-pointer"
          >
            {t.commitment}
          </button>
        </div>
      </div>
    </header>
  );
};
