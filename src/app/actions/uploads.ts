"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth-guards";

export type UploadActionResult = { success: true } | { success: false; error: string };

export async function recordUpload(input: {
  bucket: string;
  path: string;
  originalFilename: string;
  mimeType: string;
  sizeBytes: number;
}): Promise<UploadActionResult> {
  const { supabase, userId } = await requireUser();

  const { error } = await supabase.from("uploads").insert({
    user_id: userId,
    bucket: input.bucket,
    path: input.path,
    original_filename: input.originalFilename,
    mime_type: input.mimeType,
    size_bytes: input.sizeBytes
  });

  if (error) return { success: false, error: "Could not save upload record." };
  revalidatePath("/dashboard/uploads");
  return { success: true };
}

export async function deleteUpload(id: string, bucket: string, path: string): Promise<UploadActionResult> {
  const { supabase, userId } = await requireUser();

  const { error: storageError } = await supabase.storage.from(bucket).remove([path]);
  if (storageError) {
    return { success: false, error: "Could not delete file from storage." };
  }

  const { error } = await supabase.from("uploads").delete().eq("id", id).eq("user_id", userId);
  if (error) return { success: false, error: "Could not delete upload record." };

  revalidatePath("/dashboard/uploads");
  return { success: true };
}
