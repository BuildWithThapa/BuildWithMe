import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/types";

interface Props {
  params: { slug: string };
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  return data as BlogPost | null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};
  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt || undefined,
    openGraph: post.cover_image_url ? { images: [{ url: post.cover_image_url }] } : undefined
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <div className="section-padding">
      <article className="container-max max-w-2xl">
        <Link href="/blog" className="text-sm text-ink-900/50 dark:text-paper/50">
          ← Back to blog
        </Link>

        {post.published_at && (
          <time className="mt-4 block font-mono text-xs text-ink-900/45 dark:text-paper/45">
            {new Date(post.published_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric"
            })}
          </time>
        )}
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">{post.title}</h1>

        {post.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="mt-8 w-full rounded-2xl border border-ink-900/10 dark:border-paper/10"
          />
        )}

        <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
          <p className="whitespace-pre-line leading-relaxed text-ink-900/80 dark:text-paper/80">
            {post.content}
          </p>
        </div>
      </article>
    </div>
  );
}
