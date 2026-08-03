"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Newspaper,
  MessageSquare,
  Mail,
  Star,
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutUser } from "@/app/actions/auth";

const LINKS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/portfolio", label: "Portfolio", icon: FolderKanban },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { href: "/admin/settings", label: "Settings", icon: Settings }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 border-ink-900/10 dark:border-paper/10 md:w-56 md:border-r">
      <nav className="flex gap-1 overflow-x-auto p-4 md:flex-col md:overflow-visible">
        {LINKS.map(({ href, label, icon: Icon }) => {
          const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-signal-500/10 text-signal-500"
                  : "text-ink-900/65 hover:bg-ink-900/5 dark:text-paper/65 dark:hover:bg-paper/5"
              )}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
        <form action={logoutUser} className="md:mt-4">
          <button
            type="submit"
            className="flex w-full shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-900/65 transition-colors hover:bg-red-500/10 hover:text-red-500 dark:text-paper/65"
          >
            <LogOut size={16} />
            Log out
          </button>
        </form>
      </nav>
    </aside>
  );
}
