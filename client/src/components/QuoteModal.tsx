import React, { useEffect, useState } from 'react';
import type { QuoteRequestState } from '../types';
import { QuoteContactStep } from './quote-modal/QuoteContactStep';
import { QuoteDetailsStep } from './quote-modal/QuoteDetailsStep';
import { QuoteModalHeader } from './quote-modal/QuoteModalHeader';
import { QuoteNavigation } from './quote-modal/QuoteNavigation';
import { QuoteServiceStep } from './quote-modal/QuoteServiceStep';
import { QuoteSuccess } from './quote-modal/QuoteSuccess';
import type { StepDirection } from './quote-modal/types';
import { useLanguage } from '../i18n/LanguageContext';
import { API_BASE } from '../lib/apiBase';
import { api } from '../admin/api';
import type { QuoteFormContent } from './quote-modal/quoteModalData';

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
  const { language, setLanguage } = useLanguage();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<StepDirection>('forward');
  const [formData, setFormData] = useState<QuoteRequestState>(() => initialFormData(preselectedProduct));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [content, setContent] = useState<QuoteFormContent>({});
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormData(preselectedProduct));
      requestAnimationFrame(() => setAnimateIn(true));
    } else {
      setAnimateIn(false);
    }
  }, [isOpen, preselectedProduct]);

  useEffect(() => {
    if (!isOpen) return;
    api.getHomepageSection('quote_form')
      .then((result) => setContent(result.data ?? {}))
      .catch(() => setContent({}));
  }, [isOpen, language]);

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch(`${API_BASE}/api/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, language }),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || 'Unable to submit quote request.');
      }
      setIsSubmitted(true);
    } catch (error) {
      console.error('Quote submission error:', error);
      setSubmitError(language === 'km'
        ? 'មិនអាចផ្ញើសំណើបានទេ។ សូមព្យាយាមម្តងទៀត។'
        : 'Unable to send your quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
          language={language}
          content={content}
          onToggleLanguage={setLanguage}
        />

        <div className="px-6 py-5 overflow-y-auto flex-1">
          {isSubmitted ? (
            <QuoteSuccess formData={formData} onClose={resetAndClose} language={language} />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              {step === 1 && <QuoteServiceStep {...stepProps} language={language} content={content} />}
              {step === 2 && <QuoteDetailsStep {...stepProps} language={language} content={content} />}
              {step === 3 && <QuoteContactStep {...stepProps} language={language} content={content} />}
              {submitError && <div role="alert" className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">{submitError}</div>}
              <QuoteNavigation
                step={step}
                isSubmitting={isSubmitting}
                onBack={goBack}
                onNext={goNext}
                language={language}
                content={content}
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
