"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/cv-builder", label: "CV Builder" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-900/8 bg-paper/80 backdrop-blur-md dark:border-paper/10 dark:bg-ink-900/80">
      <div className="container-max flex items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="flex items-baseline gap-1 font-display text-lg font-semibold">
          <span>BuildWith</span>
          <span className="text-signal-500">Thapa</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-900/70 transition-colors hover:text-ink-900 dark:text-paper/70 dark:hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button href="/login" variant="ghost" size="sm">
            Log in
          </Button>
          <Button href="/contact" size="sm">
            Start a project
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-900/10 dark:border-paper/15"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-ink-900/8 bg-paper px-6 py-4 dark:border-paper/10 dark:bg-ink-900 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-sm text-ink-900/80 dark:text-paper/80"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex gap-3 pt-2">
              <Button href="/login" variant="ghost" size="sm" className="flex-1">
                Log in
              </Button>
              <Button href="/contact" size="sm" className="flex-1">
                Start a project
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
