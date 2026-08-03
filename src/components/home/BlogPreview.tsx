import Link from "next/link";
import { Button } from "@/components/ui/Button";

const POSTS = [
  {
    title: "Row Level Security patterns that actually scale",
    slug: "row-level-security-patterns",
    excerpt: "How we structure Supabase RLS policies for multi-role SaaS apps without hurting query performance.",
    date: "2026-06-14"
  },
  {
    title: "Designing a CV builder people actually finish",
    slug: "designing-a-cv-builder",
    excerpt: "The UX decisions behind reducing CV builder drop-off — from section ordering to autosave.",
    date: "2026-05-28"
  },
  {
    title: "Shipping fast on Vercel without cutting corners",
    slug: "shipping-fast-on-vercel",
    excerpt: "A practical checklist for performance, caching, and SEO before every production deploy.",
    date: "2026-05-02"
  }
];

export function BlogPreview() {
  return (
    <section className="section-padding bg-ink-900/[0.02] dark:bg-paper/[0.02]">
      <div className="container-max">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            From the blog
          </h2>
          <Button href="/blog" variant="ghost">
            Read all posts
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-ink-900/10 p-6 transition-colors hover:border-signal-500 dark:border-paper/10"
            >
              <time
                dateTime={post.date}
                className="font-mono text-xs text-ink-900/45 dark:text-paper/45"
              >
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}
              </time>
              <h3 className="mt-3 font-display text-lg font-semibold group-hover:text-signal-500">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-ink-900/60 dark:text-paper/60">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
