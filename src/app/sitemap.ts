import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://buildwiththapa.np";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/portfolio`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/cv-builder`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.5 }
  ];

  try {
    const supabase = createClient();

    const [{ data: projects }, { data: posts }] = await Promise.all([
      supabase.from("projects").select("slug, updated_at").eq("is_published", true),
      supabase.from("blogs").select("slug, updated_at").eq("is_published", true)
    ]);

    const projectRoutes: MetadataRoute.Sitemap =
      projects?.map((p) => ({
        url: `${siteUrl}/portfolio/${p.slug}`,
        lastModified: p.updated_at,
        changeFrequency: "monthly",
        priority: 0.6
      })) ?? [];

    const blogRoutes: MetadataRoute.Sitemap =
      posts?.map((b) => ({
        url: `${siteUrl}/blog/${b.slug}`,
        lastModified: b.updated_at,
        changeFrequency: "monthly",
        priority: 0.6
      })) ?? [];

    return [...staticRoutes, ...projectRoutes, ...blogRoutes];
  } catch {
    // If Supabase isn't configured yet (e.g. local build without env vars),
    // fall back to static routes so the build doesn't fail.
    return staticRoutes;
  }
}
