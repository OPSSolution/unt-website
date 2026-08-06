export interface Advantage {
  title: string;
  desc: string;
  icon: string;
}

export interface NetworkHub {
  flags: string;
  title: string;
  desc: string;
}

export type AboutPageData = Record<string, any> & {
  advantages: Advantage[];
  network_hubs: NetworkHub[];
};

const advantageIcons = ['ShieldCheck', 'Building2', 'Truck', 'Users'] as const;

export const DEFAULTS = {
  badge: 'About UNT Company', headline: 'The Bridge to Global Trade',
  subheadline: 'Unique Noble Trading Co., Ltd. (UNT Company) is a premier Cambodian trading, sourcing, OEM manufacturing, and commercial capacity building ecosystem headquartered in Phnom Penh.',
  mission_badge: 'Our Purpose & Mission', mission_heading: 'Connecting World-Class Manufacturers with Emerging ASEAN Markets',
  mission_p1: 'Founded with the vision of modernizing Cambodian import commerce, UNT Company acts as an essential catalyst for local retailers, pharmacy chains, FMCG distributors, and brand owners.',
  mission_p2: 'Our dual focus on physical distribution and commercial training ensures that our clients not only secure top-tier products, but also possess the negotiation and sales capabilities required to achieve market leadership.',
  mission_image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop',
  hq_label: 'Phnom Penh Corporate Headquarters', hq_address: 'Phnom Penh Tower, Monivong Blvd, Doun Penh, Phnom Penh',
  stat1_value: '100%', stat1_label: 'Regulatory & Tax Audit Compliant', stat2_value: '1,200+', stat2_label: 'Trade & Sales Professionals Trained',
  adv_badge: 'Why Business Leaders Choose UNT', adv_heading: 'The UNT Advantage',
  adv1_title: 'Direct Factory Audit', adv1_desc: 'We physically audit ISO and GMP facilities across Thailand, Vietnam, Korea, Japan, and China.',
  adv3_title: 'Cold Chain & Logistics', adv3_desc: 'Temperature-monitored reefer trucking and Phnom Penh warehousing protect delicate products.',
  adv4_title: 'Sales & Capacity Building', adv4_desc: 'We train client commercial teams in consultative selling, buyer psychology, and key account growth.',
  net_badge: 'Strategic Infrastructure', net_heading: 'Our Global Network & Operations Hubs',
  net_sub: 'Local presence in key manufacturing capitals ensures rapid sampling, immediate factory audits, and direct supplier oversight.',
  hub1_flags: '🇹🇭 🇻🇳', hub1_title: 'Bangkok & Ho Chi Minh Corridors', hub1_desc: 'Cross-border overland logistics hub for rapid F&B, organic coconut water, teas, and household consumer product shipments into Cambodia.',
  hub2_flags: '🇰🇷 🇯🇵', hub2_title: 'Seoul & Tokyo OEM Laboratories', hub2_desc: 'Access to audited GMP cosmetics laboratories and health supplement formulators for premium skincare lines.',
  hub3_flags: '🇨🇳 🇰🇭', hub3_title: 'Guangzhou & Phnom Penh Central', hub3_desc: 'Bulk manufacturing, custom eco packaging, and central distribution warehouse in Phnom Penh.',
  cta: 'Partner with UNT Company',
};

const text = (source: Record<string, unknown>, key: string) =>
  typeof source[key] === 'string' ? source[key] as string : DEFAULTS[key as keyof typeof DEFAULTS] ?? '';

export const normalizeAboutData = (source: Record<string, unknown>): AboutPageData => ({
  ...DEFAULTS,
  ...source,
  advantages: Array.isArray(source.advantages)
    ? source.advantages as Advantage[]
    : [1, 2, 3, 4].map((number, index) => ({
        title: text(source, `adv${number}_title`), desc: text(source, `adv${number}_desc`), icon: advantageIcons[index],
      })),
  network_hubs: Array.isArray(source.network_hubs)
    ? source.network_hubs as NetworkHub[]
    : [1, 2, 3].map((number) => ({
        flags: text(source, `hub${number}_flags`), title: text(source, `hub${number}_title`), desc: text(source, `hub${number}_desc`),
      })),
});

export const ABOUT_TABS = ['Header', 'Mission', 'Advantages', 'Network'] as const;
export type AboutTab = typeof ABOUT_TABS[number];
