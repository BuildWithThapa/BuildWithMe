import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BlogForm } from "@/components/admin/BlogForm";
import type { BlogPost } from "@/types";

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const [{ data: post }, { data: categories }] = await Promise.all([
    supabase.from("blogs").select("*").eq("id", params.id).single(),
    supabase.from("blog_categories").select("id, name").order("name")
  ]);

  if (!post) notFound();
  const p = post as BlogPost;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight">Edit post</h1>
      <div className="mt-8 max-w-2xl">
        <BlogForm
          categories={categories ?? []}
          postId={p.id}
          initialValues={{
            title: p.title,
            categoryId: p.category_id,
            excerpt: p.excerpt ?? "",
            content: p.content,
            coverImageUrl: p.cover_image_url ?? "",
            isPublished: p.is_published,
            seoTitle: p.seo_title ?? "",
            seoDescription: p.seo_description ?? ""
          }}
        />
      </div>
    </div>
  );
}
