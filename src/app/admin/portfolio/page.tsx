import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AdminProjectRow } from "@/components/admin/AdminProjectRow";
import type { Project } from "@/types";

export default async function AdminPortfolioPage() {
  const supabase = createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("display_order");

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold tracking-tight">Portfolio</h1>
        <Link
          href="/admin/portfolio/new"
          className="flex items-center gap-2 rounded-full bg-signal-500 px-4 py-2 text-sm font-medium text-white"
        >
          <Plus size={14} /> New project
        </Link>
      </div>

      <div className="mt-8 divide-y divide-ink-900/10 rounded-2xl border border-ink-900/10 dark:divide-paper/10 dark:border-paper/10">
        {(!projects || projects.length === 0) && (
          <p className="p-6 text-sm text-ink-900/50 dark:text-paper/50">No projects yet.</p>
        )}
        {(projects as Project[] | null)?.map((project) => (
          <AdminProjectRow key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
