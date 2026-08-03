import { createClient } from "@/lib/supabase/server";
import { SubscriberRow } from "@/components/admin/SubscriberRow";
import { ExportCsvButton } from "@/components/admin/ExportCsvButton";

interface Subscriber {
  id: string;
  email: string;
  is_confirmed: boolean;
  created_at: string;
}

export default async function AdminNewsletterPage() {
  const supabase = createClient();
  const { data: subscribers } = await supabase
    .from("newsletter_subscribers")
    .select("id, email, is_confirmed, created_at")
    .is("unsubscribed_at", null)
    .order("created_at", { ascending: false });

  const rows = (subscribers as Subscriber[] | null) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Newsletter</h1>
          <p className="mt-1 text-sm text-ink-900/60 dark:text-paper/60">
            {rows.length} active subscriber{rows.length === 1 ? "" : "s"}
          </p>
        </div>
        <ExportCsvButton
          filename="newsletter-subscribers.csv"
          rows={rows.map((r) => ({ email: r.email, subscribed_at: r.created_at }))}
        />
      </div>

      <div className="mt-8 divide-y divide-ink-900/10 rounded-2xl border border-ink-900/10 dark:divide-paper/10 dark:border-paper/10">
        {rows.length === 0 && (
          <p className="p-6 text-sm text-ink-900/50 dark:text-paper/50">No subscribers yet.</p>
        )}
        {rows.map((sub) => (
          <SubscriberRow key={sub.id} subscriber={sub} />
        ))}
      </div>
    </div>
  );
}
