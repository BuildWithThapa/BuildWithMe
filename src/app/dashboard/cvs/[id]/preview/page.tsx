import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CvPreview } from "@/components/cv/CvPreview";
import { DownloadCvPdfButton } from "@/components/cv/DownloadCvPdfButton";
import { slugify } from "@/lib/utils";
import type { CvSection } from "@/types";

export default async function CvPreviewPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect(`/login?redirectTo=/dashboard/cvs/${params.id}/preview`);

  const { data: cv } = await supabase
    .from("cvs")
    .select("*, cv_sections(*), cv_templates(slug)")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();

  if (!cv) notFound();

  const sections = (cv.cv_sections ?? []) as CvSection[];
  const templateSlug = (cv as unknown as { cv_templates: { slug: string } | null }).cv_templates?.slug ?? "modern";

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link href={`/dashboard/cvs/${cv.id}`} className="text-xs text-ink-900/50 dark:text-paper/50">
          ← Back to editor
        </Link>
        <DownloadCvPdfButton targetId="cv-preview-root" fileName={slugify(cv.title)} />
      </div>

      <div className="overflow-x-auto rounded-2xl bg-ink-900/[0.03] p-6 dark:bg-paper/[0.03]">
        <CvPreview templateSlug={templateSlug} sections={sections} />
      </div>
    </div>
  );
}
