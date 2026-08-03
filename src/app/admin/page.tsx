import { FolderKanban, Newspaper, MessageSquare, Mail, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

async function getCount(
  supabase: ReturnType<typeof createClient>,
  table: string,
  filter?: Record<string, unknown>
) {
  let query = supabase.from(table).select("id", { count: "exact", head: true });
  if (filter) {
    for (const [key, value] of Object.entries(filter)) {
      query = query.eq(key, value);
    }
  }
  const { count } = await query;
  return count ?? 0;
}

export default async function AdminOverviewPage() {
  const supabase = createClient();

  const [projects, posts, unreadMessages, subscribers, users] = await Promise.all([
    getCount(supabase, "projects"),
    getCount(supabase, "blogs"),
    getCount(supabase, "contact_messages", { is_read: false }),
    getCount(supabase, "newsletter_subscribers"),
    getCount(supabase, "user_profiles")
  ]);

  const stats = [
    { label: "Projects", value: projects, icon: FolderKanban, href: "/admin/portfolio" },
    { label: "Blog posts", value: posts, icon: Newspaper, href: "/admin/blog" },
    { label: "Unread messages", value: unreadMessages, icon: MessageSquare, href: "/admin/messages" },
    { label: "Newsletter subscribers", value: subscribers, icon: Mail, href: "/admin/newsletter" },
    { label: "Registered users", value: users, icon: Users, href: "#" }
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight">Admin Overview</h1>
      <p className="mt-1 text-sm text-ink-900/60 dark:text-paper/60">
        A snapshot of everything happening on BuildWithThapa.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            className="rounded-2xl border border-ink-900/10 p-6 transition-colors hover:border-signal-500 dark:border-paper/10"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-signal-500/10 text-signal-500">
              <Icon size={18} />
            </span>
            <p className="mt-4 text-2xl font-semibold">{value}</p>
            <p className="text-xs text-ink-900/50 dark:text-paper/50">{label}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
