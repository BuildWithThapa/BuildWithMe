"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth-guards";

export type ProfileActionResult = { success: true } | { success: false; error: string };

export interface ProfileFormInput {
  fullName: string;
  phone: string;
  website: string;
  address: string;
  bio: string;
  avatarUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}

export async function updateProfile(input: ProfileFormInput): Promise<ProfileActionResult> {
  const { supabase, userId } = await requireUser();

  const { error } = await supabase
    .from("user_profiles")
    .update({
      full_name: input.fullName,
      phone: input.phone || null,
      website: input.website || null,
      address: input.address || null,
      bio: input.bio || null,
      avatar_url: input.avatarUrl || null,
      social_links: {
        github: input.githubUrl || undefined,
        linkedin: input.linkedinUrl || undefined
      }
    })
    .eq("id", userId);

  if (error) return { success: false, error: "Could not update profile." };

  revalidatePath("/dashboard/profile");
  revalidatePath("/dashboard");
  return { success: true };
}
