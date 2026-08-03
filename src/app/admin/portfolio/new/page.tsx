import { createClient } from "@/lib/supabase/server";
import { ProjectForm } from "@/components/admin/ProjectForm";
import type { ProjectCategory } from "@/types";

export default async function NewProjectPage() {
  const supabase = createClient();
  const { data: categories } = await supabase.from("project_categories").select("*").order("name");

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight">New project</h1>
      <div className="mt-8 max-w-2xl">
        <ProjectForm categories={(categories as ProjectCategory[] | null) ?? []} />
      </div>
    </div>
  );
}
