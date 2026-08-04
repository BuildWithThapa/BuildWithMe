import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { UploadManager, type UploadRecord } from "@/components/dashboard/UploadManager";

export default async function DashboardUploadsPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirectTo=/dashboard/uploads");

  const { data: uploads } = await supabase
    .from("uploads")
    .select("id, bucket, path, original_filename, mime_type, size_bytes, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight">Uploads</h1>
      <p className="mt-1 text-sm text-ink-900/60 dark:text-paper/60">
        Files you&apos;ve uploaded — images and PDFs up to 10MB.
      </p>

      <div className="mt-8">
        <UploadManager userId={user.id} initialUploads={(uploads as UploadRecord[] | null) ?? []} />
      </div>
    </div>
  );
}
