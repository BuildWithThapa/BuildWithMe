import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { CvListItem } from "@/components/cv/CvListItem";
import type { Cv } from "@/types";

export default async function CvsListPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: cvs } = await supabase
    .from("cvs")
    .select("*")
    .eq("user_id", user!.id)
    .order("updated_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold tracking-tight">My CVs</h1>
        <Button href="/dashboard/cvs/new" size="sm">
          New CV
        </Button>
      </div>

      {(!cvs || cvs.length === 0) && (
        <div className="mt-8 rounded-2xl border border-dashed border-ink-900/15 p-10 text-center dark:border-paper/20">
          <p className="text-sm text-ink-900/60 dark:text-paper/60">
            You haven&apos;t created a CV yet.
          </p>
          <Button href="/dashboard/cvs/new" size="sm" className="mt-4">
            Create your first CV
          </Button>
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {(cvs as Cv[] | null)?.map((cv) => (
          <CvListItem key={cv.id} cv={cv} />
        ))}
      </div>
    </div>
  );
}
