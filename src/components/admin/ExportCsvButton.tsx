"use client";

import { Download } from "lucide-react";

export function ExportCsvButton<T extends Record<string, string | number>>({
  filename,
  rows
}: {
  filename: string;
  rows: T[];
}) {
  const handleExport = () => {
    if (rows.length === 0) return;
    const headers = Object.keys(rows[0]!);
    const csvLines = [
      headers.join(","),
      ...rows.map((row) =>
        headers.map((h) => `"${String(row[h]).replace(/"/g, '""')}"`).join(",")
      )
    ];
    const blob = new Blob([csvLines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={rows.length === 0}
      className="flex items-center gap-2 rounded-full border border-ink-900/10 px-4 py-2 text-sm font-medium disabled:opacity-40 dark:border-paper/15"
    >
      <Download size={14} /> Export CSV
    </button>
  );
}
