import type { Metadata } from "next";
import { QuickCvBuilder } from "@/components/cv/QuickCvBuilder";

export const metadata: Metadata = {
  title: "Quick CV Builder",
  description: "Build and download a CV instantly — no account required."
};

export default function QuickCvBuilderPage() {
  return (
    <div className="section-padding">
      <div className="container-max">
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Quick CV Builder
        </h1>
        <p className="mt-3 max-w-xl text-ink-900/65 dark:text-paper/65">
          Fill in your details and download a PDF instantly — no account
          needed. Want to save and edit CVs later?{" "}
          <a href="/register" className="text-signal-500 underline">
            Create a free account
          </a>
          .
        </p>

        <div className="mt-10">
          <QuickCvBuilder />
        </div>
      </div>
    </div>
  );
}
