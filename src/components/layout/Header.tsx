"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  House,
  User,
  FolderKanban,
  LayoutGrid,
  Newspaper,
  FileText,
  Send,
  LayoutDashboard,
  Shield
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { logoutUser } from "@/app/actions/auth";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: House },
  { href: "/about", label: "About", icon: User },
  { href: "/portfolio", label: "Portfolio", icon: FolderKanban },
  { href: "/services", label: "Services", icon: LayoutGrid },
  { href: "/blog", label: "Blog", icon: Newspaper },
  { href: "/cv-builder", label: "CV Builder", icon: FileText },
  { href: "/contact", label: "Contact", icon: Send }
];

export function Header({ displayName, isAdmin }: { displayName: string | null; isAdmin: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isLoggedIn = !!displayName;

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 md:px-6">
      {/* Floating glass pill navbar */}
      <div className="container-max flex items-center justify-between gap-2 rounded-full border border-white/10 bg-ink-950/70 px-4 py-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl dark:border-paper/10">
        <Link href="/" className="flex shrink-0 items-center rounded-md bg-white px-2.5 py-1">
          <Image src="/logo.png" alt="BuildWithThapa" width={120} height={22} className="h-5 w-auto" priority />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-all ${
                  active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={14} className={active ? "text-signal-400" : "opacity-70"} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 rounded-full bg-signal-500/15 px-3 py-2 text-sm font-medium text-signal-400"
                >
                  <Shield size={14} />
                  Admin
                </Link>
              )}
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-white hover:bg-white/5"
              >
                <LayoutDashboard size={14} />
                Hi, {displayName}
              </Link>
              <form action={logoutUser}>
                <button
                  type="submit"
                  className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15"
                >
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/contact"
                className="rounded-full bg-signal-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_15px_rgba(79,124,255,0.4)] transition-all hover:-translate-y-0.5 hover:bg-signal-600 hover:shadow-[0_6px_20px_rgba(79,124,255,0.5)]"
              >
                Start a project
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="container-max mt-2 rounded-3xl border border-white/10 bg-ink-950/90 px-5 py-5 shadow-[0_20px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2.5 rounded-full px-3 py-2.5 text-sm font-medium ${
                      active ? "bg-white/10 text-white" : "text-white/70"
                    }`}
                  >
                    <Icon size={15} className={active ? "text-signal-400" : "opacity-70"} />
                    {label}
                  </Link>
                </li>
              );
            })}
            {isLoggedIn ? (
              <li className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-4">
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full bg-signal-500/15 px-4 py-2.5 text-sm font-medium text-signal-400"
                  >
                    <Shield size={15} />
                    Admin panel
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-medium text-white"
                >
                  <LayoutDashboard size={15} />
                  Hi, {displayName} — Dashboard
                </Link>
                <form action={logoutUser}>
                  <button
                    type="submit"
                    className="w-full rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-white/80"
                  >
                    Log out
                  </button>
                </form>
              </li>
            ) : (
              <li className="mt-2 flex gap-2 border-t border-white/10 pt-4">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full border border-white/15 px-4 py-2.5 text-center text-sm font-medium text-white"
                >
                  Log in
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full bg-signal-500 px-4 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Start a project
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
