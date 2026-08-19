export type Language = 'ar' | 'en';

export interface DiagnosisCard {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface PrincipleItem {
  id: string;
  title: string;
  description: string;
  svgPath: string;
}

export interface TimelineMilestone {
  id: string;
  stepNumber: string;
  title: string;
  summary: string;
  actionItems: string[];
  modalContent: {
    heading: string;
    subheading: string;
    details: string[];
    actionGuide: string;
  };
}

export interface ToolItem {
  id: string;
  title: string;
  category: 'storage' | 'communication' | 'productivity' | 'design' | 'browsing';
  description: string;
  alternativeTo: string;
  license: string;
  protocol: string;
}

export interface TestimonialItem {
  id: string;
  role: string;
  quote: string;
}

