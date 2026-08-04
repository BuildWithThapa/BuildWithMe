"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, LayoutDashboard, Shield } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { logoutUser } from "@/app/actions/auth";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/cv-builder", label: "CV Builder" },
  { href: "/contact", label: "Contact" }
];

export function Header({ displayName, isAdmin }: { displayName: string | null; isAdmin: boolean }) {
  const [open, setOpen] = useState(false);
  const isLoggedIn = !!displayName;

  return (
    <header className="sticky top-0 z-40 border-b border-ink-900/8 bg-paper/80 backdrop-blur-md dark:border-paper/10 dark:bg-ink-900/80">
      <div className="container-max flex items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="flex items-center rounded-lg bg-white px-3 py-1.5 shadow-sm">
          <Image src="/logo.png" alt="BuildWithThapa" width={140} height={26} className="h-6 w-auto" priority />
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
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 rounded-full bg-signal-500/10 px-3 py-1.5 text-sm font-medium text-signal-500"
                >
                  <Shield size={14} />
                  Admin
                </Link>
              )}
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm font-medium text-ink-900 dark:text-paper"
              >
                <LayoutDashboard size={16} />
                Hi, {displayName}
              </Link>
              <form action={logoutUser}>
                <button
                  type="submit"
                  className="rounded-full border border-ink-900/10 px-4 py-2 text-sm font-medium hover:bg-ink-900/5 dark:border-paper/15 dark:hover:bg-paper/10"
                >
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <Button href="/login" variant="ghost" size="sm">
                Log in
              </Button>
              <Button href="/contact" size="sm">
                Start a project
              </Button>
            </>
          )}
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
            {isLoggedIn ? (
              <li className="flex flex-col gap-3 pt-2">
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full bg-signal-500/10 px-4 py-2 text-sm font-medium text-signal-500"
                  >
                    <Shield size={16} />
                    Admin panel
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full border border-ink-900/10 px-4 py-2 text-sm font-medium dark:border-paper/15"
                >
                  <LayoutDashboard size={16} />
                  Hi, {displayName} — Dashboard
                </Link>
                <form action={logoutUser}>
                  <button
                    type="submit"
                    className="w-full rounded-full border border-ink-900/10 px-4 py-2 text-sm font-medium dark:border-paper/15"
                  >
                    Log out
                  </button>
                </form>
              </li>
            ) : (
              <li className="flex gap-3 pt-2">
                <Button href="/login" variant="ghost" size="sm" className="flex-1">
                  Log in
                </Button>
                <Button href="/contact" size="sm" className="flex-1">
                  Start a project
                </Button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
