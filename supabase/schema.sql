-- =====================================================================
-- BuildWithThapa — Database Schema
-- Run in Supabase SQL Editor (or via `supabase db push`) in this order:
--   1. schema.sql   (this file)
--   2. policies.sql (Row Level Security)
--   3. storage.sql  (buckets)
-- =====================================================================

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- =====================================================================
-- ROLES & PERMISSIONS
-- =====================================================================

create table if not exists roles (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,           -- 'admin' | 'user'
  description text,
  created_at timestamptz not null default now()
);

create table if not exists permissions (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,           -- e.g. 'projects.manage'
  description text,
  created_at timestamptz not null default now()
);

create table if not exists role_permissions (
  role_id uuid references roles(id) on delete cascade,
  permission_id uuid references permissions(id) on delete cascade,
  primary key (role_id, permission_id)
);

insert into roles (name, description) values
  ('admin', 'Full platform access'),
  ('user', 'Standard authenticated user')
on conflict (name) do nothing;

-- =====================================================================
-- USER PROFILES (extends auth.users, 1:1)
-- =====================================================================

create table if not exists user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role_id uuid references roles(id),
  full_name text,
  phone text,
  website text,
  address text,
  avatar_url text,
  social_links jsonb default '{}'::jsonb,  -- { github, linkedin, twitter, ... }
  bio text,
  career_objective text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =====================================================================
-- PORTFOLIO
-- =====================================================================

create table if not exists project_categories (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  slug text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  category_id uuid references project_categories(id) on delete set null,
  short_description text,
  description text,
  tech_stack text[] default '{}',
  github_url text,
  live_url text,
  cover_image_url text,
  is_featured boolean not null default false,
  is_published boolean not null default true,
  display_order integer not null default 0,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_projects_published on projects(is_published, display_order);
create index if not exists idx_projects_category on projects(category_id);

create table if not exists project_images (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete cascade,
  image_url text not null,
  alt_text text,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- =====================================================================
-- SERVICES / PACKAGES
-- =====================================================================

create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  icon text,
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists packages (
  id uuid primary key default uuid_generate_v4(),
  service_id uuid references services(id) on delete cascade,
  name text not null,                 -- Basic | Basic Plus | Premium
  description text,
  features text[] default '{}',
  price numeric(12,2),
  currency text not null default 'USD',
  image_url text,
  cta_label text default 'Get Started',
  is_published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (service_id, name)
);

-- =====================================================================
-- BLOG
-- =====================================================================

create table if not exists blog_categories (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  slug text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists blog_tags (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  slug text unique not null
);

create table if not exists blogs (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  category_id uuid references blog_categories(id) on delete set null,
  excerpt text,
  content text not null,
  cover_image_url text,
  tags uuid[] default '{}',
  author_id uuid references auth.users(id) on delete set null,
  is_published boolean not null default false,
  published_at timestamptz,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_blogs_published on blogs(is_published, published_at desc);

-- =====================================================================
-- TESTIMONIALS
-- =====================================================================

create table if not exists testimonials (
  id uuid primary key default uuid_generate_v4(),
  client_name text not null,
  client_role text,
  client_company text,
  client_avatar_url text,
  content text not null,
  rating smallint check (rating between 1 and 5) default 5,
  is_published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- =====================================================================
-- CONTACT & NEWSLETTER
-- =====================================================================

create table if not exists contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  ip_address text,
  is_read boolean not null default false,
  is_archived boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  is_confirmed boolean not null default false,
  confirmation_token uuid default uuid_generate_v4(),
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now()
);

-- =====================================================================
-- CV BUILDER
-- =====================================================================

create table if not exists cv_templates (
  id uuid primary key default uuid_generate_v4(),
  name text not null,                 -- Modern | Professional | Creative | Minimal | ATS Friendly
  slug text unique not null,
  preview_image_url text,
  is_ats_friendly boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists cvs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  template_id uuid references cv_templates(id) on delete set null,
  title text not null default 'Untitled CV',
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_cvs_user on cvs(user_id);

-- Flexible section storage: one row per section instance, ordered per CV.
-- section_type: personal_info | about | education | experience | projects
--               | skills | languages | certifications | references
create table if not exists cv_sections (
  id uuid primary key default uuid_generate_v4(),
  cv_id uuid references cvs(id) on delete cascade not null,
  section_type text not null,
  display_order integer not null default 0,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_cv_sections_cv on cv_sections(cv_id, display_order);

-- =====================================================================
-- UPLOADS (metadata for files in Supabase Storage)
-- =====================================================================

create table if not exists uploads (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  bucket text not null,                -- profiles | projects | cv | uploads
  path text not null,
  original_filename text,
  mime_type text,
  size_bytes bigint,
  width integer,
  height integer,
  created_at timestamptz not null default now()
);

create index if not exists idx_uploads_user on uploads(user_id);

-- =====================================================================
-- SETTINGS (singleton-style key/value site configuration)
-- =====================================================================

create table if not exists settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

-- Seed default setting groups admins will edit via the panel.
insert into settings (key, value) values
  ('site', '{"name":"BuildWithThapa","tagline":"Building Modern Web Experiences & Digital Solutions"}'),
  ('seo', '{"defaultTitle":"BuildWithThapa","defaultDescription":""}'),
  ('social_links', '{}'),
  ('email', '{}')
on conflict (key) do nothing;

-- =====================================================================
-- NOTIFICATIONS & ACTIVITY LOGS
-- =====================================================================

create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  body text,
  is_read boolean not null default false,
  link text,
  created_at timestamptz not null default now()
);

create table if not exists activity_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete set null,
  action text not null,               -- e.g. 'cv.created', 'project.updated'
  entity_type text,
  entity_id uuid,
  metadata jsonb default '{}'::jsonb,
  ip_address text,
  created_at timestamptz not null default now()
);

create index if not exists idx_activity_user on activity_logs(user_id, created_at desc);

-- =====================================================================
-- updated_at auto-touch trigger (applied to tables with updated_at)
-- =====================================================================

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$
declare t text;
begin
  for t in
    select unnest(array[
      'user_profiles','projects','services','packages','blogs',
      'cvs','cv_sections'
    ])
  loop
    execute format(
      'drop trigger if exists trg_set_updated_at on %I; create trigger trg_set_updated_at before update on %I for each row execute function set_updated_at();',
      t, t
    );
  end loop;
end $$;

-- =====================================================================
-- Auto-create a user_profiles row whenever a new auth user signs up
-- =====================================================================

create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, full_name, role_id)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    (select id from public.roles where name = 'user')
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists trg_handle_new_user on auth.users;
create trigger trg_handle_new_user
  after insert on auth.users
  for each row execute function handle_new_user();
