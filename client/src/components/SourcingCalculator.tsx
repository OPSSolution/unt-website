import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Truck, Clock, CheckCircle2 } from 'lucide-react';

interface SourcingCalculatorProps {
  onOpenQuoteModal: () => void;
  content: Record<string, any>;
}

export const SourcingCalculator: React.FC<SourcingCalculatorProps> = ({ onOpenQuoteModal, content }) => {
  const [category, setCategory] = useState('Food & Beverage');
  const [origin, setOrigin] = useState('Vietnam');
  const [quantity, setQuantity] = useState(5000);
  const [oemNeeded, setOemNeeded] = useState(false);

  // Estimations logic
  const getLeadTime = () => {
    let baseDays = 14;
    if (origin === 'South Korea' || origin === 'Japan') baseDays += 10;
    if (origin === 'China') baseDays += 7;
    if (oemNeeded) baseDays += 14;
    return `${baseDays} - ${baseDays + 7} Days`;
  };

  const getShippingMethod = () => {
    if (origin === 'Vietnam') return 'Cross-Border Overland Reefer & Express Trucking';
    return 'Ocean Freight (FCL/LCL) + Customs Clearance';
  };

  const getPermitsRequired = () => {
    const list = ['GDCE Import Filing', 'Khmer Multi-Lingual Labeling'];
    if (category === 'Food & Beverage') list.push('MoC Food Safety Permit', 'HACCP Audit Verification');
    if (category === 'Skincare & Beauty') list.push('Ministry of Health Product Notification', 'GMP Cosmetics Certificate');
    if (category === 'Health Supplements') list.push('MoH Supplement Import Permit', 'Lab Assay Analysis');
    return list;
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">{content.estimator_title ?? 'Interactive Sourcing Estimator'}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{content.estimator_desc ?? 'Calculate lead times, logistics, & Cambodian import permit requirements'}</p>
            </div>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-full">
            {content.estimator_badge ?? 'B2B Sourcing Tool'}
          </span>
        </div>

        {/* Form Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">{content.estimator_category_label ?? '1. Product Category'}</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-emerald-500"
            >
              <option value="Food & Beverage" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Food & Beverage (FMCG)</option>
              <option value="Skincare & Beauty" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Skincare & Cosmetics</option>
              <option value="Health Supplements" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Health & Dietary Supplements</option>
              <option value="Personal Care" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Personal Hygiene & Care</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">{content.estimator_origin_label ?? '2. Manufacturing Origin'}</label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-emerald-500"
            >
              <option value="South Korea" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">South Korea (Sea / Air Freight)</option>
              <option value="Japan" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Japan (Sea / Air Freight)</option>
              <option value="China" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">China (Sea Freight / Ports)</option>
              <option value="Vietnam" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Vietnam (Border Trucking)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">{content.estimator_volume_label ?? '3. Estimated Lot Volume'}</label>
            <input
              type="number"
              min="500"
              step="500"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center space-x-2 pt-1 text-left">
          <input
            type="checkbox"
            id="oemToggle"
            checked={oemNeeded}
            onChange={(e) => setOemNeeded(e.target.checked)}
            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
          />
          <label htmlFor="oemToggle" className="text-xs text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">
            {content.estimator_oem_label ?? 'Requires Turnkey OEM / Custom Brand Re-packaging (+14 Days R&D)'}
          </label>
        </div>

        {/* Dynamic Estimation Output Display Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-left">
          {/* Estimated Lead Time */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
              <Clock className="w-4 h-4" />
              <span>{content.estimator_lead_label ?? 'Est. Delivery Lead Time'}</span>
            </div>
            <div className="text-xl font-display font-bold text-slate-900 dark:text-white">{getLeadTime()}</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Includes factory build & customs release</div>
          </div>

          {/* Shipping Logistics Mode */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
              <Truck className="w-4 h-4" />
              <span>{content.estimator_route_label ?? 'Logistics Shipping Route'}</span>
            </div>
            <div className="text-xs font-bold text-slate-900 dark:text-white leading-snug">{getShippingMethod()}</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Door-to-door Phnom Penh delivery</div>
          </div>

          {/* Permits & Permits Required */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>{content.estimator_clearance_label ?? 'Ministry Clearances Secured'}</span>
            </div>
            <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300 font-medium">
              {getPermitsRequired().map((permit, idx) => (
                <li key={idx} className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">{permit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            {content.estimator_note ?? "Estimates based on Unique Noble Trading Co., Ltd.'s established trade lane frequencies."}
          </div>
          <button
            onClick={onOpenQuoteModal}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-2"
          >
            <span>{content.estimator_cta ?? 'Lock In Formal Quotation'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
