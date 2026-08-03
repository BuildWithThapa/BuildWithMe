"use client";

import { useState, useTransition } from "react";
import { Trash2, Star } from "lucide-react";
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  type TestimonialFormInput
} from "@/app/actions/testimonials";
import { ImageUploader } from "@/components/uploads/ImageUploader";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import type { Testimonial } from "@/types";

const EMPTY: TestimonialFormInput = {
  clientName: "",
  clientRole: "",
  clientCompany: "",
  clientAvatarUrl: "",
  content: "",
  rating: 5,
  isPublished: true
};

export function TestimonialCard({ testimonial }: { testimonial?: Testimonial }) {
  const [isPending, startTransition] = useTransition();
  const [hidden, setHidden] = useState(false);
  const [values, setValues] = useState<TestimonialFormInput>(
    testimonial
      ? {
          clientName: testimonial.client_name,
          clientRole: testimonial.client_role ?? "",
          clientCompany: testimonial.client_company ?? "",
          clientAvatarUrl: testimonial.client_avatar_url ?? "",
          content: testimonial.content,
          rating: testimonial.rating,
          isPublished: testimonial.is_published
        }
      : EMPTY
  );
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  const set = <K extends keyof TestimonialFormInput>(key: K, value: TestimonialFormInput[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  if (hidden) return null;

  const handleSave = () => {
    startTransition(async () => {
      const result = testimonial
        ? await updateTestimonial(testimonial.id, values)
        : await createTestimonial(values);
      setStatus(result.success ? "saved" : "error");
      if (result.success && !testimonial) setValues(EMPTY);
    });
  };

  return (
    <div className="rounded-2xl border border-ink-900/10 p-6 dark:border-paper/10">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id={`name-${testimonial?.id ?? "new"}`}
          label="Client name"
          value={values.clientName}
          onChange={(e) => set("clientName", e.target.value)}
        />
        <FormField
          id={`role-${testimonial?.id ?? "new"}`}
          label="Role"
          value={values.clientRole}
          onChange={(e) => set("clientRole", e.target.value)}
        />
        <FormField
          id={`company-${testimonial?.id ?? "new"}`}
          label="Company"
          value={values.clientCompany}
          onChange={(e) => set("clientCompany", e.target.value)}
        />
        <div>
          <label className="mb-1.5 block text-sm font-medium">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => set("rating", star)}
                aria-label={`${star} star${star > 1 ? "s" : ""}`}
              >
                <Star
                  size={20}
                  className={star <= values.rating ? "text-warning" : "text-ink-900/15 dark:text-paper/15"}
                  fill={star <= values.rating ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium">Testimonial</label>
        <textarea
          rows={3}
          value={values.content}
          onChange={(e) => set("content", e.target.value)}
          className="w-full rounded-lg border border-ink-900/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-signal-500 dark:border-paper/20"
        />
      </div>

      <div className="mt-4">
        <ImageUploader
          bucket="uploads"
          folder="testimonial-avatars"
          label="Avatar"
          initialUrl={values.clientAvatarUrl}
          onUploaded={(url) => set("clientAvatarUrl", url)}
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={values.isPublished}
            onChange={(e) => set("isPublished", e.target.checked)}
            className="h-4 w-4 rounded border-ink-900/30"
          />
          Published
        </label>

        <div className="flex items-center gap-3">
          {status === "saved" && <span className="text-xs text-success">Saved</span>}
          {status === "error" && <span className="text-xs text-red-500">Save failed</span>}
          {testimonial && (
            <button
              type="button"
              disabled={isPending}
              onClick={() =>
                startTransition(async () => {
                  const result = await deleteTestimonial(testimonial.id);
                  if (result.success) setHidden(true);
                })
              }
              className="flex items-center gap-1 rounded-full border border-ink-900/10 px-3 py-1.5 text-xs text-red-500 dark:border-paper/15"
            >
              <Trash2 size={12} /> Delete
            </button>
          )}
          <Button type="button" size="sm" disabled={isPending} onClick={handleSave}>
            {isPending ? "Saving..." : testimonial ? "Save" : "Add testimonial"}
          </Button>
        </div>
      </div>
    </div>
  );
}
