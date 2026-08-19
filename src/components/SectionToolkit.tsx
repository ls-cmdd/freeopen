import React, { useState } from 'react';
import { Language, ToolItem } from '../types';
import { translations } from '../data/translations';

interface SectionToolkitProps {
  lang: Language;
}

export const SectionToolkit: React.FC<SectionToolkitProps> = ({ lang }) => {
  const t = translations[lang].tools;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: t.filterAll },
    { id: 'storage', label: t.categories.storage },
    { id: 'communication', label: t.categories.communication },
    { id: 'productivity', label: t.categories.productivity },
    { id: 'design', label: t.categories.design },
    { id: 'browsing', label: t.categories.browsing },
  ];

  const filteredTools =
    selectedCategory === 'all'
      ? t.items
      : t.items.filter((item: ToolItem) => item.category === selectedCategory);

  return (
    <section
      id="tools"
      className="relative w-full py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#050508] overflow-hidden"
    >
      {/* Background Subtle Gradient */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#00c853]/5 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-14 sm:mb-18">
          <h2
            id="toolkit-section-title"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#e8e8ed] tracking-tight mb-4"
          >
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-[#8a8a95] font-medium max-w-xl mx-auto mb-4">
            {t.subtitle}
          </p>
          <div className="w-16 h-1 bg-[#00c853]/40 mx-auto rounded-full" />
        </div>

        {/* Filter Tabs Bar */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`tool-filter-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 cursor-pointer border ${
                selectedCategory === cat.id
                  ? 'bg-[#00c853] text-[#050508] border-[#00c853] shadow-[0_0_15px_rgba(0,200,83,0.3)]'
                  : 'bg-[#0f0f14] text-[#8a8a95] border-white/5 hover:text-[#e8e8ed] hover:border-white/15'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tools Grid (8-12 items, min-width 200px) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredTools.map((tool: ToolItem) => {
            const isHovered = hoveredTool === tool.id;

            return (
              <div
                key={tool.id}
                id={`tool-card-${tool.id}`}
                onMouseEnter={() => setHoveredTool(tool.id)}
                onMouseLeave={() => setHoveredTool(null)}
                className={`relative rounded-2xl p-6 transition-all duration-400 border flex flex-col justify-between overflow-hidden cursor-default min-h-[220px] ${
                  isHovered
                    ? 'bg-[#002410]/80 border-[#00c853]/40 shadow-[0_0_30px_rgba(0,200,83,0.18)] translate-y-[-3px]'
                    : 'bg-[#0f0f14] border-white/5 shadow-md'
                }`}
              >
                {/* Tool Name & Category */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <h3 className="text-base sm:text-lg font-bold text-[#e8e8ed]">
                      {tool.title}
                    </h3>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-white/5 text-[#8a8a95] border border-white/5">
                      {tool.license}
                    </span>
                  </div>

                  {/* Single Line Description */}
                  <p className="text-xs sm:text-sm text-[#8a8a95] leading-relaxed mb-6">
                    {tool.description}
                  </p>
                </div>

                {/* Bottom Row: Alternative on Hover & Protocol */}
                <div className="space-y-3 pt-3 border-t border-white/5">
                  {/* "Alternative to" Dynamic Badge */}
                  <div
                    className={`rounded-lg px-3 py-2 text-xs transition-all duration-300 flex items-center justify-between gap-2 ${
                      isHovered
                        ? 'bg-[#00c853]/20 text-[#00c853] font-bold border border-[#00c853]/30'
                        : 'bg-[#050508] text-[#8a8a95] border border-white/5'
                    }`}
                  >
                    <span className="text-[11px] text-[#8a8a95]">
                      {t.hoverAlternative}
                    </span>
                    <span className="font-semibold truncate">
                      {tool.alternativeTo}
                    </span>
                  </div>

                  {/* Open Standard Protocol Badge */}
                  <div className="flex items-center gap-1.5 text-xs text-[#00c853] font-mono font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00c853]" />
                    <span className="text-[11px] text-[#8a8a95]">{tool.protocol}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
