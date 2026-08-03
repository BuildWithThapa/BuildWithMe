import { createClient } from "@/lib/supabase/server";
import { BlogForm } from "@/components/admin/BlogForm";

export default async function NewBlogPostPage() {
  const supabase = createClient();
  const { data: categories } = await supabase.from("blog_categories").select("id, name").order("name");

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight">New post</h1>
      <div className="mt-8 max-w-2xl">
        <BlogForm categories={categories ?? []} />
      </div>
    </div>
  );
}
