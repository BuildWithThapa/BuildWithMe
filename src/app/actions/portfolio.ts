"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/utils";
import { requireAdmin } from "@/lib/auth-guards";

export type ProjectActionResult = { success: true } | { success: false; error: string };

export interface ProjectFormInput {
  title: string;
  categoryId: string | null;
  shortDescription: string;
  description: string;
  techStack: string; // comma-separated in the form, split before saving
  githubUrl: string;
  liveUrl: string;
  coverImageUrl: string;
  isFeatured: boolean;
  isPublished: boolean;
}

export async function createProject(input: ProjectFormInput): Promise<ProjectActionResult> {
  const { supabase, userId } = await requireAdmin();

  const slug = slugify(input.title);
  const { error } = await supabase.from("projects").insert({
    title: input.title,
    slug,
    category_id: input.categoryId,
    short_description: input.shortDescription,
    description: input.description,
    tech_stack: input.techStack.split(",").map((t) => t.trim()).filter(Boolean),
    github_url: input.githubUrl || null,
    live_url: input.liveUrl || null,
    cover_image_url: input.coverImageUrl || null,
    is_featured: input.isFeatured,
    is_published: input.isPublished,
    created_by: userId
  });

  if (error) {
    return { success: false, error: error.message.includes("duplicate") ? "A project with this title already exists." : "Could not create project." };
  }

  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  redirect("/admin/portfolio");
}

export async function updateProject(id: string, input: ProjectFormInput): Promise<ProjectActionResult> {
  const { supabase } = await requireAdmin();

  const { error } = await supabase
    .from("projects")
    .update({
      title: input.title,
      category_id: input.categoryId,
      short_description: input.shortDescription,
      description: input.description,
      tech_stack: input.techStack.split(",").map((t) => t.trim()).filter(Boolean),
      github_url: input.githubUrl || null,
      live_url: input.liveUrl || null,
      cover_image_url: input.coverImageUrl || null,
      is_featured: input.isFeatured,
      is_published: input.isPublished
    })
    .eq("id", id);

  if (error) {
    return { success: false, error: "Could not update project." };
  }

  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  return { success: true };
}

export async function deleteProject(id: string): Promise<ProjectActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    return { success: false, error: "Could not delete project." };
  }

  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  return { success: true };
}
