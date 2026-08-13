-- Enforce that image URLs stored in the DB come from approved media hosts:
-- ImageKit (ik.imagekit.io), Cloudinary (res.cloudinary.com),
-- Unsplash (images.unsplash.com), Wikimedia, or the project's Supabase storage.

create or replace function is_approved_media_url(url text)
returns boolean
language sql
immutable
as $$
  select url = '' or url is null or (
    url ~* '^https://(ik\.imagekit\.io|[^/]*\.imagekit\.io|res\.cloudinary\.com|images\.unsplash\.com|upload\.wikimedia\.org|dcplvklbigmtkyjdioez\.supabase\.co)/'
  )
$$;

alter table products
  drop constraint if exists products_image_host_check,
  add constraint products_image_host_check check (is_approved_media_url(image)),
  drop constraint if exists products_showcase_image_host_check,
  add constraint products_showcase_image_host_check check (is_approved_media_url(showcase_image));

alter table articles
  drop constraint if exists articles_image_host_check,
  add constraint articles_image_host_check check (is_approved_media_url(image)),
  drop constraint if exists articles_author_avatar_host_check,
  add constraint articles_author_avatar_host_check check (is_approved_media_url(author_avatar));

alter table partners
  drop constraint if exists partners_image_host_check,
  add constraint partners_image_host_check check (is_approved_media_url(image));

alter table hero_content
  drop constraint if exists hero_content_feature_image_host_check,
  add constraint hero_content_feature_image_host_check check (is_approved_media_url(feature_image));
