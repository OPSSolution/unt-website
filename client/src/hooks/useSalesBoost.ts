import { useState, useCallback } from 'react';
import type { HeroStatItem } from '../components/HeroAnimatedCounter';

export interface SalesDeal {
  id: string;
  title: string;
  amount: string;
  location: string;
  timeAgo: string;
}

export const SALES_METRICS: HeroStatItem[] = [
  { id: 'reseller_margin', value: '24.5%', label: 'Avg Dealer Resale Margin', sort_order: 1 },
  { id: 'closed_sales', value: '$1.4M+', label: 'Monthly Closed Deals', sort_order: 2 },
  { id: 'trained_reps', value: '1,200+', label: 'Trained Sales Representatives', sort_order: 3 },
  { id: 'active_leads', value: '420+', label: 'Active Reseller Lead Pipeline', sort_order: 4 },
];

export const RECENT_SALES_DEALS: SalesDeal[] = [
  { id: 'deal-1', title: 'Wholesale Solar Inverters (2,500 units)', amount: '$34,500', location: 'Battambang Dealer', timeAgo: '3m ago' },
  { id: 'deal-2', title: 'Premium Construction Hardware Batch', amount: '$18,200', location: 'Phnom Penh Hub', timeAgo: '8m ago' },
  { id: 'deal-3', title: 'Commercial LED Lighting Contract', amount: '$12,800', location: 'Siem Reap Wholesale', timeAgo: '14m ago' },
  { id: 'deal-4', title: 'Industrial Machinery & Spare Parts', amount: '$45,000', location: 'Sihanoukville Port Hub', timeAgo: '22m ago' },
];

export function useSalesBoost() {
  const [salesMetrics] = useState<HeroStatItem[]>(SALES_METRICS);
  const [recentDeals] = useState<SalesDeal[]>(RECENT_SALES_DEALS);

  const calculateResaleProfit = useCallback((costAmount: number, targetMarginPercent = 24.5) => {
    if (isNaN(costAmount) || costAmount <= 0) return { profit: 0, totalRevenue: 0 };
    const profit = costAmount * (targetMarginPercent / 100);
    const totalRevenue = costAmount + profit;
    return {
      profit: Math.round(profit),
      totalRevenue: Math.round(totalRevenue),
    };
  }, []);

  return {
    salesMetrics,
    recentDeals,
    calculateResaleProfit,
  };
}
