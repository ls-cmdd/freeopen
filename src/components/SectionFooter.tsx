import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface SectionFooterProps {
  lang: Language;
}

export const SectionFooter: React.FC<SectionFooterProps> = ({ lang }) => {
  const t = translations[lang].footer;
  const [copied, setCopied] = useState(false);

  const scrollTo = (target: string) => {
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyManifesto = () => {
    const textToCopy =
      lang === 'ar'
        ? `ميثاق نحو إنترنت حر:
إنترنتك ليس ملكك. كل نقرة تُسجَّل، كل كلمة تُحلَّل، كل ثانية تُباع.
المبادئ:
1. بياناتك في يدك - تحكّم كامل بما تنتج وتخزن، دون وصاية خادم وسيط.
2. برمجيات للجميع - أكواد شفافة تخضع للمراجعة، لا للأهواء التجارية.
3. شبكة لا مركزية - اتصال مباشر بين الأحرار، دون نقطة انقطاع مركزية.
4. انتباهك لك - أدوات تخدم أهدافك، وتصمت حين تنتهي منها.
هذا المشروع للإنسانية. لا حقوق محفوظة. انسخ، عدّل، انشر.`
        : `Towards a Free Internet Manifesto:
Your internet is not yours. Every click recorded, every word analyzed, every second sold.
Principles:
1. Data in your hands - Full control over what you create and store.
2. Software for all - Transparent code audited by humans.
3. Decentralized web - Direct peer connections without central surveillance.
4. Attention reclaimed - Tools that quietly serve your purpose.
This project belongs to humanity. No rights reserved. Copy, modify, distribute.`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer
      id="footer"
      className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#050508] border-t border-white/5 text-center relative z-10"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-6">
        {/* Central Timeless Statement */}
        <p
          id="footer-manifesto-statement"
          className="text-base sm:text-lg font-bold text-[#e8e8ed] tracking-wide"
        >
          {t.manifesto}
        </p>

        {/* Faint Text Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-[#8a8a95]">
          {t.links.map((link, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(link.target)}
              className="hover:text-[#00c853] transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={handleCopyManifesto}
            className="text-[#8a8a95] hover:text-[#00c853] transition-colors cursor-pointer flex items-center gap-1.5"
            title="Copy Manifesto"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <span>{copied ? (lang === 'ar' ? 'تم نسخ الميثاق' : 'Manifesto Copied') : (lang === 'ar' ? 'انسخ الميثاق' : 'Copy Manifesto')}</span>
          </button>
        </div>

        {/* Quiet Subtitle - No Year, No Brand Copyright */}
        <p className="text-xs text-[#8a8a95]/60 pt-2 font-mono">
          {t.copyNotice}
        </p>
      </div>
    </footer>
  );
};
