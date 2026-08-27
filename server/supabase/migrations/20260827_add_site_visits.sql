-- Site-wide visitor counter (single running total, admin-only).

create table if not exists site_stats (
  id int primary key default 1,
  total_visits bigint not null default 0,
  constraint site_stats_singleton check (id = 1)
);

insert into site_stats (id, total_visits) values (1, 0) on conflict (id) do nothing;

-- Only the server (service role) ever touches this table, so RLS is enabled
-- with no policies: it is unreachable through the public Supabase API.
alter table site_stats enable row level security;

create or replace function increment_site_visits()
returns bigint
language sql
as $$
  update site_stats set total_visits = total_visits + 1 where id = 1
  returning total_visits;
$$;
