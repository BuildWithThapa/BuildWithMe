import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProjectForm } from "@/components/admin/ProjectForm";
import type { ProjectCategory, Project } from "@/types";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const [{ data: project }, { data: categories }] = await Promise.all([
    supabase.from("projects").select("*").eq("id", params.id).single(),
    supabase.from("project_categories").select("*").order("name")
  ]);

  if (!project) notFound();
  const p = project as Project;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight">Edit project</h1>
      <div className="mt-8 max-w-2xl">
        <ProjectForm
          categories={(categories as ProjectCategory[] | null) ?? []}
          projectId={p.id}
          initialValues={{
            title: p.title,
            categoryId: p.category_id,
            shortDescription: p.short_description ?? "",
            description: p.description ?? "",
            techStack: p.tech_stack.join(", "),
            githubUrl: p.github_url ?? "",
            liveUrl: p.live_url ?? "",
            coverImageUrl: p.cover_image_url ?? "",
            isFeatured: p.is_featured,
            isPublished: p.is_published
          }}
        />
      </div>
    </div>
  );
}
