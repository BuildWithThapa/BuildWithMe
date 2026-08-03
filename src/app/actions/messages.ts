"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guards";

export type MessageActionResult = { success: true } | { success: false; error: string };

export async function markMessageRead(id: string, isRead: boolean): Promise<MessageActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("contact_messages").update({ is_read: isRead }).eq("id", id);
  if (error) return { success: false, error: "Could not update message." };
  revalidatePath("/admin/messages");
  return { success: true };
}

export async function deleteMessage(id: string): Promise<MessageActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("contact_messages").delete().eq("id", id);
  if (error) return { success: false, error: "Could not delete message." };
  revalidatePath("/admin/messages");
  return { success: true };
}
