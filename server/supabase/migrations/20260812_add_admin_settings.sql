create table if not exists admin_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz default now()
);

alter table admin_settings enable row level security;
