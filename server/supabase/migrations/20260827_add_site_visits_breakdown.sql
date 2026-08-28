-- Per-visit log powering the daily trend, new-vs-returning, and country
-- breakdowns in the admin dashboard. Builds on the site_stats running total
-- added in 20260827_add_site_visits.sql.

create table if not exists site_visits (
  id bigserial primary key,
  visited_at timestamptz not null default now(),
  visitor_id text not null,
  country text,
  is_new boolean not null
);

create index if not exists site_visits_visited_at_idx on site_visits (visited_at);
create index if not exists site_visits_visitor_id_idx on site_visits (visitor_id);
create index if not exists site_visits_country_idx on site_visits (country);

-- Only the server (service role) ever touches this table.
alter table site_visits enable row level security;

create or replace function record_site_visit(p_visitor_id text, p_country text)
returns table(total_visits bigint, is_new boolean)
language plpgsql
as $$
declare
  v_is_new boolean;
  v_total bigint;
begin
  v_is_new := not exists (select 1 from site_visits where visitor_id = p_visitor_id);

  insert into site_visits (visitor_id, country, is_new)
  values (p_visitor_id, p_country, v_is_new);

  -- "total_visits" is ambiguous here: it names both the site_stats column and
  -- the OUT parameter from RETURNS TABLE, so both sides must be table-qualified.
  update site_stats set total_visits = site_stats.total_visits + 1 where id = 1
  returning site_stats.total_visits into v_total;

  return query select v_total, v_is_new;
end;
$$;

create or replace function site_visits_daily(days int default 30)
returns table(day date, visits bigint)
language sql
as $$
  select date_trunc('day', visited_at)::date as day, count(*) as visits
  from site_visits
  where visited_at >= now() - (days || ' days')::interval
  group by 1
  order by 1;
$$;

create or replace function site_visits_countries()
returns table(country text, visits bigint)
language sql
as $$
  select coalesce(country, 'Unknown') as country, count(*) as visits
  from site_visits
  group by 1
  order by 2 desc
  limit 20;
$$;

create or replace function site_visits_types()
returns table(is_new boolean, visits bigint)
language sql
as $$
  select is_new, count(*) as visits
  from site_visits
  group by 1;
$$;
