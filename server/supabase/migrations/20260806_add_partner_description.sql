alter table public.partners
  add column if not exists description text;

-- Refresh PostgREST so the API recognizes the new column immediately.
notify pgrst, 'reload schema';
