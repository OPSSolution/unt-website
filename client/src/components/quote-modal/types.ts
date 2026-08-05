import type React from 'react';
import type { QuoteRequestState } from '../../types';

export type StepDirection = 'forward' | 'back';

export interface QuoteStepProps {
  formData: QuoteRequestState;
  setFormData: React.Dispatch<React.SetStateAction<QuoteRequestState>>;
  direction: StepDirection;
}

export const stepAnimation = (direction: StepDirection) =>
  direction === 'forward' ? 'animate-slideInRight' : 'animate-slideInLeft';

