import React, { useEffect, useState } from 'react';
import type { QuoteRequestState } from '../types';
import { QuoteContactStep } from './quote-modal/QuoteContactStep';
import { QuoteDetailsStep } from './quote-modal/QuoteDetailsStep';
import { QuoteModalHeader } from './quote-modal/QuoteModalHeader';
import { QuoteNavigation } from './quote-modal/QuoteNavigation';
import { QuoteServiceStep } from './quote-modal/QuoteServiceStep';
import { QuoteSuccess } from './quote-modal/QuoteSuccess';
import type { StepDirection } from './quote-modal/types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
}

const initialFormData = (preselectedProduct?: string): QuoteRequestState => ({
  serviceType: preselectedProduct ? 'Wholesale Purchase' : 'Product Sourcing',
  productCategory: 'Food & Beverage',
  originPreference: 'Vietnam',
  estimatedVolume: '1,000 - 5,000 units',
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  notes: preselectedProduct ? `Inquiring regarding: ${preselectedProduct}` : '',
});

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, preselectedProduct }) => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<StepDirection>('forward');
  const [formData, setFormData] = useState<QuoteRequestState>(() => initialFormData(preselectedProduct));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) requestAnimationFrame(() => setAnimateIn(true));
    else setAnimateIn(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const goNext = () => {
    if (step >= 3) return;
    setDirection('forward');
    setStep((current) => current + 1);
  };

  const goBack = () => {
    if (step <= 1) return;
    setDirection('back');
    setStep((current) => current - 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const resetAndClose = () => {
    setAnimateIn(false);
    window.setTimeout(() => {
      setIsSubmitted(false);
      setStep(1);
      onClose();
    }, 250);
  };

  const stepProps = { formData, setFormData, direction };
  const progress = isSubmitted ? 100 : ((step - 1) / 3) * 100;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        animateIn ? 'bg-slate-950/70 backdrop-blur-lg' : 'bg-transparent backdrop-blur-none pointer-events-none'
      }`}
      onClick={resetAndClose}
    >
      <div
        className={`relative w-full max-w-2xl bg-white dark:bg-[#0c1322] border border-slate-200/80 dark:border-slate-800 rounded-[2rem] shadow-2xl shadow-emerald-900/10 dark:shadow-emerald-900/20 overflow-hidden max-h-[92vh] flex flex-col text-slate-800 dark:text-slate-100 transition-all duration-500 ${
          animateIn ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent pointer-events-none z-30" />
        <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 relative shrink-0 z-20">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-400 transition-all duration-700 ease-out rounded-r-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <QuoteModalHeader
          step={step}
          isSubmitted={isSubmitted}
          onClose={resetAndClose}
          setStep={setStep}
          setDirection={setDirection}
        />

        <div className="px-6 py-5 overflow-y-auto flex-1">
          {isSubmitted ? (
            <QuoteSuccess formData={formData} onClose={resetAndClose} />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              {step === 1 && <QuoteServiceStep {...stepProps} />}
              {step === 2 && <QuoteDetailsStep {...stepProps} />}
              {step === 3 && <QuoteContactStep {...stepProps} />}
              <QuoteNavigation
                step={step}
                isSubmitting={isSubmitting}
                onBack={goBack}
                onNext={goNext}
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
