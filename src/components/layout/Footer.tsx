import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { href: "/portfolio", label: "Portfolio" },
      { href: "/services", label: "Services" },
      { href: "/cv-builder", label: "CV Builder" },
      { href: "/blog", label: "Blog" }
    ]
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" }
    ]
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="border-t border-ink-900/8 dark:border-paper/10">
      <div className="container-max grid gap-10 px-6 py-16 md:grid-cols-[2fr_1fr_1fr_1fr] md:px-10">
        <div>
          <Link href="/" className="font-display text-lg font-semibold">
            BuildWith<span className="text-signal-500">Thapa</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-ink-900/60 dark:text-paper/60">
            Building Modern Web Experiences &amp; Digital Solutions.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://github.com"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-900/10 hover:bg-ink-900/5 dark:border-paper/15 dark:hover:bg-paper/10"
            >
              <Github size={16} />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-900/10 hover:bg-ink-900/5 dark:border-paper/15 dark:hover:bg-paper/10"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter / X"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-900/10 hover:bg-ink-900/5 dark:border-paper/15 dark:hover:bg-paper/10"
            >
              <Twitter size={16} />
            </a>
            <a
              href="mailto:hello@buildwiththapa.np"
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-900/10 hover:bg-ink-900/5 dark:border-paper/15 dark:hover:bg-paper/10"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink-900/50 dark:text-paper/50">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-900/70 hover:text-ink-900 dark:text-paper/70 dark:hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-ink-900/8 px-6 py-6 text-center text-xs text-ink-900/50 dark:border-paper/10 dark:text-paper/50 md:px-10">
        © {new Date().getFullYear()} BuildWithThapa. All rights reserved.
      </div>
    </footer>
  );
}
