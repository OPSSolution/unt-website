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
  created_at timestamptz default now()
);

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
  'Unique Noble Trading Co., Ltd. (UNT Company) bridges international manufacturers with retail networks across ASEAN.',
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
    "subheading": "UNT Company operates as a complete commercial gateway, managing product supply chains from initial factory audits to local market distribution.",
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
    "paragraph": "Global supply chains are complex, but sourcing doesn''t have to be. UNT Company combines deep local market knowledge with international trade relationships to provide smooth, transparent procurement.",
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
    "paragraph": "Have a proprietary product concept? UNT Company provides end-to-end private label manufacturing. We match your brand with GMP-certified factories in South Korea, Japan, and Thailand for custom cosmetics, supplements, beverages, and personal care lines.",
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

insert into hero_stats (label, value, sort_order) values
  ('Annual Trade Volume', '$50M+', 1),
  ('Audited Factories', '500+', 2),
  ('Global Trade Origins', '15+', 3),
  ('On-Time Customs Clearance', '99.4%', 4)
on conflict do nothing;
