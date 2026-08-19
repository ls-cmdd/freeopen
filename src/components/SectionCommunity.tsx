import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface SectionCommunityProps {
  lang: Language;
}

export const SectionCommunity: React.FC<SectionCommunityProps> = ({ lang }) => {
  const t = translations[lang].community;
  const sectionRef = useRef<HTMLElement>(null);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Counter Animation with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const target = t.counterNumber;
          const duration = 2200; // ms
          const startTime = performance.now();

          const updateCounter = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeProgress * target));

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, t.counterNumber]);

  // Testimonials Auto-rotation (every 5 seconds) with Cross-Fade
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonialIdx((prev) => (prev + 1) % t.testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [t.testimonials.length]);

  return (
    <section
      ref={sectionRef}
      id="community"
      className="relative w-full py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#050508] via-[#090910] to-[#050508] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 sm:mb-20">
          <h2
            id="community-section-title"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#e8e8ed] tracking-tight mb-4"
          >
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-[#8a8a95] font-medium max-w-xl mx-auto mb-4">
            {t.subtitle}
          </p>
          <div className="w-16 h-1 bg-[#00c853]/40 mx-auto rounded-full" />
        </div>

        {/* Counter + Rotating Testimonial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Live Counter Box (5 Cols) */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-8 sm:p-10 flex flex-col justify-center text-center items-center shadow-xl border border-white/5 relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-radial from-[#00c853]/10 to-transparent pointer-events-none"
            />
            <span
              id="community-live-counter"
              className="text-5xl sm:text-6xl md:text-7xl font-black font-mono text-[#00c853] tracking-tighter mb-3 drop-shadow-[0_0_20px_rgba(0,200,83,0.3)]"
            >
              +{count.toLocaleString()}
            </span>
            <p className="text-base sm:text-lg text-[#e8e8ed] font-medium">
              {t.counterSuffix}
            </p>
            <div className="flex items-center gap-2 mt-4 text-xs font-mono text-[#8a8a95]">
              <span className="w-2 h-2 rounded-full bg-[#00c853] animate-ping" />
              <span>حركة حية مستمرة</span>
            </div>
          </div>

          {/* Cross-fade Testimonials Box (7 Cols) */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-8 sm:p-10 flex flex-col justify-between shadow-xl border border-white/5 relative overflow-hidden min-h-[240px]">
            {/* Quote Icon */}
            <svg
              className="w-10 h-10 text-[#00c853]/20 mb-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            {/* Testimonials List with Fade */}
            <div className="relative min-h-[90px] mb-4">
              {t.testimonials.map((item, idx) => {
                const isActive = idx === activeTestimonialIdx;
                return (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <p className="text-base sm:text-lg text-[#e8e8ed] font-medium leading-relaxed mb-3 italic">
                      "{item.quote}"
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#00c853] bg-[#00c853]/10 px-2.5 py-1 rounded-md border border-[#00c853]/20">
                        {item.role}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2 pt-4 border-t border-white/5">
              {t.testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonialIdx(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeTestimonialIdx
                      ? 'w-8 bg-[#00c853]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
