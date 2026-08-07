-- Permanently replace the former abbreviated company name in all editable page content.
-- The API also normalizes legacy values at read time, so the public website is corrected
-- immediately after deployment even before this migration is applied.
update public.homepage_sections
set
  data = replace(
    replace(
      replace(
        data::text,
        'Unique Noble Trading Co., Ltd. (UNT Company)',
        'Unique Noble Trading Co., Ltd.'
      ),
      'UNT COMPANY',
      'Unique Noble Trading Co., Ltd.'
    ),
    'UNT Company',
    'Unique Noble Trading Co., Ltd.'
  )::jsonb,
  updated_at = now()
where data::text ~* 'UNT Company';
