import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Project, ProjectCategory } from "@/types";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected projects — full case studies, live demos, and source links."
};

export default async function PortfolioPage({
  searchParams
}: {
  searchParams: { category?: string; q?: string };
}) {
  const supabase = createClient();

  const { data: categories } = await supabase
    .from("project_categories")
    .select("*")
    .order("name");

  let query = supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .order("display_order");

  if (searchParams.category) {
    const category = (categories as ProjectCategory[] | null)?.find(
      (c) => c.slug === searchParams.category
    );
    if (category) query = query.eq("category_id", category.id);
  }

  if (searchParams.q) {
    query = query.ilike("title", `%${searchParams.q}%`);
  }

  const { data: projects } = await query;

  return (
    <div className="section-padding">
      <div className="container-max">
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Portfolio
        </h1>
        <p className="mt-3 max-w-xl text-ink-900/65 dark:text-paper/65">
          Full case studies, live demos, and source links for recent work.
        </p>

        <form className="mt-8 flex flex-wrap gap-3" method="get">
          <input
            type="search"
            name="q"
            defaultValue={searchParams.q}
            placeholder="Search projects..."
            className="min-w-[220px] flex-1 rounded-full border border-ink-900/15 bg-transparent px-4 py-2 text-sm outline-none focus:border-signal-500 dark:border-paper/20"
          />
          <div className="flex flex-wrap gap-2">
            <Link
              href="/portfolio"
              className={`rounded-full border px-4 py-2 text-sm ${
                !searchParams.category
                  ? "border-signal-500 bg-signal-500/10 text-signal-500"
                  : "border-ink-900/15 dark:border-paper/20"
              }`}
            >
              All
            </Link>
            {(categories as ProjectCategory[] | null)?.map((cat) => (
              <Link
                key={cat.id}
                href={`/portfolio?category=${cat.slug}`}
                className={`rounded-full border px-4 py-2 text-sm ${
                  searchParams.category === cat.slug
                    ? "border-signal-500 bg-signal-500/10 text-signal-500"
                    : "border-ink-900/15 dark:border-paper/20"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </form>

        {(!projects || projects.length === 0) && (
          <p className="mt-12 text-sm text-ink-900/50 dark:text-paper/50">
            No projects match your filters yet.
          </p>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(projects as Project[] | null)?.map((project) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className="group rounded-2xl border border-ink-900/10 p-6 transition-colors hover:border-signal-500 dark:border-paper/10"
            >
              <div className="mb-6 flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-ink-900/[0.03] dark:bg-paper/[0.03]">
                {project.cover_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.cover_image_url}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-mono text-xs text-ink-900/40 dark:text-paper/40">
                    Project preview
                  </span>
                )}
              </div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-lg font-semibold">{project.title}</h3>
                <ArrowUpRight
                  size={18}
                  className="mt-1 shrink-0 text-ink-900/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal-500 dark:text-paper/40"
                />
              </div>
              <p className="mt-2 text-sm text-ink-900/60 dark:text-paper/60">
                {project.short_description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech_stack.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-ink-900/5 px-2.5 py-1 font-mono text-xs text-ink-900/60 dark:bg-paper/5 dark:text-paper/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
