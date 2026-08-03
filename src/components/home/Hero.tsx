"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const BUILD_LOG = [
  "$ npm run build",
  "▲ compiling design system...",
  "▲ compiling components/hero...",
  "▲ compiling components/portfolio...",
  "▲ optimizing images (webp)...",
  "▲ generating static pages (14/14)...",
  "✓ Build complete in 1.2s"
];

/**
 * Signature hero element: a typed build-log animation, literal to the
 * BuildWithThapa brand and legible to its developer audience — replaces
 * a generic stat-card hero.
 */
function TerminalAnimation() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lineIndex >= BUILD_LOG.length) {
      setDone(true);
      return;
    }
    const currentLine = BUILD_LOG[lineIndex] ?? "";
    if (charIndex < currentLine.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 18);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLineIndex((l) => l + 1);
      setCharIndex(0);
    }, 260);
    return () => clearTimeout(t);
  }, [lineIndex, charIndex]);

  return (
    <div
      className="w-full max-w-md overflow-hidden rounded-2xl border border-ink-900/10 bg-ink-950 shadow-2xl dark:border-paper/10"
      role="img"
      aria-label="Terminal showing a successful production build of the BuildWithThapa platform"
    >
      <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
      </div>
      <div className="h-56 px-4 py-4 font-mono text-[13px] leading-6 text-[#94A3B8]">
        {BUILD_LOG.slice(0, lineIndex).map((line, i) => (
          <div key={i} className={line.startsWith("✓") ? "text-success" : ""}>
            {line}
          </div>
        ))}
        {!done && (
          <div className={lineIndex >= BUILD_LOG.length - 1 && charIndex === BUILD_LOG[BUILD_LOG.length - 1]?.length ? "text-success" : ""}>
            {BUILD_LOG[lineIndex]?.slice(0, charIndex)}
            <span className="ml-0.5 inline-block h-3.5 w-2 animate-caret bg-signal-400 align-middle" />
          </div>
        )}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-signal-500/20 blur-3xl"
      />
      <div className="container-max grid items-center gap-12 lg:grid-cols-2">
        <div className="animate-fade-up">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink-900/10 px-3 py-1 font-mono text-xs text-ink-900/60 dark:border-paper/15 dark:text-paper/60">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Available for new projects
          </p>
          <h1 className="text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">
            Building Modern Web Experiences{" "}
            <span className="text-signal-500">&amp; Digital Solutions</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-ink-900/65 dark:text-paper/65">
            BuildWithThapa is a full-stack development studio — from premium
            marketing sites to complete SaaS platforms — plus a free CV
            builder to help job seekers land their next role.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact" size="lg">
              Start a project
            </Button>
            <Button href="/cv-builder" variant="ghost" size="lg">
              Try the CV Builder
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <TerminalAnimation />
        </div>
      </div>
    </section>
  );
}
