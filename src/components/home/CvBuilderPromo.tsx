import { FileText, Download, LayoutTemplate } from "lucide-react";
import { Button } from "@/components/ui/Button";

const FEATURES = [
  { icon: LayoutTemplate, label: "5 professional templates, including ATS-friendly" },
  { icon: FileText, label: "Unlimited CVs, saved to your account" },
  { icon: Download, label: "One-click, high-quality PDF export" }
];

export function CvBuilderPromo() {
  return (
    <section className="section-padding bg-ink-900/[0.02] dark:bg-paper/[0.02]">
      <div className="container-max grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-signal-500">
            Free tool
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Build a job-ready CV in minutes
          </h2>
          <p className="mt-4 max-w-lg text-ink-900/65 dark:text-paper/65">
            Create an account, pick a template, and fill in your experience —
            our CV Builder handles formatting, layout, and export so your CV
            looks sharp everywhere it&apos;s opened.
          </p>
          <ul className="mt-8 space-y-4">
            {FEATURES.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-signal-500/10 text-signal-500">
                  <Icon size={16} />
                </span>
                {label}
              </li>
            ))}
          </ul>
          <Button href="/cv-builder" size="lg" className="mt-8">
            Build your CV — it&apos;s free
          </Button>
        </div>

        <div className="rounded-2xl border border-ink-900/10 bg-paper p-6 shadow-xl dark:border-paper/10 dark:bg-ink-800">
          <div className="space-y-3">
            <div className="h-3 w-2/3 rounded-full bg-ink-900/10 dark:bg-paper/15" />
            <div className="h-3 w-1/2 rounded-full bg-ink-900/10 dark:bg-paper/15" />
            <div className="mt-6 h-2 w-full rounded-full bg-ink-900/[0.06] dark:bg-paper/10" />
            <div className="h-2 w-full rounded-full bg-ink-900/[0.06] dark:bg-paper/10" />
            <div className="h-2 w-4/5 rounded-full bg-ink-900/[0.06] dark:bg-paper/10" />
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="h-16 rounded-lg bg-signal-500/10" />
              <div className="h-16 rounded-lg bg-ink-900/[0.05] dark:bg-paper/10" />
              <div className="h-16 rounded-lg bg-ink-900/[0.05] dark:bg-paper/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
