import React, { useState, useEffect, useRef } from 'react';
import { Language, TimelineMilestone } from '../types';
import { translations } from '../data/translations';
import { DetailModal } from './DetailModal';

interface SectionMapProps {
  lang: Language;
}

export const SectionMap: React.FC<SectionMapProps> = ({ lang }) => {
  const t = translations[lang].map;
  const isRtl = lang === 'ar';
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineMilestone | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the section has scrolled through the viewport
      const totalDist = rect.height + windowHeight;
      const currentDist = windowHeight - rect.top;
      const progress = Math.min(Math.max(currentDist / totalDist, 0), 1);
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = (milestone: TimelineMilestone) => {
    setSelectedMilestone(milestone);
    setIsModalOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      id="map"
      className="relative w-full py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#050508] via-[#08080d] to-[#050508] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-20 sm:mb-24">
          <h2
            id="map-section-title"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#e8e8ed] tracking-tight mb-4"
          >
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-[#8a8a95] font-medium max-w-xl mx-auto mb-4">
            {t.subtitle}
          </p>
          <div className="w-16 h-1 bg-[#00c853]/40 mx-auto rounded-full" />
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative">
          {/* Timeline Vertical Track */}
          <div
            className={`absolute top-0 bottom-0 w-[3px] bg-white/10 ${
              isRtl ? 'right-4 md:right-1/2 md:translate-x-1/2' : 'left-4 md:left-1/2 md:-translate-x-1/2'
            }`}
          >
            {/* Active Drawing Line based on Scroll Progress */}
            <div
              className="w-full bg-[#00c853] shadow-[0_0_12px_#00c853] transition-all duration-150 ease-out"
              style={{
                height: `${Math.min(scrollProgress * 120, 100)}%`,
              }}
            />
          </div>

          {/* Milestones List */}
          <div className="space-y-16 sm:space-y-24">
            {t.milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={milestone.id}
                  id={`milestone-${milestone.id}`}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isRtl
                      ? 'pr-12 md:pr-0'
                      : 'pl-12 md:pl-0'
                  } ${
                    isEven
                      ? isRtl
                        ? 'md:flex-row'
                        : 'md:flex-row-reverse'
                      : isRtl
                      ? 'md:flex-row-reverse'
                      : 'md:flex-row'
                  } gap-6 md:gap-12`}
                >
                  {/* Node Circle (24px) */}
                  <div
                    className={`absolute top-0 z-20 w-6 h-6 rounded-full border-2 border-[#00c853] bg-[#050508] flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(0,200,83,0.4)] hover:scale-125 transition-transform duration-300 ${
                      isRtl
                        ? 'right-1 md:right-1/2 md:translate-x-1/2'
                        : 'left-1 md:left-1/2 md:-translate-x-1/2'
                    }`}
                    onClick={() => openModal(milestone)}
                    title={milestone.title}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00c853]" />
                  </div>

                  {/* Card Content (Occupies half width on desktop) */}
                  <div
                    className={`w-full md:w-[calc(50%-2.5rem)] glass-panel rounded-2xl p-6 sm:p-8 glass-panel-hover transition-all duration-300 ${
                      isEven
                        ? isRtl
                          ? 'md:mr-auto'
                          : 'md:ml-auto'
                        : isRtl
                        ? 'md:ml-auto'
                        : 'md:mr-auto'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#00c853]/15 text-[#00c853] border border-[#00c853]/30">
                        {milestone.stepNumber}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#e8e8ed] mb-3">
                      {milestone.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#8a8a95] leading-relaxed mb-5">
                      {milestone.summary}
                    </p>

                    {/* Action Items with Green Checks */}
                    <ul className="space-y-2.5 mb-6">
                      {milestone.actionItems.map((action, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#e8e8ed]/90">
                          <span className="text-[#00c853] font-bold shrink-0 mt-0.5">✓</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Faint Learn More Link opening Modal */}
                    <button
                      onClick={() => openModal(milestone)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8a8a95] hover:text-[#00c853] transition-colors cursor-pointer group"
                    >
                      <span>{t.learnMore}</span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        {isRtl ? (
                          <line x1="19" y1="12" x2="5" y2="12" />
                        ) : (
                          <line x1="5" y1="12" x2="19" y2="12" />
                        )}
                        {isRtl ? (
                          <polyline points="12 19 5 12 12 5" />
                        ) : (
                          <polyline points="12 5 19 12 12 19" />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal Integration */}
      <DetailModal
        milestone={selectedMilestone}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lang={lang}
      />
    </section>
  );
};
