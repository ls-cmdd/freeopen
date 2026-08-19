import { useState, useEffect } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { SectionHook } from './components/SectionHook';
import { SectionDiagnosis } from './components/SectionDiagnosis';
import { SectionPrinciples } from './components/SectionPrinciples';
import { SectionMap } from './components/SectionMap';
import { SectionToolkit } from './components/SectionToolkit';
import { SectionCommunity } from './components/SectionCommunity';
import { SectionCommitment } from './components/SectionCommitment';
import { SectionFooter } from './components/SectionFooter';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');

  useEffect(() => {
    // Update HTML root element attributes for proper RTL / LTR typography
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title =
      lang === 'ar'
        ? 'نحو إنترنت حر | ميثاق السيادة الرقمية'
        : 'Towards a Free Internet | Digital Sovereignty Manifesto';
  }, [lang]);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  return (
    <div className="min-h-screen bg-[#050508] text-[#e8e8ed] font-sans selection:bg-[#00c853] selection:text-[#050508] relative overflow-x-hidden">
      {/* Sticky Minimal Navigation */}
      <Navbar lang={lang} onToggleLang={handleToggleLang} />

      <main>
        {/* Section 1: The Hook (الفتحة - الصدمة اللطيفة) */}
        <SectionHook lang={lang} />

        {/* Section 2: The Diagnosis (التشخيص - لماذا نحن هنا) */}
        <SectionDiagnosis lang={lang} />

        {/* Section 3: The Principles (المبادئ - ماذا نريد) */}
        <SectionPrinciples lang={lang} />

        {/* Section 4: The Map (الخريطة - كيف نبدأ) */}
        <SectionMap lang={lang} />

        {/* Section 5: The Toolkit (الأدوات - ما الذي تستخدمه) */}
        <SectionToolkit lang={lang} />

        {/* Section 6: The Community (المجتمع - لست وحدك) */}
        <SectionCommunity lang={lang} />

        {/* Section 7: The Commitment (الانضمام - قرارك) */}
        <SectionCommitment lang={lang} />
      </main>

      {/* Section 8: The Footer (الخاتمة - الاستمرارية) */}
      <SectionFooter lang={lang} />
    </div>
  );
}
