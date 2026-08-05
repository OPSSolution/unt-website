import React from 'react';
import { CheckCircle2, Package, X } from 'lucide-react';
import { STEPS } from './quoteModalData';
import type { StepDirection } from './types';

interface Props {
  step: number;
  isSubmitted: boolean;
  onClose: () => void;
  setStep: (step: number) => void;
  setDirection: (direction: StepDirection) => void;
}

export function QuoteModalHeader({ step, isSubmitted, onClose, setStep, setDirection }: Props) {
  return (
    <div className="relative bg-gradient-to-b from-slate-50 to-white dark:from-[#0e1527] dark:to-[#0c1322] px-6 pt-5 pb-4 border-b border-slate-200/80 dark:border-slate-800 shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-lg shadow-emerald-600/25">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">Request a B2B Quote</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Direct factory pricing & custom import solutions</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/50 text-slate-400 hover:text-red-500 dark:hover:text-red-400 flex items-center justify-center transition-all duration-200 border border-slate-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {!isSubmitted && (
        <div className="flex items-center justify-center mt-4 space-x-2">
          {STEPS.map((item, index) => (
            <React.Fragment key={item.number}>
              <button
                type="button"
                onClick={() => {
                  if (item.number < step) {
                    setDirection('back');
                    setStep(item.number);
                  }
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 border ${
                  step === item.number
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20 scale-105'
                    : step > item.number
                      ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 cursor-pointer hover:bg-emerald-200 dark:hover:bg-emerald-900'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700'
                }`}
              >
                {step > item.number ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-current/20 flex items-center justify-center text-[10px]">{item.number}</span>
                )}
                <span>{item.label}</span>
              </button>
              {index < STEPS.length - 1 && (
                <div className={`w-6 h-px transition-colors duration-300 ${step > item.number ? 'bg-emerald-400' : 'bg-slate-200 dark:bg-slate-700'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

