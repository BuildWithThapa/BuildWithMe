import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/types";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on engineering, design, and building products."
};

export default async function BlogListPage() {
  const supabase = createClient();
  const { data: posts } = await supabase
    .from("blogs")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  return (
    <div className="section-padding">
      <div className="container-max max-w-3xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">Blog</h1>
        <p className="mt-3 text-ink-900/65 dark:text-paper/65">
          Notes on engineering, design, and building products.
        </p>

        <div className="mt-10 divide-y divide-ink-900/10 dark:divide-paper/10">
          {(!posts || posts.length === 0) && (
            <p className="py-8 text-sm text-ink-900/50 dark:text-paper/50">
              No posts published yet — check back soon.
            </p>
          )}
          {(posts as BlogPost[] | null)?.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block py-8">
              {post.published_at && (
                <time className="font-mono text-xs text-ink-900/45 dark:text-paper/45">
                  {new Date(post.published_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })}
                </time>
              )}
              <h2 className="mt-2 font-display text-2xl font-semibold group-hover:text-signal-500">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="mt-2 text-ink-900/65 dark:text-paper/65">{post.excerpt}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
