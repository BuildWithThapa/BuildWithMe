import Link from "next/link";
import { FileText, Upload, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";

export default async function DashboardOverviewPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const [{ data: profile }, { count: cvCount }, { count: uploadCount }] = await Promise.all([
    supabase.from("user_profiles").select("full_name, avatar_url").eq("id", user!.id).single(),
    supabase.from("cvs").select("id", { count: "exact", head: true }).eq("user_id", user!.id),
    supabase.from("uploads").select("id", { count: "exact", head: true }).eq("user_id", user!.id)
  ]);

  const firstName = profile?.full_name?.split(" ")[0] ?? "there";

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight">
        Welcome back, {firstName}
      </h1>
      <p className="mt-1 text-sm text-ink-900/60 dark:text-paper/60">
        Here&apos;s a snapshot of your account.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-ink-900/10 p-6 dark:border-paper/10">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-signal-500/10 text-signal-500">
              <FileText size={18} />
            </span>
            <div>
              <p className="text-2xl font-semibold">{cvCount ?? 0}</p>
              <p className="text-xs text-ink-900/50 dark:text-paper/50">CVs created</p>
            </div>
          </div>
          <Button href="/dashboard/cvs/new" size="sm" variant="ghost" className="mt-5">
            <Plus size={14} /> New CV
          </Button>
        </div>

        <div className="rounded-2xl border border-ink-900/10 p-6 dark:border-paper/10">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-signal-500/10 text-signal-500">
              <Upload size={18} />
            </span>
            <div>
              <p className="text-2xl font-semibold">{uploadCount ?? 0}</p>
              <p className="text-xs text-ink-900/50 dark:text-paper/50">Files uploaded</p>
            </div>
          </div>
          <Button href="/dashboard/uploads" size="sm" variant="ghost" className="mt-5">
            Manage uploads
          </Button>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-ink-900/15 p-8 text-center dark:border-paper/20">
        <p className="text-sm text-ink-900/60 dark:text-paper/60">
          {cvCount === 0
            ? "You haven't created a CV yet — it takes about 5 minutes."
            : "Keep your CV up to date before your next application."}
        </p>
        <Link href="/dashboard/cvs" className="mt-3 inline-block text-sm font-medium text-signal-500">
          Go to My CVs →
        </Link>
      </div>
    </div>
  );
}
