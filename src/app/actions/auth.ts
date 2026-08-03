"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from "@/lib/validation";
import { sendEmail, welcomeEmailHtml } from "@/lib/email";

export type AuthActionResult = { success: true } | { success: false; error: string };

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? `https://${headers().get("host")}`;
}

export async function registerUser(formData: FormData): Promise<AuthActionResult> {
  const parsed = registerSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword")
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { fullName, email, password } = parsed.data;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${getSiteUrl()}/auth/callback`
    }
  });

  if (error) {
    // Supabase already avoids confirming whether an email exists in most
    // configurations; surface a generic message either way.
    return { success: false, error: error.message };
  }

  void sendEmail({
    to: email,
    subject: "Welcome to BuildWithThapa",
    html: welcomeEmailHtml(fullName)
  });

  return { success: true };
}

export async function loginUser(formData: FormData): Promise<AuthActionResult> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { success: false, error: "Incorrect email or password." };
  }

  redirect("/dashboard");
}

export async function logoutUser(): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function requestPasswordReset(formData: FormData): Promise<AuthActionResult> {
  const parsed = forgotPasswordSchema.safeParse({ email: formData.get("email") });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = createClient();
  // Always report success regardless of whether the email exists, to avoid
  // leaking which addresses are registered.
  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${getSiteUrl()}/reset-password`
  });

  return { success: true };
}

export async function resetPassword(formData: FormData): Promise<AuthActionResult> {
  const parsed = resetPasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword")
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });

  if (error) {
    return { success: false, error: "Could not update password. Please try the reset link again." };
  }

  return { success: true };
}
