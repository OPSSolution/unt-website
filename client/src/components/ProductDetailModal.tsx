import React from 'react';
import { X, CheckCircle2, ShieldCheck, PackageCheck, Send, ExternalLink } from 'lucide-react';
import { Product } from '../types';
import { countryFlagUrl } from '../pages/products/data';
import { useLanguage } from '../i18n/LanguageContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenQuoteWithProduct: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenQuoteWithProduct,
}) => {
  const { language } = useLanguage();
  const isKm = language === 'km';

  if (!product) return null;
  const flagUrl = countryFlagUrl(product.origin, product.originFlag);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-slate-800 dark:text-slate-100 transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 text-slate-900 dark:text-white text-left">
          <div className="flex items-center space-x-3">
            <span className="w-9 h-7 flex items-center justify-center overflow-hidden rounded border border-slate-200 dark:border-slate-700">
              {flagUrl ? <img src={flagUrl} alt={`${product.origin} flag`} className="w-full h-full object-cover" /> : product.originFlag}
            </span>
            <div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                {product.origin} • {product.category}
              </span>
              <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white leading-tight">{product.name}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-100 text-left">
          {/* Main Visual & Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 aspect-video md:aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-4 bg-white dark:bg-slate-800"
              />
              {product.oemAvailable && (
                <div className="absolute top-3 left-3 px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-full shadow-md flex items-center space-x-1">
                  <PackageCheck className="w-3.5 h-3.5" />
                  <span>OEM Private Label Available</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{product.description}</p>

              {/* Trade Specs List */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-1.5">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Minimum Order (MOQ):</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">{product.moq}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-1.5">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Door-to-Door Lead Time:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{product.leadTime}</span>
                </div>
                {product.shelfLife && (
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Shelf Life Guarantee:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{product.shelfLife}</span>
                  </div>
                )}
              </div>

              {/* Certifications Badge Group */}
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                  Verified Audit Certifications
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.certifications.map((cert, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold rounded-lg">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Specifications */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Full Import & Compliance Specifications</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {product.specifications.map((spec, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <a
              href="https://ballangkmall.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-bold border border-slate-300 dark:border-slate-700 hover:border-emerald-500/40 transition-all flex items-center justify-center space-x-2 group shadow-sm"
            >
              <span>{isKm ? 'ទិញឥឡូវនេះ (Ballang KMall)' : 'Shop Now (Ballang KMall)'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition-colors shrink-0" />
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenQuoteWithProduct(product.name);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>Get Wholesale Quotation</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
