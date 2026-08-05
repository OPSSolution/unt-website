import React from 'react';
import { X } from 'lucide-react';
import { SourcingCalculator } from './SourcingCalculator';

interface QuickCalcModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModal: () => void;
}

export const QuickCalcModal: React.FC<QuickCalcModalProps> = ({
  isOpen,
  onClose,
  onOpenQuoteModal,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-300 dark:border-slate-700"
          aria-label="Close calculator modal"
        >
          <X className="w-5 h-5" />
        </button>

        <SourcingCalculator 
          onOpenQuoteModal={() => {
            onClose();
            onOpenQuoteModal();
          }} 
        />
      </div>
    </div>
  );
};
