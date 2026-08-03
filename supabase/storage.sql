-- =====================================================================
-- BuildWithThapa — Storage Buckets & Policies
-- Run AFTER schema.sql and policies.sql
-- =====================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('profiles', 'profiles', true,  5242880,  array['image/jpeg','image/png','image/webp']),
  ('projects', 'projects', true,  10485760, array['image/jpeg','image/png','image/webp']),
  ('cv',       'cv',       true,  5242880,  array['image/jpeg','image/png','image/webp']),
  ('uploads',  'uploads',  false, 10485760, array['image/jpeg','image/png','image/webp','application/pdf'])
on conflict (id) do nothing;

-- Public buckets: anyone can view; only the owning user (folder = user id) or
-- an admin may write. Files must be uploaded under a path of `${auth.uid()}/...`.

create policy "public read profiles bucket" on storage.objects
  for select using (bucket_id = 'profiles');
create policy "users upload own profile images" on storage.objects
  for insert with check (
    bucket_id = 'profiles' and (storage.foldername(name))[1] = auth.uid()::text
  );
create policy "users update own profile images" on storage.objects
  for update using (
    bucket_id = 'profiles' and (storage.foldername(name))[1] = auth.uid()::text
  );
create policy "users delete own profile images" on storage.objects
  for delete using (
    bucket_id = 'profiles' and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "public read projects bucket" on storage.objects
  for select using (bucket_id = 'projects');
create policy "admin manage projects bucket" on storage.objects
  for insert with check (bucket_id = 'projects' and is_admin());
create policy "admin update projects bucket" on storage.objects
  for update using (bucket_id = 'projects' and is_admin());
create policy "admin delete projects bucket" on storage.objects
  for delete using (bucket_id = 'projects' and is_admin());

create policy "public read cv bucket" on storage.objects
  for select using (bucket_id = 'cv');
create policy "users upload own cv assets" on storage.objects
  for insert with check (
    bucket_id = 'cv' and (storage.foldername(name))[1] = auth.uid()::text
  );
create policy "users manage own cv assets" on storage.objects
  for update using (
    bucket_id = 'cv' and (storage.foldername(name))[1] = auth.uid()::text
  );
create policy "users delete own cv assets" on storage.objects
  for delete using (
    bucket_id = 'cv' and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Private bucket: strictly owner + admin
create policy "users read own uploads" on storage.objects
  for select using (
    bucket_id = 'uploads' and (
      (storage.foldername(name))[1] = auth.uid()::text or is_admin()
    )
  );
create policy "users upload own files" on storage.objects
  for insert with check (
    bucket_id = 'uploads' and (storage.foldername(name))[1] = auth.uid()::text
  );
create policy "users delete own files" on storage.objects
  for delete using (
    bucket_id = 'uploads' and (
      (storage.foldername(name))[1] = auth.uid()::text or is_admin()
    )
  );
