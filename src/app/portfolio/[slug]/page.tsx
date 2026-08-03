import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/types";

interface Props {
  params: { slug: string };
}

async function getProject(slug: string): Promise<Project | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  return data as Project | null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.short_description ?? undefined,
    openGraph: project.cover_image_url ? { images: [{ url: project.cover_image_url }] } : undefined
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  return (
    <div className="section-padding">
      <div className="container-max max-w-3xl">
        <Link href="/portfolio" className="text-sm text-ink-900/50 dark:text-paper/50">
          ← Back to portfolio
        </Link>

        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
          {project.title}
        </h1>
        {project.short_description && (
          <p className="mt-3 text-lg text-ink-900/65 dark:text-paper/65">
            {project.short_description}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-ink-900/15 px-4 py-2 text-sm dark:border-paper/20"
            >
              <Github size={14} /> Source
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-signal-500 px-4 py-2 text-sm text-white"
            >
              <ExternalLink size={14} /> Live demo
            </a>
          )}
        </div>

        {project.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.cover_image_url}
            alt={project.title}
            className="mt-8 w-full rounded-2xl border border-ink-900/10 dark:border-paper/10"
          />
        )}

        {project.description && (
          <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
            <p className="whitespace-pre-line text-ink-900/80 dark:text-paper/80">
              {project.description}
            </p>
          </div>
        )}

        {project.tech_stack.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {project.tech_stack.map((t) => (
              <span
                key={t}
                className="rounded-full bg-ink-900/5 px-3 py-1 font-mono text-xs text-ink-900/60 dark:bg-paper/5 dark:text-paper/60"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
