-- Adds a view counter to articles and an atomic increment function.

alter table articles add column if not exists views integer not null default 0;

create or replace function increment_article_views(article_id uuid)
returns integer
language sql
as $$
  update articles set views = views + 1 where id = article_id
  returning views;
$$;
