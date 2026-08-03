"use client";

import { useEffect, useRef, useState } from "react";
import { renameCv } from "@/app/actions/cv";

export function CvTitleEditor({ cvId, initialTitle }: { cvId: string; initialTitle: string }) {
  const [title, setTitle] = useState(initialTitle);
  const [status, setStatus] = useState<"idle" | "saved">("idle");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      renameCv(cvId, title).then((r) => r.success && setStatus("saved"));
    }, 700);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return (
    <div className="mt-1 flex items-center gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="CV title"
        className="font-display text-2xl font-semibold tracking-tight outline-none focus:border-b focus:border-signal-500 bg-transparent"
      />
      {status === "saved" && <span className="text-xs text-ink-900/40 dark:text-paper/40">Saved</span>}
    </div>
  );
}
