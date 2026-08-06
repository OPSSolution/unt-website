-- Move the original client-only partner catalog into Supabase so every entry
-- can be edited, translated, or deleted from the admin panel.
insert into public.partners (id, name, category, country, logo_text)
values
  ('10000000-0000-4000-8000-000000000001', 'Mekong Agri Commodities', 'Food & Beverage', 'Vietnam', 'MEKONG AGRI'),
  ('10000000-0000-4000-8000-000000000002', 'Kyoto Bio Botanicals', 'Skincare & Cosmetics', 'Japan', 'KYOTO BIO'),
  ('10000000-0000-4000-8000-000000000003', 'Mekong FMCG Direct', 'Household Goods', 'Vietnam', 'MEKONG FMCG'),
  ('10000000-0000-4000-8000-000000000004', 'Seoul Health Labs', 'Health Supplements', 'South Korea', 'SEOUL LABS'),
  ('10000000-0000-4000-8000-000000000005', 'Guangzhou OEM Alliance', 'Packaging & Manufacturing', 'China', 'GZ OEM'),
  ('10000000-0000-4000-8000-000000000006', 'ASEAN Express Logistics', 'Cold Chain & Freight', 'Regional', 'ASEAN LOGISTICS')
on conflict (id) do nothing;

notify pgrst, 'reload schema';
