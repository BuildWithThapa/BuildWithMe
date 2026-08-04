import { CV_TEMPLATES } from "@/lib/cv/templates";
import { createCv } from "@/app/actions/cv";
import { createClient } from "@/lib/supabase/server";
import { TemplateThumbnail } from "@/components/cv/TemplateThumbnail";

export default async function NewCvPage() {
  const supabase = createClient();
  const { data: dbTemplates } = await supabase.from("cv_templates").select("id, slug");

  // Map static template definitions to their seeded DB row ids so the
  // created CV can reference cv_templates.id via a real foreign key.
  const idBySlug = new Map((dbTemplates ?? []).map((t) => [t.slug, t.id as string]));

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight">Choose a template</h1>
      <p className="mt-1 text-sm text-ink-900/60 dark:text-paper/60">
        You can switch templates any time — your content stays the same.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CV_TEMPLATES.map((template) => {
          const templateId = idBySlug.get(template.slug);
          return (
            <form
              key={template.slug}
              action={async () => {
                "use server";
                if (!templateId) return;
                await createCv(templateId, "Untitled CV");
              }}
            >
              <button
                type="submit"
                disabled={!templateId}
                className="w-full rounded-2xl border border-ink-900/10 p-5 text-left transition-colors hover:border-signal-500 disabled:opacity-40 dark:border-paper/10"
              >
                <div className="mb-4">
                  <TemplateThumbnail slug={template.slug} />
                </div>
                <h3 className="font-display font-semibold">{template.name}</h3>
                <p className="mt-1 text-xs text-ink-900/55 dark:text-paper/55">
                  {template.description}
                </p>
                {template.isAtsFriendly && (
                  <span className="mt-2 inline-block rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-medium text-success">
                    ATS Friendly
                  </span>
                )}
              </button>
            </form>
          );
        })}
      </div>
    </div>
  );
}
