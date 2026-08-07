-- ============================================================
-- UNT Website Admin Panel - Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- PRODUCTS
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  origin text not null,
  origin_flag text not null,
  moq text not null,
  lead_time text not null,
  image text not null,
  description text not null,
  oem_available boolean default false,
  specifications text[] default '{}',
  certifications text[] default '{}',
  shelf_life text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);


-- ARTICLES
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  date text not null,
  read_time text not null,
  author_name text not null,
  author_role text not null,
  author_avatar text not null,
  image text not null,
  excerpt text not null,
  content text[] default '{}',
  tags text[] default '{}',
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- PARTNERS
create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  country text not null,
  logo_text text not null,
  image text,
  description text,
  created_at timestamptz default now()
);

insert into partners (id, name, category, country, logo_text)
values
  ('10000000-0000-4000-8000-000000000001', 'Mekong Agri Commodities', 'Food & Beverage', 'Vietnam', 'MEKONG AGRI'),
  ('10000000-0000-4000-8000-000000000002', 'Kyoto Bio Botanicals', 'Skincare & Cosmetics', 'Japan', 'KYOTO BIO'),
  ('10000000-0000-4000-8000-000000000003', 'Mekong FMCG Direct', 'Household Goods', 'Vietnam', 'MEKONG FMCG'),
  ('10000000-0000-4000-8000-000000000004', 'Seoul Health Labs', 'Health Supplements', 'South Korea', 'SEOUL LABS'),
  ('10000000-0000-4000-8000-000000000005', 'Guangzhou OEM Alliance', 'Packaging & Manufacturing', 'China', 'GZ OEM'),
  ('10000000-0000-4000-8000-000000000006', 'ASEAN Express Logistics', 'Cold Chain & Freight', 'Regional', 'ASEAN LOGISTICS')
on conflict (id) do nothing;

-- HERO CONTENT (single row)
create table if not exists hero_content (
  id uuid primary key default gen_random_uuid(),
  badge_text text not null,
  headline text not null,
  subtitle text not null,
  cta_primary text not null,
  cta_secondary text not null,
  feature_image text,
  updated_at timestamptz default now()
);

-- HERO STATS (4 stat cards)
create table if not exists hero_stats (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value text not null,
  sort_order int default 0
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table products enable row level security;
alter table articles enable row level security;
alter table partners enable row level security;
alter table hero_content enable row level security;
alter table hero_stats enable row level security;

-- Public read access
create policy "public read products" on products for select using (true);
create policy "public read articles" on articles for select using (true);
create policy "public read partners" on partners for select using (true);
create policy "public read hero_content" on hero_content for select using (true);
create policy "public read hero_stats" on hero_stats for select using (true);

-- Service role has full access (used by the server with SUPABASE_SERVICE_ROLE_KEY)
-- No additional policy needed — service role bypasses RLS by default.

-- ============================================================
-- Seed: Default hero content
-- ============================================================

insert into hero_content (badge_text, headline, subtitle, cta_primary, cta_secondary, feature_image)
values (
  'Cambodia''s Premier Trading & Sourcing Ecosystem',
  'Your Trusted Sourcing Partner — From the World to Cambodia',
  'Unique Noble Trading Co., Ltd. bridges international manufacturers with retail networks across ASEAN.',
  'Explore Sourcing Solutions',
  'Request B2B Quote',
  'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop'
) on conflict do nothing;

-- Migration: add feature_image to existing hero_content rows
alter table hero_content add column if not exists feature_image text;

-- HOMEPAGE SECTIONS (editable text blocks)
create table if not exists homepage_sections (
  id uuid primary key default gen_random_uuid(),
  section_key text unique not null,
  data jsonb not null default '{}',
  updated_at timestamptz default now()
);

alter table homepage_sections enable row level security;
create policy "public read homepage_sections" on homepage_sections for select using (true);

insert into homepage_sections (section_key, data) values
(
  'pillars',
  '{
    "badge": "Full-Spectrum Trading Infrastructure",
    "heading": "Integrated Solutions for Modern Commerce",
    "subheading": "Unique Noble Trading Co., Ltd. operates as a complete commercial gateway, managing product supply chains from initial factory audits to local market distribution.",
    "pillar1_title": "Premium Product Distribution",
    "pillar1_desc": "Direct access to verified international wholesale catalogs spanning Food & Beverage, Skincare, Beauty, Personal Care, Health Supplements, and Household FMCG.",
    "pillar2_title": "Sourcing-as-a-Service & OEM",
    "pillar2_desc": "End-to-end custom procurement. We audit factories in Thailand, Korea, Japan, and China, negotiate pricing, inspect pre-shipment batches, and clear Cambodian customs.",
    "pillar3_title": "Sales & Trade Capacity Academy",
    "pillar3_desc": "Empowering commercial teams, sales reps, and procurement directors with masterclasses in B2B negotiation, buyer psychology, key account management, and retention."
  }''::jsonb
),
(
  'heritage',
  '{
    "badge": "Balancing Heritage with Modern Efficiency",
    "heading": "Bridging International Factories with Cambodian Commerce",
    "paragraph": "Global supply chains are complex, but sourcing doesn''t have to be. Unique Noble Trading Co., Ltd. combines deep local market knowledge with international trade relationships to provide smooth, transparent procurement.",
    "feature1_title": "Direct Factory Access",
    "feature1_desc": "Eliminate middlemen markup. We connect you directly to verified factories in Thailand, South Korea, Japan, Vietnam, and China.",
    "feature2_title": "Full Customs & Ministry Permits",
    "feature2_desc": "We manage product registration with the Cambodian Ministry of Health, Ministry of Commerce, and GDCE customs clearance.",
    "feature3_title": "End-to-End Door Delivery",
    "feature3_desc": "Temperature-controlled logistics from overseas port loading directly to your Phnom Penh or provincial distribution center.",
    "quality_badge": "The UNT Quality Standard",
    "quality_desc": "Zero product returns due to quality defects across 2024–2026. Audit-verified production from certified ISO/GMP manufacturers."
  }''::jsonb
),
(
  'oem_banner',
  '{
    "badge": "OEM & Private Label Excellence",
    "heading": "Launch Your Brand with World-Class Formulations",
    "paragraph": "Have a proprietary product concept? Unique Noble Trading Co., Ltd. provides end-to-end private label manufacturing. We match your brand with GMP-certified factories in South Korea, Japan, and Thailand for custom cosmetics, supplements, beverages, and personal care lines.",
    "chip1_title": "Custom Formulas",
    "chip1_sub": "R&D & Lab Stability",
    "chip2_title": "Package Design",
    "chip2_sub": "Khmer Label Compliant",
    "chip3_title": "Low Trial MOQs",
    "chip3_sub": "Flexible Batch Sizes",
    "chip4_title": "Turnkey Clearance",
    "chip4_sub": "Ministry Permit Filing",
    "cta": "Start OEM Private Label Project"
  }''::jsonb
)
on conflict (section_key) do nothing;

-- Products section & Market Insights section labels
insert into homepage_sections (section_key, data) values
(
  'products_section',
  $json${"badge": "Wholesale & OEM Catalog", "heading": "Featured Import Catalog Items", "subheading": "Verified quality products ready for immediate Cambodian distribution or custom private label rebranding.", "cta": "View Full Catalog", "all_origins_label": "\u2726 All Origins", "all_origins_inactive": "All Origins", "all_origins_banner": "Full product catalog from South Korea, Japan, China & Vietnam", "lead_time_label": "Lead Time", "min_order_label": "Min. Order"}$json$::jsonb
),
(
  'partners_section',
  $json${"label": "Trusted Global Manufacturing Partners & Supplier Alliances"}$json$::jsonb
),
(
  'insights_section',
  $json${"badge": "Market Intelligence", "heading": "Latest Regulatory & Trade Insights", "cta": "View All Articles"}$json$::jsonb
),
(
  'about_page',
  $json${"badge": "About Unique Noble Trading Co., Ltd.", "headline": "The Bridge to Global Trade", "subheadline": "Unique Noble Trading Co., Ltd. is a premier Cambodian trading, sourcing, OEM manufacturing, and commercial capacity building ecosystem headquartered in Phnom Penh.", "mission_badge": "Our Purpose & Mission", "mission_heading": "Connecting World-Class Manufacturers with Emerging ASEAN Markets", "mission_p1": "Founded with the vision of modernizing Cambodian import commerce, Unique Noble Trading Co., Ltd. acts as an essential catalyst for local retailers, pharmacy chains, FMCG distributors, and brand owners. We remove cross-border trade friction by taking full responsibility for supplier auditing, volume pricing negotiation, quality control, customs clearance, and product compliance.", "mission_p2": "Our dual focus on physical distribution and commercial training ensures that our clients not only secure top-tier products, but also possess the negotiation and sales capabilities required to achieve market leadership.", "mission_image": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop", "hq_label": "Phnom Penh Corporate Headquarters", "hq_address": "Phnom Penh Tower, Monivong Blvd, Doun Penh, Phnom Penh", "stat1_value": "100%", "stat1_label": "Regulatory & Tax Audit Compliant", "stat2_value": "1,200+", "stat2_label": "Trade & Sales Professionals Trained", "adv_badge": "Why Business Leaders Choose UNT", "adv_heading": "The UNT Advantage", "adv1_title": "Direct Factory Audit", "adv1_desc": "We physically audit ISO and GMP facilities across Thailand, Vietnam, Korea, Japan, and China.", "adv2_title": "In-House Customs Brokerage", "adv2_desc": "Licensed GDCE customs brokers handle tax classification, ASYCUDA filings, and ministry permits.", "adv3_title": "Cold Chain & Logistics", "adv3_desc": "Temperature-monitored reefer trucking and Phnom Penh warehousing protect delicate products.", "adv4_title": "Sales & Capacity Building", "adv4_desc": "We train client commercial teams in consultative selling, buyer psychology, and key account growth.", "net_badge": "Strategic Infrastructure", "net_heading": "Our Global Network & Operations Hubs", "net_sub": "Local presence in key manufacturing capitals ensures rapid sampling, immediate factory audits, and direct supplier oversight.", "hub1_flags": "🇹🇭 🇻🇳", "hub1_title": "Bangkok & Ho Chi Minh Corridors", "hub1_desc": "Cross-border overland logistics hub for rapid F&B, organic coconut water, teas, and household consumer product shipments into Cambodia.", "hub2_flags": "🇰🇷 🇯🇵", "hub2_title": "Seoul & Tokyo OEM Laboratories", "hub2_desc": "Access to audited GMP cosmetics laboratories and health supplement formulators for premium skincare lines.", "hub3_flags": "🇨🇳 🇰🇭", "hub3_title": "Guangzhou & Phnom Penh Central", "hub3_desc": "Bulk manufacturing, custom eco packaging, and central distribution warehouse in Phnom Penh.", "cta": "Partner with Unique Noble Trading Co., Ltd."}$json$::jsonb
),
(
  'services_page',
  $json${"badge": "End-to-End Procurement Infrastructure", "headline": "Integrated Global Trading Solutions", "subheadline": "From factory-direct auditing and private label OEM formulation to Ministry permits, GDCE customs clearance, and door-to-door logistics in Cambodia.", "steps_badge": "Methodology", "steps_heading": "The UNT Sourcing-as-a-Service Process", "steps_sub": "We simplify global procurement into five fully transparent, risk-managed stages.", "oem_title": "Turnkey OEM & Private Label Formulations", "oem_desc": "Launch proprietary brand lines with minimal upfront R&D costs. We handle formula matching, stability testing, custom bottle/jar selection, foil printing, and multi-lingual packaging.", "oem_cta": "Discuss Private Label Project", "customs_title": "GDCE Customs Brokerage & Ministry Registration", "customs_desc": "Avoid port fines and shipping delays. Our dedicated customs unit files ASYCUDA manifests, secures Ministry of Health product notifications, and manages Ministry of Commerce import audits.", "customs_cta": "Consult Customs Specialist"}$json$::jsonb
),
(
  'training_page',
  $json${"badge": "UNT Trade Capacity Building Institute", "headline": "Mastering the Art of Global Commerce", "subheadline": "Elevate your commercial team\u0027s B2B negotiation skills, buyer psychology, key account retention, and international supply chain management.", "stat1_value": "1,200+", "stat1_label": "Professionals Certified", "stat2_value": "4.9 / 5.0", "stat2_label": "Average Course Rating", "stat3_value": "15+", "stat3_label": "Senior Trade Instructors", "stat4_value": "34%", "stat4_label": "Avg 90-Day Conversion Lift", "tracks_badge": "Curriculum", "tracks_heading": "Specialized B2B Commercial Tracks", "tracks_sub": "Select a track below to review full module syllabi, target audience criteria, and enrollment schedules.", "bootcamp_badge": "In-House Corporate Solutions", "bootcamp_heading": "Need a Private Masterclass for Your Commercial Team?", "bootcamp_desc": "We deliver custom on-site workshops tailored to your industry, product catalog, and specific negotiation challenges directly at your Phnom Penh corporate headquarters.", "bootcamp_cta": "Book Corporate Session"}$json$::jsonb
),
(
  'contact_page',
  $json${"badge": "Phnom Penh HQ & Regional Hubs", "headline": "Let\u0027s Bridge the Gap Between Agriculture & Logistics", "subheadline": "Get in touch with Unique Noble Trading Co., Ltd.\u0027s sourcing specialists, customs brokers, and commercial training leads.", "section_badge": "Direct Channels", "section_heading": "Connect With Our Team", "section_desc": "Whether you require urgent customs clearance support, bulk wholesale pricing, or custom OEM formulation — we respond within 4 business hours.", "hq_address": "Phnom Penh Tower, Level 14, Monivong Blvd, Sangkat Boeung Keng Kang 1, Doun Penh, Phnom Penh, Kingdom of Cambodia.", "phone_landline": "+855 23 999 888", "phone_telegram": "@untsourcing", "phone_whatsapp": "+855 12 345 678", "email_general": "info@untcompany.com", "email_customs": "customs@untcompany.com", "hours": "Mon - Sat: 8:00 AM - 6:00 PM"}$json$::jsonb
)
on conflict (section_key) do nothing;

-- Trade Hubs (world map countries)
insert into homepage_sections (section_key, data)
values (
  'trade_hubs',
  $json${"hubs": [
    {"id": "korea", "name": "South Korea", "flag": "🇰🇷", "flagUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/250px-Flag_of_South_Korea.svg.png", "lat": 37.56, "lon": 126.97, "leadTime": "5-7 Days", "categories": "K-Beauty & OEM Supplements", "moq": "1,000 Units", "type": "warehouse"},
    {"id": "japan", "name": "Japan", "flag": "🇯🇵", "flagUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/250px-Flag_of_Japan.svg.png", "lat": 35.67, "lon": 139.65, "leadTime": "6-9 Days", "categories": "Personal Care & Health", "moq": "800 Units", "type": "port"},
    {"id": "china", "name": "China", "flag": "🇨🇳", "flagUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/250px-Flag_of_the_People%27s_Republic_of_China.svg.png", "lat": 23.12, "lon": 113.26, "leadTime": "4-6 Days", "categories": "Packaging & Wholesale Goods", "moq": "2,000 Units", "type": "factory"},
    {"id": "vietnam", "name": "Vietnam", "flag": "🇻🇳", "flagUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/250px-Flag_of_Vietnam.svg.png", "lat": 10.82, "lon": 106.62, "leadTime": "1-3 Days", "categories": "Food Processing & Agribusiness", "moq": "300 Units", "type": "port"}
  ]}$json$::jsonb
)
on conflict (section_key) do nothing;

insert into hero_stats (label, value, sort_order) values
  ('Annual Trade Volume', '$50M+', 1),
  ('Audited Factories', '500+', 2),
  ('Global Trade Origins', '15+', 3),
  ('On-Time Customs Clearance', '99.4%', 4)
on conflict do nothing;

-- Bilingual content. English remains in the existing columns for backwards
-- compatibility; Khmer values are stored in translations->'km'.
alter table products add column if not exists translations jsonb not null default '{}'::jsonb;
alter table articles add column if not exists translations jsonb not null default '{}'::jsonb;
alter table partners add column if not exists translations jsonb not null default '{}'::jsonb;
alter table hero_content add column if not exists translations jsonb not null default '{}'::jsonb;
alter table hero_stats add column if not exists translations jsonb not null default '{}'::jsonb;

-- Client B2B quote request submissions
create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  data jsonb not null default '{}'::jsonb,
  language text not null default 'en',
  status text not null default 'new',
  created_at timestamptz default now()
);

alter table public.quotes
  drop constraint if exists quotes_language_check,
  add constraint quotes_language_check check (language in ('en', 'km')),
  drop constraint if exists quotes_status_check,
  add constraint quotes_status_check check (status in ('new', 'in_progress', 'completed'));
alter table public.quotes enable row level security;
drop policy if exists "public insert quotes" on public.quotes;
create policy "public insert quotes" on public.quotes for insert with check (true);
drop policy if exists "public read quotes" on public.quotes;
