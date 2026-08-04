-- =====================================================================
-- BuildWithThapa — Seed Data
-- Run AFTER schema.sql, policies.sql, storage.sql
-- Safe to re-run: uses ON CONFLICT DO NOTHING.
-- =====================================================================

insert into cv_templates (name, slug, is_ats_friendly, is_active) values
  ('Modern',        'modern',       true,  true),
  ('Professional',  'professional', true,  true),
  ('Creative',      'creative',     false, true),
  ('Minimal',        'minimal',      true,  true),
  ('ATS Friendly',   'ats-friendly', true,  true)
on conflict (slug) do nothing;

insert into project_categories (name, slug) values
  ('Web Apps', 'web-apps'),
  ('E-commerce', 'e-commerce'),
  ('Dashboards', 'dashboards'),
  ('Marketing Sites', 'marketing-sites')
on conflict (slug) do nothing;

insert into services (name, slug, description, display_order) values
  ('Web Development', 'web-development', 'Custom websites and web applications built for performance and scale.', 0),
  ('SaaS Platforms', 'saas-platforms', 'End-to-end SaaS products — auth, billing, dashboards, and admin tooling.', 1),
  ('UI / UX Design', 'ui-ux-design', 'Interface design that balances brand identity with usability.', 2)
on conflict (slug) do nothing;

-- Packages reference a service by slug lookup so this file stays idempotent
-- even if service ids differ across environments.
insert into packages (service_id, name, description, features, price, display_order)
select id, 'Basic', 'A polished single-page site to get you online fast.',
  array['Up to 5 sections','Mobile responsive','Basic SEO setup','1 round of revisions'], 499, 0
from services where slug = 'web-development'
on conflict (service_id, name) do nothing;

insert into packages (service_id, name, description, features, price, display_order)
select id, 'Basic Plus', 'A multi-page site or web app with real functionality.',
  array['Up to 8 pages','Supabase auth & database','CMS-editable content','Contact & newsletter forms','3 rounds of revisions'], 1299, 1
from services where slug = 'web-development'
on conflict (service_id, name) do nothing;

insert into packages (service_id, name, description, features, price, display_order)
select id, 'Premium', 'A full SaaS platform, built and shipped end to end.',
  array['Custom architecture','Admin panel & role-based access','Third-party integrations','Performance & security hardening','Ongoing support'], null, 2
from services where slug = 'saas-platforms'
on conflict (service_id, name) do nothing;

insert into blog_categories (name, slug) values
  ('Engineering', 'engineering'),
  ('Design', 'design'),
  ('Career', 'career')
on conflict (slug) do nothing;
