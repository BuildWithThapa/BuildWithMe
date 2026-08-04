import type { Metadata } from "next";
import { CV_TEMPLATES } from "@/lib/cv/templates";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Free CV Builder",
  description: "Build a professional, ATS-friendly CV in minutes and export it as a PDF — free, no catch."
};

const BENEFITS = [
  "Unlimited CVs, saved to your account",
  "5 professional templates, including ATS-friendly formats",
  "Section-by-section editor with autosave",
  "One-click, high-quality PDF export",
  "Duplicate a CV to tailor it for different applications"
];

export default function CvBuilderLandingPage() {
  return (
    <div className="section-padding">
      <div className="container-max">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wide text-signal-500">Free tool</p>
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Build a job-ready CV in minutes
          </h1>
          <p className="mt-4 text-ink-900/65 dark:text-paper/65">
            Create an account, pick a template, and fill in your experience.
            No hidden limits, no watermarks. Or skip the account and try the
            quick version right now.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/cv-builder/quick" size="lg">
              Try it now — no login needed
            </Button>
            <Button href="/login" variant="ghost" size="lg">
              I already have an account
            </Button>
          </div>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {BENEFITS.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm">
              <Check size={16} className="mt-0.5 shrink-0 text-signal-500" />
              {b}
            </li>
          ))}
        </ul>

        <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight">
          Choose from 5 templates
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CV_TEMPLATES.map((template) => (
            <div key={template.slug} className="rounded-2xl border border-ink-900/10 p-5 dark:border-paper/10">
              <div className="mb-4 flex aspect-[3/4] items-center justify-center rounded-lg bg-ink-900/[0.03] dark:bg-paper/[0.03]">
                <span className="font-mono text-xs text-ink-900/35 dark:text-paper/35">
                  {template.name} preview
                </span>
              </div>
              <h3 className="font-display font-semibold">{template.name}</h3>
              <p className="mt-1 text-xs text-ink-900/55 dark:text-paper/55">{template.description}</p>
              {template.isAtsFriendly && (
                <span className="mt-2 inline-block rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-medium text-success">
                  ATS Friendly
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
