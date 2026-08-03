"use client";

import { useState, useTransition } from "react";
import { updateSetting } from "@/app/actions/settings";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

interface SettingsFieldDef {
  key: string;
  label: string;
}

export function SettingsFormCard({
  settingsKey,
  title,
  description,
  fields,
  initialValue
}: {
  settingsKey: string;
  title: string;
  description: string;
  fields: SettingsFieldDef[];
  initialValue: Record<string, string>;
}) {
  const [values, setValues] = useState<Record<string, string>>(initialValue);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateSetting(settingsKey, values);
      setStatus(result.success ? "saved" : "error");
    });
  };

  return (
    <div className="rounded-2xl border border-ink-900/10 p-6 dark:border-paper/10">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-ink-900/55 dark:text-paper/55">{description}</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <FormField
            key={field.key}
            id={`${settingsKey}-${field.key}`}
            label={field.label}
            value={values[field.key] ?? ""}
            onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
          />
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <Button type="button" size="sm" disabled={isPending} onClick={handleSave}>
          {isPending ? "Saving..." : "Save"}
        </Button>
        {status === "saved" && <span className="text-xs text-success">Saved</span>}
        {status === "error" && <span className="text-xs text-red-500">Save failed</span>}
      </div>
    </div>
  );
}
