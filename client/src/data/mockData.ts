import { Product, Article, TrainingTrack, PartnerLogo } from '../types';

export const PARTNERS: PartnerLogo[] = [
  { id: '1', name: 'Mekong Agri Commodities', category: 'Food & Beverage', country: 'Vietnam', logoText: 'MEKONG AGRI' },
  { id: '2', name: 'Kyoto Bio Botanicals', category: 'Skincare & Cosmetics', country: 'Japan', logoText: 'KYOTO BIO' },
  { id: '3', name: 'Mekong FMCG Direct', category: 'Household Goods', country: 'Vietnam', logoText: 'MEKONG FMCG' },
  { id: '4', name: 'Seoul Health Labs', category: 'Health Supplements', country: 'South Korea', logoText: 'SEOUL LABS' },
  { id: '5', name: 'Guangzhou OEM Alliance', category: 'Packaging & Manufacturing', country: 'China', logoText: 'GZ OEM' },
  { id: '6', name: 'ASEAN Express Logistics', category: 'Cold Chain & Freight', country: 'Regional', logoText: 'ASEAN LOGISTICS' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: '100% Pure Organic Coconut Water (Tetra Pak)',
    category: 'Food & Beverage',
    origin: 'Vietnam',
    originFlag: '🇻🇳',
    moq: '500 Cartons (12,000 units)',
    leadTime: '14 - 21 Days',
    image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?q=80&w=1000&auto=format&fit=crop',
    description: 'NFC (Not From Concentrate) organic young coconut water packed with natural electrolytes, no added sugar, certified for ASEAN distribution.',
    oemAvailable: true,
    specifications: [
      'Volume: 330ml / 500ml / 1L Tetra Pak',
      'Ingredients: 99.9% Young Coconut Water, 0.1% Vitamin C',
      'Certifications: ISO 22000, HACCP, Halal, USDA Organic',
      'Packaging: Master Carton of 24 Packs'
    ],
    certifications: ['HACCP', 'ISO 22000', 'Halal', 'USDA Organic'],
    shelfLife: '18 Months'
  },
  {
    id: 'prod-2',
    name: 'Advanced Botanical Brightening Serum (30ml)',
    category: 'Skincare & Beauty',
    origin: 'South Korea',
    originFlag: '🇰🇷',
    moq: '1,000 Units',
    leadTime: '20 - 30 Days',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop',
    description: 'Clinical grade anti-aging and tone brightening serum infused with 5% Niacinamide, Centella Asiatica, and Hyaluronic Acid complex.',
    oemAvailable: true,
    specifications: [
      'Formula: 5% Niacinamide, Arbutin, Cica Extract',
      'Bottle: Amber Glass dropper bottle with custom gold foil print',
      'Safety: Dermatologically tested, Paraben-free, Cruelty-free',
      'Custom Labeling: English & Khmer multi-lingual compliant'
    ],
    certifications: ['GMP Cosmetics', 'ISO 22716', 'K-FDA Approved'],
    shelfLife: '24 Months'
  },
  {
    id: 'prod-3',
    name: 'Highland Specialty Green & Jasmine Tea Leaf',
    category: 'Food & Beverage',
    origin: 'Vietnam',
    originFlag: '🇻🇳',
    moq: '200 KG (Bulk Bagged)',
    leadTime: '10 - 15 Days',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=1000&auto=format&fit=crop',
    description: 'High altitude single-origin whole green tea leaves infused with natural night-blooming jasmine flowers. Ideal for cafe chains and retail distribution.',
    oemAvailable: true,
    specifications: [
      'Grade: Premium Loose Whole Leaf (Grade A)',
      'Moisture: Less than 5%',
      'Packaging: 1kg vacuum sealed bags, master box 20kg',
      'Compliance: Fully compliant with Cambodia MoC and Customs'
    ],
    certifications: ['Global GAP', 'ISO 9001', 'Halal'],
    shelfLife: '24 Months'
  },
  {
    id: 'prod-4',
    name: 'Nourishing Keratin & Argan Oil Hair Treatment Set',
    category: 'Personal Care',
    origin: 'Japan',
    originFlag: '🇯🇵',
    moq: '1,500 Sets',
    leadTime: '25 - 35 Days',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=1000&auto=format&fit=crop',
    description: 'Salon-grade hair reconstruction shampoo and mask set enriched with Moroccan Argan oil, hydrolyzed silk protein, and amino acids.',
    oemAvailable: true,
    specifications: [
      'Set Volume: Shampoo 500ml + Mask 500ml',
      'Fragrance: Subtle Sakura & White Musk blend',
      'Packaging: Eco-friendly PET pump bottle with gold accent cap',
      'Certifications: Japanese MHLW Standard, ISO 22716'
    ],
    certifications: ['JAS Certified', 'ISO 22716', 'Cruelty Free'],
    shelfLife: '36 Months'
  },
  {
    id: 'prod-5',
    name: 'Liposomal Vitamin C + Zinc Immunity Capsules',
    category: 'Health Supplements',
    origin: 'South Korea',
    originFlag: '🇰🇷',
    moq: '2,000 Bottles (60 Count)',
    leadTime: '20 - 30 Days',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=1000&auto=format&fit=crop',
    description: 'High potency liposomal Vitamin C with Zinc for maximum bioavailability and immune support.',
    oemAvailable: true,
    specifications: [
      'Active Ingredients: Liposomal Vitamin C 1000mg, Zinc Picolinate 15mg',
      'Capsule: Vegetable Cellulose (Vegan)',
      'Bottle: UV-Protected Amber Glass',
      'Certifications: K-FDA Approved, GMP Certified Facility'
    ],
    certifications: ['GMP Health', 'KFDA Registered', 'Halal Certified'],
    shelfLife: '24 Months'
  },
  {
    id: 'prod-6',
    name: 'Plant-Based Biodegradable Multi-Surface Clean Drops',
    category: 'Household Goods',
    origin: 'Vietnam',
    originFlag: '🇻🇳',
    moq: '3,000 Bottles / Refills',
    leadTime: '14 - 20 Days',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=1000&auto=format&fit=crop',
    description: 'Non-toxic, hypoallergenic multi-surface home cleaner concentrate formulated with natural citrus enzymes and coconut surfactants.',
    oemAvailable: true,
    specifications: [
      'Formula: 100% Plant-Derived, Free from Chlorine & Ammonia',
      'Concentration: 1:10 dilution ratio or ready-to-use spray bottle',
      'Fragrance: Lemongrass & Tea Tree Natural Essential Oil',
      'Regulatory: Eco-Mark Certified, ASEAN Harmonized Standard'
    ],
    certifications: ['Green Label', 'ISO 14001', 'Child Safe'],
    shelfLife: '36 Months'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    featured: true,
    title: 'Navigating Cambodia’s Updated FMCG Import Customs & Tax Exemptions (2025/2026)',
    category: 'Regulatory Updates',
    date: 'February 12, 2026',
    readTime: '6 min read',
    author: {
      name: 'Vannak Heng',
      role: 'Head of Regulatory Affairs, UNT Co.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    },
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
    excerpt: 'An in-depth guide for importers and retail brands on recent Ministry of Commerce harmonized codes, customs duty relief categories, and mandatory Khmer label requirements.',
    content: [
      'As Cambodia continues its rapid modernization of commercial logistics, the Ministry of Economy and Finance alongside the General Department of Customs and Excise (GDCE) recently implemented updated tax structures affecting imported consumer packaged goods.',
      'Key updates include streamlined ASYCUDA World filing procedures, preferential tariff treatments under the Regional Comprehensive Economic Partnership (RCEP), and clarified guidelines for sub-packaging tax obligations.',
      'At UNT Company, our dedicated in-house customs brokerage handles end-to-end filings to ensure 100% compliance, zero port delays, and optimal tariff categorization for all client shipments entering Phnom Penh and Sihanoukville Autonomous Port.',
      'Importers are advised to pay strict attention to multi-lingual Khmer label registration standards, which require certified translations of ingredient percentages, importer tax identification numbers (TIN), and manufacturing lot details prior to customs clearance.'
    ],
    tags: ['Cambodia Customs', 'FMCG Import', 'GDCE Clearance', 'Khmer Labeling', 'RCEP Tariff']
  },
  {
    id: 'art-2',
    title: 'The Rise of OEM Private Label Beauty Brands in ASEAN Retail Markets',
    category: 'OEM Case Studies',
    date: 'February 4, 2026',
    readTime: '4 min read',
    author: {
      name: 'Sophea Khem',
      role: 'Director of Brand & OEM Solutions',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop'
    },
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
    excerpt: 'How local beauty entrepreneurs and retail chains are leveraging South Korean and Japanese GMP factories to launch proprietary skincare lines in record time.',
    content: [
      'The Asian beauty sector is experiencing unprecedented growth driven by consumer demand for clean ingredients, botanical formulations, and premium packaging.',
      'Rather than building capital-intensive manufacturing facilities from scratch, forward-thinking Cambodian retail chains are partnering with UNT Company to access audited Korean and Japanese OEM facilities.',
      'Through Sourcing-as-a-Service, UNT manages sample formulation testing, localized Khmer and English compliant packaging, stability trials, and door-to-door temperature-controlled delivery.',
      'Case study: A regional pharmacy chain launched a 6-SKU dermatologist-formulated hydration line in 90 days, capturing 28% market share in their initial 6 months.'
    ],
    tags: ['Private Label', 'Cosmetics OEM', 'Skincare Trends', 'Sourcing-as-a-Service']
  },
  {
    id: 'art-3',
    title: 'Cold-Chain Sourcing: Mitigating Risk in Food & Beverage Distribution',
    category: 'Supply Chain',
    date: 'January 28, 2026',
    readTime: '5 min read',
    author: {
      name: 'Rithy Sovann',
      role: 'Chief Logistics Officer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
    },
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=1000&auto=format&fit=crop',
    excerpt: 'Best practices for temperature-controlled freight between Vietnam, South Korea, and Phnom Penh to eliminate spoilage and maintain product integrity.',
    content: [
      'Maintaining an uninterrupted cold chain across tropical transit corridors requires real-time IoT temperature logging, specialized reefer containers, and rapid customs priority clearance.',
      'UNT Logistics deploys GPS-tracked refrigerated trailers with dual-power generator backup for cross-border land transport directly into our Phnom Penh temperature-regulated distribution center.',
      'Discover how our end-to-end cold storage monitoring safeguards dairy, beverage, and frozen specialty items with zero thermal spikes.'
    ],
    tags: ['Cold Chain', 'Logistics', 'Food Safety', 'Reefer Shipping']
  },
  {
    id: 'art-4',
    title: 'Modernizing Trade Capacity: High-Impact Sales Training for B2B Teams',
    category: 'Retail Strategy',
    date: 'January 15, 2026',
    readTime: '4 min read',
    author: {
      name: 'Channara Nguon',
      role: 'Lead Corporate Sales Trainer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
    },
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop',
    excerpt: 'Why technical product knowledge is no longer enough: Empowering commercial teams with value-based negotiation and long-term client retention strategies.',
    content: [
      'In today’s competitive B2B wholesale landscape, distribution success relies heavily on consultative sales techniques rather than transactional price discounting.',
      'UNT’s Trade Capacity Building Institute equips regional distributors and commercial agents with frameworks covering key account management, buyer psychology, objection handling, and digital procurement tools.',
      'Over 1,200 professionals have graduated from our Phnom Penh masterclasses, reporting an average 34% increase in sales conversion rates within 90 days.'
    ],
    tags: ['Sales Training', 'B2B Strategy', 'Negotiation', 'Capacity Building']
  }
];

export const TRAINING_TRACKS: TrainingTrack[] = [
  {
    id: 'track-1',
    title: 'B2B Sales Fundamentals & Consultative Selling',
    tagline: 'Master core sales techniques tailored for Cambodian and regional wholesale buyers.',
    duration: '2 Days Intensive (16 Hours)',
    level: 'Foundational to Intermediate',
    icon: 'target',
    description: 'Designed for corporate sales executives, account representatives, and commercial agents looking to transition from reactive order-taking to strategic consultative selling.',
    targetAudience: 'Sales Executives, Account Managers, Distributor Reps, Retail Buyers',
    keyTakeaways: [
      'Understand B2B buyer psychology in ASEAN commercial sectors',
      'Conduct effective needs discovery and client diagnostic meetings',
      'Structure high-value sales proposals that stand out from price competitors',
      'Build long-term account trust and high repeat-order rates'
    ],
    curriculum: [
      {
        module: 'Module 1: The Modern B2B Selling Landscape',
        topics: ['Shifts in buyer expectations', 'Value proposition definition', 'Navigating corporate decision chains']
      },
      {
        module: 'Module 2: Discovery & Solution Mapping',
        topics: ['Questioning strategies', 'Identifying unstated client risks', 'Custom proposal structuring']
      },
      {
        module: 'Module 3: Closing & Onboarding',
        topics: ['Handling price objections with confidence', 'Securing initial trial orders', 'Long-term relationship blueprints']
      }
    ]
  },
  {
    id: 'track-2',
    title: 'Advanced Commercial Negotiation & Contract Strategy',
    tagline: 'Secure favorable margin terms, exclusive distribution rights, and risk-mitigated agreements.',
    duration: '3 Days Masterclass (24 Hours)',
    level: 'Advanced / Management',
    icon: 'handshake',
    description: 'An executive-level negotiation bootcamp focused on complex multi-variable trade deals, international supplier agreements, and margin protection.',
    targetAudience: 'Procurement Directors, General Managers, Sourcing Leads, Business Owners',
    keyTakeaways: [
      'Master the BATNA (Best Alternative to a Negotiated Agreement) framework in wholesale trade',
      'Structure win-win credit terms, rebates, and volume tiering with overseas manufacturers',
      'De-escalate high-pressure supplier negotiations without compromising margins',
      'Integrate risk hedging for currency fluctuations and shipping surcharges'
    ],
    curriculum: [
      {
        module: 'Module 1: Strategic Negotiation Preparation',
        topics: ['Mapping power dynamics', 'Defining hard limits vs tradeable variables', 'Supplier audit analytics']
      },
      {
        module: 'Module 2: In-Session Execution & Tactics',
        topics: ['Anchoring strategies', 'Countering aggressive concessions', 'Non-verbal cue analysis']
      },
      {
        module: 'Module 3: Contractual Safeguards & Execution',
        topics: ['Penalty clauses for late shipping', 'Quality inspection milestone payments', 'Dispute resolution frameworks']
      }
    ]
  },
  {
    id: 'track-3',
    title: 'Key Account Relationship & Client Retention Mastery',
    tagline: 'Transform one-off buyers into high-LTV strategic partners.',
    duration: '1 Day Workshop (8 Hours)',
    level: 'All Levels',
    icon: 'users',
    description: 'Learn proven account management frameworks to increase lifetime value, upsell complementary product portfolios, and eliminate client churn.',
    targetAudience: 'Account Management Teams, Customer Success Managers, Sales Leads',
    keyTakeaways: [
      'Develop customized Joint Business Plans (JBP) with top retail accounts',
      'Proactively monitor client inventory turnover to optimize re-order timing',
      'Resolve service breakdowns and shipping delays with zero client loss',
      'Expand cross-category product penetration within existing key accounts'
    ],
    curriculum: [
      {
        module: 'Module 1: Key Account Segmentation & Planning',
        topics: ['Tiering accounts by potential LTV', 'Creating 12-month joint account roadmaps']
      },
      {
        module: 'Module 2: Consultative Retention Strategies',
        topics: ['Quarterly business review (QBR) frameworks', 'Co-marketing and promotional support']
      }
    ]
  },
  {
    id: 'track-4',
    title: 'Corporate Sourcing & Supply Chain Risk Management',
    tagline: 'Build resilient international supply chains tailored for growth markets.',
    duration: '2 Days Masterclass (16 Hours)',
    level: 'Intermediate to Advanced',
    icon: 'truck',
    description: 'Practical training on verifying overseas factories, managing multi-modal logistics, navigating ASEAN customs regulations, and mitigating currency risks.',
    targetAudience: 'Supply Chain Directors, Logistics Managers, Importing Entrepreneurs',
    keyTakeaways: [
      'Conduct rigorous factory background checks and quality audits in China, Vietnam, Korea',
      'Master Incoterms 2020 (FOB, CIF, DDP) and their hidden cost implications',
      'Ensure 100% compliance with Cambodian customs, tax codes, and ministry permits',
      'Implement buffer stock protocols for peak seasonal demand'
    ],
    curriculum: [
      {
        module: 'Module 1: Supplier Qualification & Auditing',
        topics: ['On-site vs third-party audit checklists', 'Verifying ISO/GMP certificates', 'Sample verification protocols']
      },
      {
        module: 'Module 2: Customs & Shipping Execution',
        topics: ['Decoupling Incoterms costs', 'Navigating GDCE tariff codes', 'Cold-chain handling guidelines']
      }
    ]
  }
];

export const SOURCING_STEPS = [
  {
    step: '01',
    title: 'Requirement & Product Audit',
    subtitle: 'Needs Analysis & Formula Specification',
    description: 'Our technical sourcing experts analyze your desired specifications, target cost structure, packaging requirements, and compliance standards.',
    icon: 'search'
  },
  {
    step: '02',
    title: 'Factory Verification & Sampling',
    subtitle: 'Audited Global Manufacturer Matching',
    description: 'We match your project with audited ISO/GMP certified facilities across Vietnam, Korea, Japan, or China, providing physical samples for rapid approval.',
    icon: 'verified'
  },
  {
    step: '03',
    title: 'Price & Contract Negotiation',
    subtitle: 'Direct Factory Pricing & Credit Terms',
    description: 'We negotiate direct-from-factory pricing with transparent volume breaks, protecting your profit margin and securing optimal payment terms.',
    icon: 'payments'
  },
  {
    step: '04',
    title: 'Strict Quality Control & Pre-Ship Inspection',
    subtitle: 'AQL 2.5 Inspection Standard',
    description: 'Our in-house QC inspectors conduct pre-production, inline, and final loading inspections to guarantee 100% batch consistency.',
    icon: 'fact_check'
  },
  {
    step: '05',
    title: 'Customs Clearance & Door-to-Door Delivery',
    subtitle: '100% Compliant Freight & Warehousing',
    description: 'We handle all customs documentation, import permits, Khmer labeling compliance, and deliver directly to your warehouse anywhere in Cambodia.',
    icon: 'local_shipping'
  }
];
