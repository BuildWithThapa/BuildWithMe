import { Activity } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

interface ActivityLog {
  id: string;
  action: string;
  entity_type: string | null;
  created_at: string;
}

const ACTION_LABELS: Record<string, string> = {
  "cv.created": "Created a CV",
  "cv.updated": "Updated a CV",
  "cv.deleted": "Deleted a CV",
  "profile.updated": "Updated profile",
  "upload.created": "Uploaded a file"
};

export default async function DashboardActivityPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirectTo=/dashboard/activity");

  const { data: logs } = await supabase
    .from("activity_logs")
    .select("id, action, entity_type, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  const rows = (logs as ActivityLog[] | null) ?? [];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight">Activity</h1>
      <p className="mt-1 text-sm text-ink-900/60 dark:text-paper/60">
        A history of actions taken on your account.
      </p>

      <div className="mt-8 divide-y divide-ink-900/10 rounded-2xl border border-ink-900/10 dark:divide-paper/10 dark:border-paper/10">
        {rows.length === 0 && (
          <p className="p-6 text-sm text-ink-900/50 dark:text-paper/50">
            No activity recorded yet.
          </p>
        )}
        {rows.map((log) => (
          <div key={log.id} className="flex items-center gap-3 p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-900/5 dark:bg-paper/10">
              <Activity size={14} />
            </span>
            <div className="flex-1">
              <p className="text-sm">{ACTION_LABELS[log.action] ?? log.action}</p>
            </div>
            <span className="text-xs text-ink-900/40 dark:text-paper/40">
              {new Date(log.created_at).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
