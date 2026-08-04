import React, { useState } from 'react';
import { X, CheckCircle2, Send, Package } from 'lucide-react';
import { QuoteRequestState } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, preselectedProduct }) => {
  const [formData, setFormData] = useState<QuoteRequestState>({
    serviceType: preselectedProduct ? 'Wholesale Purchase' : 'Product Sourcing',
    productCategory: 'Food & Beverage',
    originPreference: 'Thailand',
    estimatedVolume: '1,000 - 5,000 units',
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    notes: preselectedProduct ? `Inquiring regarding: ${preselectedProduct}` : '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white p-6 border-b border-slate-200 flex items-center justify-between shrink-0 text-slate-900">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-slate-900">Request a B2B Sourcing Quote</h3>
              <p className="text-xs text-slate-500">Direct factory pricing & custom Cambodian import solutions</p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-display font-bold text-slate-900">Quote Request Received!</h4>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-slate-900">{formData.contactName || 'Valued Client'}</span>. Our trade specialists at UNT Company Phnom Penh HQ will review your parameters and provide a formal quotation within 24 business hours.
              </p>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left max-w-md mx-auto text-xs space-y-1 text-slate-600">
                <div><strong className="text-emerald-700">Service:</strong> {formData.serviceType}</div>
                <div><strong className="text-emerald-700">Category:</strong> {formData.productCategory}</div>
                <div><strong className="text-emerald-700">Target Origin:</strong> {formData.originPreference}</div>
                <div><strong className="text-emerald-700">Est. Volume:</strong> {formData.estimatedVolume}</div>
              </div>
              <button
                onClick={resetAndClose}
                className="mt-4 px-8 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md hover:bg-emerald-500 transition-all"
              >
                Return to Website
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              {/* Inquiry Type */}
              <div>
                <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                  1. Service / Inquiry Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Product Sourcing', 'OEM / Private Label', 'Wholesale Purchase', 'Sales Training'].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setFormData({ ...formData, serviceType: type })}
                      className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                        formData.serviceType === type
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-400 shadow-xs font-bold'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Category & Origin */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Product Category</label>
                  <select
                    value={formData.productCategory}
                    onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
                  >
                    <option value="Food & Beverage">Food & Beverage (F&B)</option>
                    <option value="Skincare & Beauty">Skincare & Cosmetics</option>
                    <option value="Personal Care">Personal Care & Hair</option>
                    <option value="Health Supplements">Health & Wellness Supplements</option>
                    <option value="Household Goods">Household Goods & Cleaners</option>
                    <option value="Other / Multi-Category">Other / Custom Category</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Preferred Origin</label>
                  <select
                    value={formData.originPreference}
                    onChange={(e) => setFormData({ ...formData, originPreference: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
                  >
                    <option value="Thailand">Thailand 🇹🇭</option>
                    <option value="South Korea">South Korea 🇰🇷</option>
                    <option value="Japan">Japan 🇯🇵</option>
                    <option value="Vietnam">Vietnam 🇻🇳</option>
                    <option value="China">China 🇨🇳</option>
                    <option value="Global / Lowest Cost">Global (Best Price Match)</option>
                  </select>
                </div>
              </div>

              {/* Estimated Volume */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Target Purchase Volume / MOQs</label>
                <select
                  value={formData.estimatedVolume}
                  onChange={(e) => setFormData({ ...formData, estimatedVolume: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
                >
                  <option value="Trial Batch (500 - 1,000 units)">Trial Batch (500 - 1,000 units)</option>
                  <option value="1,000 - 5,000 units">Medium Order (1,000 - 5,000 units)</option>
                  <option value="5,000 - 20,000 units">Large Wholesale (5,000 - 20,000 units)</option>
                  <option value="Full Container Load (FCL 20ft/40ft)">Full Container Load (FCL 20ft/40ft)</option>
                </select>
              </div>

              {/* Company & Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Company / Store Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Phnom Penh Retail Mart"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Contact Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Telegram / Phone Hotline *</label>
                  <input
                    type="text"
                    required
                    placeholder="+855 12 345 678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Specific Requirements / Product Specs</label>
                <textarea
                  rows={3}
                  placeholder="Mention target pricing, custom formulation needs, or packaging label details..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <span>Generating Official Quote...</span>
                ) : (
                  <>
                    <span>Submit Quote Request</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
