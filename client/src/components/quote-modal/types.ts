import type React from 'react';
import type { QuoteRequestState } from '../../types';
import type { ContentLanguage } from '../../i18n/LanguageContext';

export type StepDirection = 'forward' | 'back';

export interface QuoteStepProps {
  formData: QuoteRequestState;
  setFormData: React.Dispatch<React.SetStateAction<QuoteRequestState>>;
  direction: StepDirection;
  language: ContentLanguage;
}

export const stepAnimation = (direction: StepDirection) =>
  direction === 'forward' ? 'animate-slideInRight' : 'animate-slideInLeft';

