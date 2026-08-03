import { createClient } from "@/lib/supabase/server";
import { MessageRow } from "@/components/admin/MessageRow";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default async function AdminMessagesPage() {
  const supabase = createClient();
  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight">Messages</h1>
      <p className="mt-1 text-sm text-ink-900/60 dark:text-paper/60">
        Submissions from the contact form.
      </p>

      <div className="mt-8 divide-y divide-ink-900/10 rounded-2xl border border-ink-900/10 dark:divide-paper/10 dark:border-paper/10">
        {(!messages || messages.length === 0) && (
          <p className="p-6 text-sm text-ink-900/50 dark:text-paper/50">No messages yet.</p>
        )}
        {(messages as ContactMessage[] | null)?.map((message) => (
          <MessageRow key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}
