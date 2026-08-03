import type { CvSection, CvSectionType } from "@/types";

export function getSectionData(
  sections: CvSection[],
  type: CvSectionType
): Record<string, unknown> {
  return sections.find((s) => s.section_type === type)?.data ?? {};
}

export function getSingleFields(sections: CvSection[], type: CvSectionType): Record<string, string> {
  const data = getSectionData(sections, type);
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(data)) out[k] = typeof v === "string" ? v : "";
  return out;
}

export function getEntries(sections: CvSection[], type: CvSectionType): Record<string, string>[] {
  const data = getSectionData(sections, type) as { entries?: unknown };
  if (!Array.isArray(data.entries)) return [];
  return (data.entries as Record<string, unknown>[]).map((entry) => {
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(entry)) out[k] = typeof v === "string" ? v : "";
    return out;
  });
}

export function formatDateRange(start?: string, end?: string, current?: string): string {
  const fmt = (d?: string) => {
    if (!d) return "";
    const date = new Date(d);
    if (Number.isNaN(date.getTime())) return d;
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };
  const startLabel = fmt(start);
  const endLabel = current === "true" ? "Present" : fmt(end);
  if (startLabel && endLabel) return `${startLabel} — ${endLabel}`;
  return startLabel || endLabel;
}
