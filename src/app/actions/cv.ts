"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SECTION_ORDER } from "@/lib/cv/sectionSchemas";
import type { CvSectionType } from "@/types";

export type CvActionResult = { success: true } | { success: false; error: string };

async function requireUserId(): Promise<string> {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  return user.id;
}

function defaultSectionData(type: CvSectionType): Record<string, unknown> {
  const listTypes: CvSectionType[] = [
    "education",
    "experience",
    "projects",
    "skills",
    "languages",
    "certifications",
    "references"
  ];
  return listTypes.includes(type) ? { entries: [] } : {};
}

export async function createCv(templateId: string, title: string): Promise<void> {
  const userId = await requireUserId();
  const supabase = createClient();

  const { data: cv, error } = await supabase
    .from("cvs")
    .insert({ user_id: userId, template_id: templateId, title: title || "Untitled CV" })
    .select("id")
    .single();

  if (error || !cv) {
    console.error("createCv insert failed:", error?.message, error?.details, error?.hint);
    throw new Error("Could not create CV.");
  }

  const sectionRows = SECTION_ORDER.map((type, index) => ({
    cv_id: cv.id,
    section_type: type,
    display_order: index,
    data: defaultSectionData(type)
  }));

  const { error: sectionsError } = await supabase.from("cv_sections").insert(sectionRows);
  if (sectionsError) {
    console.error("createCv sections insert failed:", sectionsError.message, sectionsError.details);
  }

  revalidatePath("/dashboard/cvs");
  redirect(`/dashboard/cvs/${cv.id}`);
}

export async function duplicateCv(cvId: string): Promise<CvActionResult> {
  const userId = await requireUserId();
  const supabase = createClient();

  const { data: original, error: fetchError } = await supabase
    .from("cvs")
    .select("*, cv_sections(*)")
    .eq("id", cvId)
    .eq("user_id", userId)
    .single();

  if (fetchError || !original) {
    return { success: false, error: "CV not found." };
  }

  const { data: copy, error: insertError } = await supabase
    .from("cvs")
    .insert({
      user_id: userId,
      template_id: original.template_id,
      title: `${original.title} (Copy)`
    })
    .select("id")
    .single();

  if (insertError || !copy) {
    return { success: false, error: "Could not duplicate CV." };
  }

  type SectionRow = { section_type: string; display_order: number; data: unknown };
  const sections = (original.cv_sections ?? []) as SectionRow[];

  if (sections.length > 0) {
    await supabase.from("cv_sections").insert(
      sections.map((s) => ({
        cv_id: copy.id,
        section_type: s.section_type,
        display_order: s.display_order,
        data: s.data
      }))
    );
  }

  revalidatePath("/dashboard/cvs");
  return { success: true };
}

export async function deleteCv(cvId: string): Promise<CvActionResult> {
  const userId = await requireUserId();
  const supabase = createClient();

  const { error } = await supabase.from("cvs").delete().eq("id", cvId).eq("user_id", userId);

  if (error) {
    return { success: false, error: "Could not delete CV." };
  }

  revalidatePath("/dashboard/cvs");
  return { success: true };
}

export async function renameCv(cvId: string, title: string): Promise<CvActionResult> {
  const userId = await requireUserId();
  const supabase = createClient();

  const { error } = await supabase
    .from("cvs")
    .update({ title: title || "Untitled CV" })
    .eq("id", cvId)
    .eq("user_id", userId);

  if (error) {
    return { success: false, error: "Could not rename CV." };
  }

  revalidatePath(`/dashboard/cvs/${cvId}`);
  return { success: true };
}

export async function updateCvSection(
  cvId: string,
  sectionType: CvSectionType,
  data: Record<string, unknown>
): Promise<CvActionResult> {
  const userId = await requireUserId();
  const supabase = createClient();

  // Confirm ownership before writing — RLS also enforces this, but failing
  // fast with a clear error is better UX than a silent RLS rejection.
  const { data: cv } = await supabase
    .from("cvs")
    .select("id")
    .eq("id", cvId)
    .eq("user_id", userId)
    .single();

  if (!cv) {
    return { success: false, error: "CV not found." };
  }

  const { error } = await supabase
    .from("cv_sections")
    .update({ data })
    .eq("cv_id", cvId)
    .eq("section_type", sectionType);

  if (error) {
    return { success: false, error: "Could not save changes." };
  }

  return { success: true };
}
