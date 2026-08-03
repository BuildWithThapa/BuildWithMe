"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost, updateBlogPost, type BlogFormInput } from "@/app/actions/blog";
import { ImageUploader } from "@/components/uploads/ImageUploader";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

interface BlogFormProps {
  categories: { id: string; name: string }[];
  postId?: string;
  initialValues?: Partial<BlogFormInput>;
}

const EMPTY: BlogFormInput = {
  title: "",
  categoryId: null,
  excerpt: "",
  content: "",
  coverImageUrl: "",
  isPublished: false,
  seoTitle: "",
  seoDescription: ""
};

export function BlogForm({ categories, postId, initialValues }: BlogFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState<BlogFormInput>({ ...EMPTY, ...initialValues });
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof BlogFormInput>(key: K, value: BlogFormInput[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = postId ? await updateBlogPost(postId, values) : await createBlogPost(values);
      // createBlogPost redirects server-side on success and never returns here.
      if (!result.success) {
        setError(result.error);
      } else if (postId) {
        router.push("/admin/blog");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        id="title"
        label="Title"
        value={values.title}
        onChange={(e) => set("title", e.target.value)}
        required
      />

      <div>
        <label className="mb-1.5 block text-sm font-medium">Category</label>
        <select
          value={values.categoryId ?? ""}
          onChange={(e) => set("categoryId", e.target.value || null)}
          className="w-full rounded-lg border border-ink-900/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-signal-500 dark:border-paper/20"
        >
          <option value="">No category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <FormField
        id="excerpt"
        label="Excerpt"
        value={values.excerpt}
        onChange={(e) => set("excerpt", e.target.value)}
      />

      <div>
        <label className="mb-1.5 block text-sm font-medium">Content</label>
        <textarea
          rows={12}
          value={values.content}
          onChange={(e) => set("content", e.target.value)}
          className="w-full rounded-lg border border-ink-900/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-signal-500 dark:border-paper/20"
        />
      </div>

      <ImageUploader
        bucket="uploads"
        folder="blog-covers"
        aspect="video"
        label="Cover image"
        initialUrl={values.coverImageUrl}
        onUploaded={(url) => set("coverImageUrl", url)}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          id="seoTitle"
          label="SEO title"
          value={values.seoTitle}
          onChange={(e) => set("seoTitle", e.target.value)}
        />
        <FormField
          id="seoDescription"
          label="SEO description"
          value={values.seoDescription}
          onChange={(e) => set("seoDescription", e.target.value)}
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={values.isPublished}
          onChange={(e) => set("isPublished", e.target.checked)}
          className="h-4 w-4 rounded border-ink-900/30"
        />
        Published
      </label>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : postId ? "Save changes" : "Publish post"}
      </Button>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  );
}
