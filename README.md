# BuildWithThapa

**Building Modern Web Experiences & Digital Solutions**

A production-grade SaaS platform: portfolio, services, blog, a free CV
builder, user dashboard, and admin panel — built on Next.js 14 (App Router),
Tailwind CSS, and Supabase (Postgres + Auth + Storage).

## Build status

Full build. Completed:

- **Foundation**: project scaffold, design system, database schema, RLS
  policies, storage buckets, homepage (Hero, Services, Skills, Portfolio
  preview, CV Builder promo, Testimonials, Blog preview, Contact,
  Newsletter), SEO (sitemap, robots, structured data), security headers.
- **Authentication & Dashboard**: register, login, forgot/reset password,
  email confirmation callback, protected middleware, role-aware dashboard
  (overview, profile editor, CV list, generic file uploads, activity log).
- **CV Builder**: 5 templates (Modern, Professional, Creative, Minimal,
  ATS Friendly), a config-driven editor covering all 9 sections (personal
  info, about/career objective, education, experience, projects, skills,
  languages, certifications, references) with autosave, duplicate/delete/
  rename, a live preview with distinct per-template layouts, and PDF export
  (jsPDF + html2canvas, paginated for long CVs).
- **Portfolio**: public listing with category filter + search, project
  detail pages, full admin CRUD with image upload/compression to WebP.
- **Services**: public page driven by the `services`/`packages` tables.
- **Blog**: public listing + detail pages, full admin CRUD.
- **About & Contact**: public pages; contact form is validated, rate-limited,
  and emails an admin notification via SMTP.
- **Admin Panel**: overview stats, Portfolio, Blog, Testimonials, Messages
  (inbox with read/unread + delete), Newsletter (list + CSV export),
  Settings (site/SEO/social links/email, stored in the `settings` table).
- **Email**: SMTP-based welcome email on signup and admin notification on
  contact form submission (via `src/lib/email.ts` + nodemailer).

The full project builds cleanly end-to-end — verified with `tsc --noEmit`,
`eslint`, and a full `next build` producing all 32 routes (temporarily
swapping in system fonts only to work around this authoring sandbox's
network allowlist blocking `fonts.googleapis.com`; not needed on Vercel).

Reasonable follow-ups for a v2, intentionally out of scope here: a rich-text
editor for blog content (currently plain text), category management UI
(categories are seeded via SQL and selectable, but not yet CRUD-able from
the admin panel), granular custom permissions beyond the admin/user roles,
and a Redis-backed rate limiter for multi-region deployments.

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS |
| Backend | Supabase (Postgres, Auth, Storage, Row Level Security) |
| Forms | react-hook-form + Zod |
| PDF | jsPDF + html2canvas (wired in the CV Builder phase) |
| Hosting | Vercel |
| Email | Supabase Auth emails + SMTP for contact/notifications |

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. In the SQL Editor, run the three files in `supabase/` **in this order**:
   1. `schema.sql` — creates all tables, indexes, and triggers
   2. `policies.sql` — enables Row Level Security on every table
   3. `storage.sql` — creates the `profiles`, `projects`, `cv`, and
      `uploads` storage buckets with their access policies
3. In **Authentication → URL Configuration**, set:
   - Site URL: `http://localhost:3000` (dev) / your production URL
   - Redirect URLs: add `http://localhost:3000/auth/callback` and your
     production equivalent
4. In **Authentication → Email Templates**, the default Supabase templates
   work out of the box for confirmation and password reset.
5. To promote a user to admin, run in the SQL Editor:
   ```sql
   update user_profiles
   set role_id = (select id from roles where name = 'admin')
   where id = '<the user''s auth.users id>';
   ```

### 3. Configure environment variables

Copy `.env.example` to `.env.local` and fill in the values from your
Supabase project's **Settings → API** page:

```bash
cp .env.example .env.local
```

**Never commit `.env.local`.** `SUPABASE_SERVICE_ROLE_KEY` in particular
bypasses Row Level Security — it must only ever be used in server-only code
(already the case in `src/lib/supabase/server.ts`'s `createAdminClient`).

### 4. Run the dev server

```bash
npm run dev
```

Visit `http://localhost:3000`.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, "Import Project" from the repo.
3. Add the same environment variables from `.env.local` in
   **Project Settings → Environment Variables** (for Production, Preview,
   and Development as needed).
4. Set `NEXT_PUBLIC_SITE_URL` to your real production domain
   (`https://buildwiththapa.np`) — this feeds SEO metadata, the sitemap, and
   auth redirect URLs.
5. Deploy. Vercel auto-detects Next.js; no custom build command is needed.
6. Back in Supabase, add your production domain to **Authentication → URL
   Configuration → Redirect URLs**.

## Project structure

```
src/
  app/                  # Next.js App Router routes
    actions/            # Server Actions (contact, auth, ...)
    auth/callback/       # Supabase email-link handler
    dashboard/           # Protected user dashboard
    login, register, forgot-password, reset-password/
    layout.tsx           # Root layout: fonts, theme, header/footer
    page.tsx             # Homepage
    sitemap.ts, robots.ts
  components/
    home/                # Homepage sections
    layout/              # Header, Footer
    auth/                # AuthCard wrapper
    dashboard/           # DashboardSidebar
    ui/                  # Button, FormField, ThemeToggle, ThemeProvider
  lib/
    supabase/            # Browser + server Supabase clients
    utils.ts, validation.ts
  middleware.ts          # Session refresh + route protection
  types/index.ts         # Shared TypeScript types matching the DB schema
supabase/
  schema.sql             # Full Postgres schema
  policies.sql           # Row Level Security policies
  storage.sql             # Storage buckets + policies
```

## Security notes

- Every table has Row Level Security enabled; policies are in
  `supabase/policies.sql`. The default posture is deny — access is only
  granted where a policy explicitly allows it.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only and never exposed to the
  client; it's read only inside `createAdminClient()`.
- Contact form and newsletter submissions are rate-limited per IP and
  validated with Zod on the server (client-side validation is a UX
  convenience only, never the security boundary).
- Security headers (CSP, X-Frame-Options, etc.) are set in
  `next.config.mjs`.
- The in-memory rate limiter in `src/app/actions/contact.ts` is scoped to a
  single serverless instance — swap in Upstash Redis (or similar) before
  relying on it at scale across multiple regions.

## Roadmap (next phases)

1. **CV Builder** — template gallery (Modern, Professional, Creative,
   Minimal, ATS Friendly), section editor, autosave to `cv_sections`,
   jsPDF export.
2. **Portfolio** — public listing/filtering/search, project detail pages,
   admin CRUD with image upload to the `projects` bucket.
3. **Admin Panel** — dashboard, content management for every public page,
   user/role management, messages, newsletter subscriber list.
4. **Blog** — public listing + detail pages, admin CRUD, categories/tags.
5. **Email** — SMTP integration for contact-form notifications and welcome
   emails.
6. **About page**, activity log UI, and final performance/SEO pass
   (image optimization audit, Lighthouse pass, structured data for
   articles/products).
