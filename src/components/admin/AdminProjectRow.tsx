"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Trash2, ExternalLink } from "lucide-react";
import { deleteProject } from "@/app/actions/portfolio";
import type { Project } from "@/types";

export function AdminProjectRow({ project }: { project: Project }) {
  const [isPending, startTransition] = useTransition();
  const [hidden, setHidden] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (hidden) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4">
      <div>
        <div className="flex items-center gap-2">
          <p className="font-medium">{project.title}</p>
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
              project.is_published
                ? "bg-success/10 text-success"
                : "bg-ink-900/10 text-ink-900/50 dark:bg-paper/10 dark:text-paper/50"
            }`}
          >
            {project.is_published ? "Published" : "Draft"}
          </span>
          {project.is_featured && (
            <span className="rounded-full bg-signal-500/10 px-2 py-0.5 text-[11px] font-medium text-signal-500">
              Featured
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-ink-900/50 dark:text-paper/50">/{project.slug}</p>
      </div>

      <div className="flex items-center gap-2 text-xs">
        <Link
          href={`/portfolio/${project.slug}`}
          target="_blank"
          className="flex items-center gap-1 rounded-full border border-ink-900/10 px-3 py-1.5 dark:border-paper/15"
        >
          <ExternalLink size={12} /> View
        </Link>
        <Link
          href={`/admin/portfolio/${project.id}`}
          className="rounded-full border border-ink-900/10 px-3 py-1.5 font-medium dark:border-paper/15"
        >
          Edit
        </Link>
        {confirmDelete ? (
          <button
            type="button"
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                const result = await deleteProject(project.id);
                if (result.success) setHidden(true);
              })
            }
            className="flex items-center gap-1 rounded-full bg-red-500 px-3 py-1.5 font-medium text-white"
          >
            <Trash2 size={12} /> Confirm
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="flex items-center gap-1 rounded-full border border-ink-900/10 px-3 py-1.5 text-red-500 dark:border-paper/15"
          >
            <Trash2 size={12} />
          </button>
        )}
      </div>
    </div>
  );
}
