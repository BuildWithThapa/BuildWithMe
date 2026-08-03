"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guards";

export type NewsletterActionResult = { success: true } | { success: false; error: string };

export async function removeSubscriber(id: string): Promise<NewsletterActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", id);
  if (error) return { success: false, error: "Could not remove subscriber." };
  revalidatePath("/admin/newsletter");
  return { success: true };
}
