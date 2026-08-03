import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SECTION_CONFIGS, SECTION_ORDER } from "@/lib/cv/sectionSchemas";
import { DynamicSectionEditor } from "@/components/cv/DynamicSectionEditor";
import { CvTitleEditor } from "@/components/cv/CvTitleEditor";
import { Button } from "@/components/ui/Button";
import type { CvSection } from "@/types";

export default async function CvEditorPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: cv } = await supabase
    .from("cvs")
    .select("*, cv_sections(*)")
    .eq("id", params.id)
    .eq("user_id", user!.id)
    .single();

  if (!cv) notFound();

  const sections = (cv.cv_sections ?? []) as CvSection[];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/dashboard/cvs" className="text-xs text-ink-900/50 dark:text-paper/50">
            ← My CVs
          </Link>
          <CvTitleEditor cvId={cv.id} initialTitle={cv.title} />
        </div>
        <Button href={`/dashboard/cvs/${cv.id}/preview`} variant="secondary" size="sm">
          Preview &amp; Download PDF
        </Button>
      </div>

      <div className="mt-8 space-y-6">
        {SECTION_ORDER.map((type) => {
          const config = SECTION_CONFIGS[type];
          const section = sections.find((s) => s.section_type === type);
          return (
            <DynamicSectionEditor
              key={type}
              cvId={cv.id}
              config={config}
              initialData={section?.data ?? {}}
            />
          );
        })}
      </div>
    </div>
  );
}
