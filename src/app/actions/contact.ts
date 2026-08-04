"use server";

import { headers } from "next/headers";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { contactFormSchema, newsletterSchema } from "@/lib/validation";
import { stripHtml } from "@/lib/utils";
import { sendEmail, contactNotificationHtml } from "@/lib/email";

export type ActionResult = { success: true } | { success: false; error: string };

// Simple in-memory rate limiter. Fine for a single Vercel instance during
// early traffic; swap for Upstash Redis (or similar) once you scale to
// multiple regions/instances, since this map is per-lambda-instance only.
const submissionLog = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (submissionLog.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissionLog.set(key, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

function getClientIp(): string {
  const h = headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? "unknown";
}

export async function submitContactForm(formData: FormData): Promise<ActionResult> {
  const ip = getClientIp();
  if (isRateLimited(`contact:${ip}`)) {
    return { success: false, error: "Too many submissions. Please try again in a minute." };
  }

  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message")
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { name, email, subject, message } = parsed.data;

  const supabase = createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: stripHtml(name),
    email,
    subject: subject ? stripHtml(subject) : null,
    message: stripHtml(message),
    ip_address: ip
  });

  if (error) {
    console.error("Contact form insert failed:", error.message, error.details, error.hint);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  const recipient = process.env.CONTACT_FORM_RECIPIENT;
  if (recipient) {
    // Fire-and-forget: email delivery failures should never fail the
    // contact form submission, since the message is already saved.
    void sendEmail({
      to: recipient,
      subject: subject ? `New inquiry: ${subject}` : "New contact form submission",
      html: contactNotificationHtml({ name, email, subject, message }),
      replyTo: email
    });
  }

  return { success: true };
}

export async function subscribeToNewsletter(formData: FormData): Promise<ActionResult> {
  const ip = getClientIp();
  if (isRateLimited(`newsletter:${ip}`)) {
    return { success: false, error: "Too many attempts. Please try again in a minute." };
  }

  const parsed = newsletterSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid email." };
  }

  // Use the admin client so we can upsert past RLS (public insert-only policy
  // still applies for anon users; this keeps behavior consistent server-side).
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .upsert({ email: parsed.data.email }, { onConflict: "email", ignoreDuplicates: true });

  if (error) {
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
