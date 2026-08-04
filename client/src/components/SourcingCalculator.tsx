import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Truck, Clock, CheckCircle2 } from 'lucide-react';

interface SourcingCalculatorProps {
  onOpenQuoteModal: () => void;
}

export const SourcingCalculator: React.FC<SourcingCalculatorProps> = ({ onOpenQuoteModal }) => {
  const [category, setCategory] = useState('Food & Beverage');
  const [origin, setOrigin] = useState('Thailand');
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
    if (origin === 'Thailand' || origin === 'Vietnam') return 'Cross-Border Overland Reefer & Express Trucking';
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
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-slate-800">
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-slate-900">Interactive Sourcing Estimator</h3>
              <p className="text-xs text-slate-500">Calculate lead times, logistics, & Cambodian import permit requirements</p>
            </div>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-full">
            B2B Sourcing Tool
          </span>
        </div>

        {/* Form Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">1. Product Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
            >
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Skincare & Beauty">Skincare & Cosmetics</option>
              <option value="Health Supplements">Health & Wellness</option>
              <option value="Personal Care">Personal Care & Hair</option>
              <option value="Household Goods">Household Goods</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">2. Target Country of Origin</label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
            >
              <option value="Thailand">Thailand 🇹🇭</option>
              <option value="Vietnam">Vietnam 🇻🇳</option>
              <option value="South Korea">South Korea 🇰🇷</option>
              <option value="Japan">Japan 🇯🇵</option>
              <option value="China">China 🇨🇳</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              3. Target Units ({quantity.toLocaleString()} units)
            </label>
            <input
              type="range"
              min={500}
              max={50000}
              step={500}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>500 (Trial)</span>
              <span>25,000</span>
              <span>50,000+ (FCL)</span>
            </div>
          </div>
        </div>

        {/* OEM Toggle Check */}
        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
          <input
            type="checkbox"
            id="oemToggle"
            checked={oemNeeded}
            onChange={(e) => setOemNeeded(e.target.checked)}
            className="w-4 h-4 text-emerald-600 rounded border-slate-300 bg-white focus:ring-emerald-500"
          />
          <label htmlFor="oemToggle" className="text-xs text-slate-700 cursor-pointer select-none">
            Include <strong className="text-emerald-700">Custom OEM Formulation & Private Label Packaging</strong> (+14 days sampling/tooling)
          </label>
        </div>

        {/* Estimation Results Panel */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 via-emerald-50/40 to-emerald-100/30 border border-emerald-200 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Est. Door-to-Door Lead Time</span>
            </div>
            <div className="text-xl font-display font-bold text-slate-900 mt-1">{getLeadTime()}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Includes factory prep & customs clearance</div>
          </div>

          <div>
            <div className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider flex items-center space-x-1">
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Recommended Freight Route</span>
            </div>
            <div className="text-xs font-bold text-slate-900 mt-1 leading-snug">{getShippingMethod()}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Delivered directly to Phnom Penh warehouse</div>
          </div>

          <div>
            <div className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Compliance Documents Managed</span>
            </div>
            <ul className="text-[11px] text-emerald-800 mt-1 space-y-0.5 font-medium">
              {getPermitsRequired().map((item, idx) => (
                <li key={idx} className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span className="truncate">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Estimates based on UNT Company's established trade lane frequencies.
          </div>
          <button
            onClick={onOpenQuoteModal}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-2"
          >
            <span>Lock In Formal Quotation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
