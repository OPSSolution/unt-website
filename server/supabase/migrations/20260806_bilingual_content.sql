-- Run once in the Supabase SQL editor before deploying the bilingual API.
-- Existing English columns and data are preserved.
alter table public.products
  add column if not exists translations jsonb not null default '{}'::jsonb;
alter table public.articles
  add column if not exists translations jsonb not null default '{}'::jsonb;
alter table public.partners
  add column if not exists translations jsonb not null default '{}'::jsonb;
alter table public.hero_content
  add column if not exists translations jsonb not null default '{}'::jsonb;
alter table public.hero_stats
  add column if not exists translations jsonb not null default '{}'::jsonb;

comment on column public.products.translations is 'Localized field overrides keyed by language code, e.g. km';
comment on column public.articles.translations is 'Localized field overrides keyed by language code, e.g. km';
comment on column public.partners.translations is 'Localized field overrides keyed by language code, e.g. km';
comment on column public.hero_content.translations is 'Localized field overrides keyed by language code, e.g. km';
comment on column public.hero_stats.translations is 'Localized field overrides keyed by language code, e.g. km';
