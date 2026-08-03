"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createProject, updateProject, type ProjectFormInput } from "@/app/actions/portfolio";
import { ImageUploader } from "@/components/uploads/ImageUploader";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import type { ProjectCategory } from "@/types";

interface ProjectFormProps {
  categories: ProjectCategory[];
  projectId?: string;
  initialValues?: Partial<ProjectFormInput>;
}

const EMPTY: ProjectFormInput = {
  title: "",
  categoryId: null,
  shortDescription: "",
  description: "",
  techStack: "",
  githubUrl: "",
  liveUrl: "",
  coverImageUrl: "",
  isFeatured: false,
  isPublished: true
};

export function ProjectForm({ categories, projectId, initialValues }: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState<ProjectFormInput>({ ...EMPTY, ...initialValues });
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof ProjectFormInput>(key: K, value: ProjectFormInput[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = projectId
        ? await updateProject(projectId, values)
        : await createProject(values);
      // createProject redirects server-side on success and never returns here.
      if (result && !result.success) {
        setError(result.error);
      } else if (projectId) {
        router.push("/admin/portfolio");
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
        id="shortDescription"
        label="Short description"
        value={values.shortDescription}
        onChange={(e) => set("shortDescription", e.target.value)}
      />

      <div>
        <label className="mb-1.5 block text-sm font-medium">Full description</label>
        <textarea
          rows={6}
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          className="w-full rounded-lg border border-ink-900/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-signal-500 dark:border-paper/20"
        />
      </div>

      <FormField
        id="techStack"
        label="Tech stack (comma-separated)"
        value={values.techStack}
        onChange={(e) => set("techStack", e.target.value)}
        placeholder="React, Supabase, Tailwind"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          id="githubUrl"
          label="GitHub URL"
          type="url"
          value={values.githubUrl}
          onChange={(e) => set("githubUrl", e.target.value)}
        />
        <FormField
          id="liveUrl"
          label="Live demo URL"
          type="url"
          value={values.liveUrl}
          onChange={(e) => set("liveUrl", e.target.value)}
        />
      </div>

      <ImageUploader
        bucket="projects"
        folder="covers"
        aspect="video"
        label="Cover image"
        initialUrl={values.coverImageUrl}
        onUploaded={(url) => set("coverImageUrl", url)}
      />

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={values.isFeatured}
            onChange={(e) => set("isFeatured", e.target.checked)}
            className="h-4 w-4 rounded border-ink-900/30"
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={values.isPublished}
            onChange={(e) => set("isPublished", e.target.checked)}
            className="h-4 w-4 rounded border-ink-900/30"
          />
          Published
        </label>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : projectId ? "Save changes" : "Create project"}
      </Button>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  );
}
