-- Client B2B quote request submissions
-- Run once in the Supabase SQL editor before deploying the quotes API.
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

-- Clients submit quotes through the Express API (service role bypasses RLS),
-- but allowing public insert/read also keeps the table usable by anon clients.
drop policy if exists "public insert quotes" on public.quotes;
create policy "public insert quotes" on public.quotes for insert with check (true);

-- Quote requests contain private contact details. They must never be readable
-- with the public/anon key; the Express server uses the service-role key.
drop policy if exists "public read quotes" on public.quotes;

comment on table public.quotes is 'Client B2B quote request submissions (stored per-language label data)';
comment on column public.quotes.data is 'Localized quote request fields submitted by the client';
comment on column public.quotes.language is 'Content language the submission was made in (en|km)';
