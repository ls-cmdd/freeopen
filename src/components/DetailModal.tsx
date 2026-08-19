import React, { useEffect, useRef } from 'react';
import { TimelineMilestone, Language } from '../types';
import { translations } from '../data/translations';

interface DetailModalProps {
  milestone: TimelineMilestone | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  milestone,
  isOpen,
  onClose,
  lang,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const t = translations[lang].modal;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !milestone) return null;

  return (
    <div
      id="timeline-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
    >
      <div
        ref={modalRef}
        id="timeline-detail-modal-content"
        tabIndex={-1}
        className="relative w-full max-w-2xl bg-[#0f0f14] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Accent Glow */}
        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#00c853]/20 rounded-full blur-3xl pointer-events-none"
        />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-[#00c853]/15 text-[#00c853] border border-[#00c853]/30">
              {milestone.stepNumber}
            </span>
            <h3
              id="modal-heading"
              className="text-xl sm:text-2xl font-extrabold text-[#e8e8ed]"
            >
              {milestone.modalContent.heading}
            </h3>
          </div>

          <button
            id="modal-close-button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-[#8a8a95] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label={t.close}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Subheading */}
        <p className="text-sm sm:text-base text-[#00c853] font-medium mb-6">
          {milestone.modalContent.subheading}
        </p>

        {/* In-depth details */}
        <div className="space-y-3 mb-8">
          {milestone.modalContent.details.map((detail, idx) => (
            <div key={idx} className="flex items-start gap-3 text-sm text-[#8a8a95] leading-relaxed">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00c853] mt-2 shrink-0" />
              <span>{detail}</span>
            </div>
          ))}
        </div>

        {/* Action Guide Box */}
        <div className="bg-[#050508] border border-[#00c853]/25 rounded-xl p-4 sm:p-5 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#00c853] uppercase tracking-wider mb-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            <span>{t.nextAction}</span>
          </div>
          <p className="text-sm font-medium text-[#e8e8ed] leading-relaxed">
            {milestone.modalContent.actionGuide}
          </p>
        </div>

        {/* Footer Button */}
        <div className="flex justify-end">
          <button
            id="modal-confirm-button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-bold bg-[#00c853] text-[#050508] hover:bg-[#00e676] transition-colors cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
