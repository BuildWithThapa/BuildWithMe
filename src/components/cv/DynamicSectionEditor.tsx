"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown, ChevronDown as ChevronDownIcon } from "lucide-react";
import type { SectionConfig } from "@/lib/cv/sectionSchemas";
import { updateCvSection } from "@/app/actions/cv";
import type { CvSectionType } from "@/types";

type Entry = Record<string, string>;

interface DynamicSectionEditorProps {
  cvId: string;
  config: SectionConfig;
  initialData: Record<string, unknown>;
}

function normalizeSingle(data: Record<string, unknown>): Entry {
  const out: Entry = {};
  for (const [k, v] of Object.entries(data)) out[k] = typeof v === "string" ? v : String(v ?? "");
  return out;
}

function normalizeEntries(data: Record<string, unknown>): Entry[] {
  const raw = Array.isArray((data as { entries?: unknown }).entries)
    ? ((data as { entries: unknown[] }).entries as Record<string, unknown>[])
    : [];
  return raw.map((entry) => {
    const out: Entry = {};
    for (const [k, v] of Object.entries(entry)) out[k] = typeof v === "string" ? v : String(v ?? "");
    return out;
  });
}

function FieldInput({
  field,
  value,
  onChange
}: {
  field: SectionConfig["fields"][number];
  value: string;
  onChange: (v: string) => void;
}) {
  const commonClasses =
    "w-full rounded-lg border border-ink-900/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-signal-500 dark:border-paper/20";

  if (field.type === "textarea") {
    return (
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={commonClasses}
      />
    );
  }

  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={value === "true"}
          onChange={(e) => onChange(e.target.checked ? "true" : "false")}
          className="h-4 w-4 rounded border-ink-900/30"
        />
        Yes
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <select value={value} onChange={(e) => onChange(e.target.value)} className={commonClasses}>
        <option value="">Select...</option>
        {field.options?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type={field.type === "date" ? "date" : field.type === "email" ? "email" : field.type === "url" ? "url" : "text"}
      value={value}
      placeholder={field.placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={commonClasses}
    />
  );
}

export function DynamicSectionEditor({ cvId, config, initialData }: DynamicSectionEditorProps) {
  const [single, setSingle] = useState<Entry>(() => normalizeSingle(initialData));
  const [entries, setEntries] = useState<Entry[]>(() => normalizeEntries(initialData));
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  const persist = (payload: Record<string, unknown>) => {
    setStatus("saving");
    updateCvSection(cvId, config.type, payload).then((result) => {
      setStatus(result.success ? "saved" : "error");
    });
  };

  const scheduleSave = (payload: Record<string, unknown>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => persist(payload), 800);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (config.mode === "single") {
      scheduleSave(single);
    } else {
      scheduleSave({ entries });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [single, entries]);

  if (config.mode === "single") {
    return (
      <div className="rounded-2xl border border-ink-900/10 p-6 dark:border-paper/10">
        <SectionHeader config={config} status={status} />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {config.fields.map((field) => (
            <div key={field.key} className={field.span2 ? "sm:col-span-2" : ""}>
              <label className="mb-1.5 block text-xs font-medium text-ink-900/60 dark:text-paper/60">
                {field.label}
              </label>
              <FieldInput
                field={field}
                value={single[field.key] ?? ""}
                onChange={(v) => setSingle((prev) => ({ ...prev, [field.key]: v }))}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const updateEntry = (index: number, key: string, value: string) => {
    setEntries((prev) => prev.map((e, i) => (i === index ? { ...e, [key]: value } : e)));
  };

  const addEntry = () => setEntries((prev) => [...prev, {}]);
  const removeEntry = (index: number) => setEntries((prev) => prev.filter((_, i) => i !== index));
  const moveEntry = (index: number, direction: -1 | 1) => {
    setEntries((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      const a = next[index]!;
      const b = next[target]!;
      next[index] = b;
      next[target] = a;
      return next;
    });
  };

  return (
    <div className="rounded-2xl border border-ink-900/10 p-6 dark:border-paper/10">
      <SectionHeader config={config} status={status} />

      <div className="mt-5 space-y-4">
        {entries.length === 0 && (
          <p className="text-sm text-ink-900/50 dark:text-paper/50">
            Nothing here yet — add your first entry below.
          </p>
        )}

        {entries.map((entry, index) => (
          <details
            key={index}
            open={entries.length <= 3}
            className="rounded-xl border border-ink-900/10 p-4 dark:border-paper/10"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
              <span className="flex items-center gap-2">
                <ChevronDownIcon size={14} className="text-ink-900/40 dark:text-paper/40" />
                {config.entryTitle(entry)}
              </span>
              <span className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  aria-label="Move up"
                  onClick={() => moveEntry(index, -1)}
                  className="rounded p-1 text-ink-900/50 hover:bg-ink-900/5 dark:text-paper/50 dark:hover:bg-paper/10"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  type="button"
                  aria-label="Move down"
                  onClick={() => moveEntry(index, 1)}
                  className="rounded p-1 text-ink-900/50 hover:bg-ink-900/5 dark:text-paper/50 dark:hover:bg-paper/10"
                >
                  <ChevronDown size={14} />
                </button>
                <button
                  type="button"
                  aria-label="Remove entry"
                  onClick={() => removeEntry(index)}
                  className="rounded p-1 text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 size={14} />
                </button>
              </span>
            </summary>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {config.fields.map((field) => (
                <div key={field.key} className={field.span2 ? "sm:col-span-2" : ""}>
                  <label className="mb-1.5 block text-xs font-medium text-ink-900/60 dark:text-paper/60">
                    {field.label}
                  </label>
                  <FieldInput
                    field={field}
                    value={entry[field.key] ?? ""}
                    onChange={(v) => updateEntry(index, field.key, v)}
                  />
                </div>
              ))}
            </div>
          </details>
        ))}

        <button
          type="button"
          onClick={addEntry}
          className="flex items-center gap-2 rounded-lg border border-dashed border-ink-900/20 px-4 py-2.5 text-sm font-medium text-ink-900/70 hover:border-signal-500 hover:text-signal-500 dark:border-paper/20 dark:text-paper/70"
        >
          <Plus size={14} />
          {config.addLabel ?? "Add entry"}
        </button>
      </div>
    </div>
  );
}

function SectionHeader({ config, status }: { config: SectionConfig; status: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="font-display text-lg font-semibold">{config.label}</h2>
        <p className="mt-0.5 text-sm text-ink-900/55 dark:text-paper/55">{config.description}</p>
      </div>
      <span
        className={`shrink-0 font-mono text-xs ${
          status === "error" ? "text-red-500" : "text-ink-900/40 dark:text-paper/40"
        }`}
        aria-live="polite"
      >
        {status === "saving" && "Saving..."}
        {status === "saved" && "Saved"}
        {status === "error" && "Save failed"}
      </span>
    </div>
  );
}
