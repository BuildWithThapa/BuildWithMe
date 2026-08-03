"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Copy, Trash2, FileText } from "lucide-react";
import { duplicateCv, deleteCv } from "@/app/actions/cv";
import type { Cv } from "@/types";

export function CvListItem({ cv }: { cv: Cv }) {
  const [isPending, startTransition] = useTransition();
  const [hidden, setHidden] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (hidden) return null;

  return (
    <div className="rounded-2xl border border-ink-900/10 p-5 dark:border-paper/10">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-signal-500/10 text-signal-500">
            <FileText size={16} />
          </span>
          <div>
            <Link href={`/dashboard/cvs/${cv.id}`} className="font-medium hover:text-signal-500">
              {cv.title}
            </Link>
            <p className="text-xs text-ink-900/45 dark:text-paper/45">
              Updated {new Date(cv.updated_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2 text-xs">
        <Link
          href={`/dashboard/cvs/${cv.id}`}
          className="rounded-full border border-ink-900/10 px-3 py-1.5 font-medium hover:bg-ink-900/5 dark:border-paper/15 dark:hover:bg-paper/10"
        >
          Edit
        </Link>
        <button
          type="button"
          disabled={isPending}
          onClick={() =>
            startTransition(() => {
              duplicateCv(cv.id);
            })
          }
          className="flex items-center gap-1 rounded-full border border-ink-900/10 px-3 py-1.5 font-medium hover:bg-ink-900/5 dark:border-paper/15 dark:hover:bg-paper/10"
        >
          <Copy size={12} /> Duplicate
        </button>
        {confirmDelete ? (
          <button
            type="button"
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                const result = await deleteCv(cv.id);
                if (result.success) setHidden(true);
              })
            }
            className="flex items-center gap-1 rounded-full bg-red-500 px-3 py-1.5 font-medium text-white"
          >
            <Trash2 size={12} /> Confirm delete
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="flex items-center gap-1 rounded-full border border-ink-900/10 px-3 py-1.5 font-medium text-red-500 hover:bg-red-500/10 dark:border-paper/15"
          >
            <Trash2 size={12} /> Delete
          </button>
        )}
      </div>
    </div>
  );
}
