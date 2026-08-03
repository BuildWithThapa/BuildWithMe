import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AdminBlogRow } from "@/components/admin/AdminBlogRow";
import type { BlogPost } from "@/types";

export default async function AdminBlogPage() {
  const supabase = createClient();
  const { data: posts } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold tracking-tight">Blog</h1>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 rounded-full bg-signal-500 px-4 py-2 text-sm font-medium text-white"
        >
          <Plus size={14} /> New post
        </Link>
      </div>

      <div className="mt-8 divide-y divide-ink-900/10 rounded-2xl border border-ink-900/10 dark:divide-paper/10 dark:border-paper/10">
        {(!posts || posts.length === 0) && (
          <p className="p-6 text-sm text-ink-900/50 dark:text-paper/50">No posts yet.</p>
        )}
        {(posts as BlogPost[] | null)?.map((post) => (
          <AdminBlogRow key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
