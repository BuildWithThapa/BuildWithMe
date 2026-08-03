"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/utils";
import { requireAdmin } from "@/lib/auth-guards";

export type BlogActionResult = { success: true } | { success: false; error: string };

export interface BlogFormInput {
  title: string;
  categoryId: string | null;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  isPublished: boolean;
  seoTitle: string;
  seoDescription: string;
}

export async function createBlogPost(input: BlogFormInput): Promise<BlogActionResult> {
  const { supabase, userId } = await requireAdmin();

  const { error } = await supabase.from("blogs").insert({
    title: input.title,
    slug: slugify(input.title),
    category_id: input.categoryId,
    excerpt: input.excerpt,
    content: input.content,
    cover_image_url: input.coverImageUrl || null,
    author_id: userId,
    is_published: input.isPublished,
    published_at: input.isPublished ? new Date().toISOString() : null,
    seo_title: input.seoTitle || null,
    seo_description: input.seoDescription || null
  });

  if (error) {
    return { success: false, error: "Could not create post." };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, input: BlogFormInput): Promise<BlogActionResult> {
  const { supabase } = await requireAdmin();

  const { data: existing } = await supabase
    .from("blogs")
    .select("is_published, published_at")
    .eq("id", id)
    .single();

  const { error } = await supabase
    .from("blogs")
    .update({
      title: input.title,
      category_id: input.categoryId,
      excerpt: input.excerpt,
      content: input.content,
      cover_image_url: input.coverImageUrl || null,
      is_published: input.isPublished,
      published_at:
        input.isPublished && !existing?.published_at
          ? new Date().toISOString()
          : existing?.published_at,
      seo_title: input.seoTitle || null,
      seo_description: input.seoDescription || null
    })
    .eq("id", id);

  if (error) {
    return { success: false, error: "Could not update post." };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { success: true };
}

export async function deleteBlogPost(id: string): Promise<BlogActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("blogs").delete().eq("id", id);

  if (error) {
    return { success: false, error: "Could not delete post." };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { success: true };
}
