"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guards";

export type TestimonialActionResult = { success: true } | { success: false; error: string };

export interface TestimonialFormInput {
  clientName: string;
  clientRole: string;
  clientCompany: string;
  clientAvatarUrl: string;
  content: string;
  rating: number;
  isPublished: boolean;
}

export async function createTestimonial(input: TestimonialFormInput): Promise<TestimonialActionResult> {
  const { supabase } = await requireAdmin();

  const { error } = await supabase.from("testimonials").insert({
    client_name: input.clientName,
    client_role: input.clientRole || null,
    client_company: input.clientCompany || null,
    client_avatar_url: input.clientAvatarUrl || null,
    content: input.content,
    rating: input.rating,
    is_published: input.isPublished
  });

  if (error) return { success: false, error: "Could not create testimonial." };
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function updateTestimonial(
  id: string,
  input: TestimonialFormInput
): Promise<TestimonialActionResult> {
  const { supabase } = await requireAdmin();

  const { error } = await supabase
    .from("testimonials")
    .update({
      client_name: input.clientName,
      client_role: input.clientRole || null,
      client_company: input.clientCompany || null,
      client_avatar_url: input.clientAvatarUrl || null,
      content: input.content,
      rating: input.rating,
      is_published: input.isPublished
    })
    .eq("id", id);

  if (error) return { success: false, error: "Could not update testimonial." };
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function deleteTestimonial(id: string): Promise<TestimonialActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { success: false, error: "Could not delete testimonial." };
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}
