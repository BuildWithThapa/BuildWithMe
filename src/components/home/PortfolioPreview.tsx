import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Placeholder data for phase 1. Phase 2 replaces this with a Supabase query
// against the `projects` table (is_published = true, ordered by display_order).
const PROJECTS = [
  {
    title: "Himal Analytics",
    slug: "himal-analytics",
    description: "A real-time analytics dashboard for e-commerce teams.",
    tech: ["Next.js", "Supabase", "Recharts"]
  },
  {
    title: "TrekMate Nepal",
    slug: "trekmate-nepal",
    description: "Trip planning platform for guided treks across Nepal.",
    tech: ["React", "PostgreSQL", "Stripe"]
  },
  {
    title: "Everest Ledger",
    slug: "everest-ledger",
    description: "Invoicing and bookkeeping tool for small studios.",
    tech: ["TypeScript", "Node.js", "jsPDF"]
  }
];

export function PortfolioPreview() {
  return (
    <section id="portfolio" className="section-padding">
      <div className="container-max">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Selected work
            </h2>
            <p className="mt-3 max-w-xl text-ink-900/65 dark:text-paper/65">
              A sample of recent projects — full case studies, live demos, and
              source links live on the portfolio page.
            </p>
          </div>
          <Button href="/portfolio" variant="ghost">
            View all projects
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group rounded-2xl border border-ink-900/10 p-6 transition-colors hover:border-signal-500 dark:border-paper/10"
            >
              <div className="mb-6 flex aspect-video items-center justify-center rounded-xl bg-signal-gradient/10 bg-ink-900/[0.03] dark:bg-paper/[0.03]">
                <span className="font-mono text-xs text-ink-900/40 dark:text-paper/40">
                  Project preview
                </span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-lg font-semibold">{project.title}</h3>
                <ArrowUpRight
                  size={18}
                  className="mt-1 shrink-0 text-ink-900/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal-500 dark:text-paper/40"
                />
              </div>
              <p className="mt-2 text-sm text-ink-900/60 dark:text-paper/60">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
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
    </section>
  );
}
