-- =====================================================================
-- BuildWithThapa — Row Level Security Policies
-- Run AFTER schema.sql
-- =====================================================================

-- Helper: is the current auth user an admin?
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from user_profiles up
    join roles r on r.id = up.role_id
    where up.id = auth.uid() and r.name = 'admin'
  );
$$ language sql security definer stable;

-- Enable RLS everywhere
alter table roles enable row level security;
alter table permissions enable row level security;
alter table role_permissions enable row level security;
alter table user_profiles enable row level security;
alter table project_categories enable row level security;
alter table projects enable row level security;
alter table project_images enable row level security;
alter table services enable row level security;
alter table packages enable row level security;
alter table blog_categories enable row level security;
alter table blog_tags enable row level security;
alter table blogs enable row level security;
alter table testimonials enable row level security;
alter table contact_messages enable row level security;
alter table newsletter_subscribers enable row level security;
alter table cv_templates enable row level security;
alter table cvs enable row level security;
alter table cv_sections enable row level security;
alter table uploads enable row level security;
alter table settings enable row level security;
alter table notifications enable row level security;
alter table activity_logs enable row level security;

-- ---------------------------------------------------------------------
-- Public read-only reference/content tables
-- ---------------------------------------------------------------------
create policy "public read roles" on roles for select using (true);
create policy "admin write roles" on roles for all using (is_admin()) with check (is_admin());

create policy "admin only permissions" on permissions for all using (is_admin()) with check (is_admin());
create policy "admin only role_permissions" on role_permissions for all using (is_admin()) with check (is_admin());

create policy "public read categories" on project_categories for select using (true);
create policy "admin write categories" on project_categories for all using (is_admin()) with check (is_admin());

create policy "public read published projects" on projects
  for select using (is_published = true or is_admin());
create policy "admin write projects" on projects
  for insert with check (is_admin());
create policy "admin update projects" on projects
  for update using (is_admin()) with check (is_admin());
create policy "admin delete projects" on projects
  for delete using (is_admin());

create policy "public read project_images" on project_images for select using (true);
create policy "admin write project_images" on project_images for all using (is_admin()) with check (is_admin());

create policy "public read published services" on services
  for select using (is_published = true or is_admin());
create policy "admin write services" on services for all using (is_admin()) with check (is_admin());

create policy "public read published packages" on packages
  for select using (is_published = true or is_admin());
create policy "admin write packages" on packages for all using (is_admin()) with check (is_admin());

create policy "public read blog taxonomy" on blog_categories for select using (true);
create policy "admin write blog_categories" on blog_categories for all using (is_admin()) with check (is_admin());
create policy "public read blog_tags" on blog_tags for select using (true);
create policy "admin write blog_tags" on blog_tags for all using (is_admin()) with check (is_admin());

create policy "public read published blogs" on blogs
  for select using (is_published = true or is_admin());
create policy "admin write blogs" on blogs for all using (is_admin()) with check (is_admin());

create policy "public read published testimonials" on testimonials
  for select using (is_published = true or is_admin());
create policy "admin write testimonials" on testimonials for all using (is_admin()) with check (is_admin());

create policy "public read cv_templates" on cv_templates
  for select using (is_active = true or is_admin());
create policy "admin write cv_templates" on cv_templates for all using (is_admin()) with check (is_admin());

create policy "public read settings" on settings for select using (true);
create policy "admin write settings" on settings for all using (is_admin()) with check (is_admin());

-- ---------------------------------------------------------------------
-- user_profiles: users manage their own row, admins manage all
-- ---------------------------------------------------------------------
create policy "users read own profile" on user_profiles
  for select using (auth.uid() = id or is_admin());
create policy "users update own profile" on user_profiles
  for update using (auth.uid() = id or is_admin()) with check (auth.uid() = id or is_admin());
create policy "admin insert profile" on user_profiles
  for insert with check (auth.uid() = id or is_admin());
create policy "admin delete profile" on user_profiles
  for delete using (is_admin());

-- ---------------------------------------------------------------------
-- contact_messages: anyone can submit, only admin can read/manage
-- ---------------------------------------------------------------------
create policy "anyone can submit contact message" on contact_messages
  for insert with check (true);
create policy "admin read contact_messages" on contact_messages
  for select using (is_admin());
create policy "admin manage contact_messages" on contact_messages
  for update using (is_admin()) with check (is_admin());
create policy "admin delete contact_messages" on contact_messages
  for delete using (is_admin());

-- ---------------------------------------------------------------------
-- newsletter_subscribers: anyone can subscribe; admin manages list
-- ---------------------------------------------------------------------
create policy "anyone can subscribe" on newsletter_subscribers
  for insert with check (true);
create policy "admin read subscribers" on newsletter_subscribers
  for select using (is_admin());
create policy "admin manage subscribers" on newsletter_subscribers
  for update using (is_admin()) with check (is_admin());
create policy "admin delete subscribers" on newsletter_subscribers
  for delete using (is_admin());

-- ---------------------------------------------------------------------
-- CVs & CV sections: strictly owner-only (+ admin oversight)
-- ---------------------------------------------------------------------
create policy "users manage own cvs" on cvs
  for all using (auth.uid() = user_id or is_admin())
  with check (auth.uid() = user_id or is_admin());

create policy "users manage own cv_sections" on cv_sections
  for all using (
    exists (select 1 from cvs where cvs.id = cv_sections.cv_id and (cvs.user_id = auth.uid() or is_admin()))
  )
  with check (
    exists (select 1 from cvs where cvs.id = cv_sections.cv_id and (cvs.user_id = auth.uid() or is_admin()))
  );

-- ---------------------------------------------------------------------
-- Uploads: owner-only (+ admin oversight)
-- ---------------------------------------------------------------------
create policy "users manage own uploads" on uploads
  for all using (auth.uid() = user_id or is_admin())
  with check (auth.uid() = user_id or is_admin());

-- ---------------------------------------------------------------------
-- Notifications: owner-only read/update; system/admin inserts
-- ---------------------------------------------------------------------
create policy "users read own notifications" on notifications
  for select using (auth.uid() = user_id or is_admin());
create policy "users update own notifications" on notifications
  for update using (auth.uid() = user_id or is_admin()) with check (auth.uid() = user_id or is_admin());
create policy "admin insert notifications" on notifications
  for insert with check (is_admin());
create policy "admin delete notifications" on notifications
  for delete using (is_admin());

-- ---------------------------------------------------------------------
-- Activity logs: users see their own; only admin sees all; inserts via
-- security-definer functions/service role only (no public insert policy)
-- ---------------------------------------------------------------------
create policy "users read own activity" on activity_logs
  for select using (auth.uid() = user_id or is_admin());
