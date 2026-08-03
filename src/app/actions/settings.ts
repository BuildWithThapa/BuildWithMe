"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guards";

export type SettingsActionResult = { success: true } | { success: false; error: string };

export async function updateSetting(
  key: string,
  value: Record<string, unknown>
): Promise<SettingsActionResult> {
  const { supabase, userId } = await requireAdmin();

  const { error } = await supabase
    .from("settings")
    .upsert({ key, value, updated_by: userId, updated_at: new Date().toISOString() });

  if (error) return { success: false, error: "Could not save settings." };
  revalidatePath("/admin/settings");
  revalidatePath("/");
  return { success: true };
}
