import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely, resolving conflicts (last one wins). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Convert a string into a URL-safe slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

/** Basic email format validation (defense-in-depth; Zod handles form validation). */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Strip any HTML tags from user-supplied text before storing/rendering as plain text. */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>?/gm, "");
}

/** Format a numeric price with currency for pricing cards, framed as a starting point rather than a fixed quote. */
export function formatPrice(price: number | null, currency = "USD"): string {
  if (price === null) return "Custom quote";
  const formatted = new Intl.NumberFormat("en-US", { style: "currency", currency }).format(price);
  return `Starting at ${formatted}`;
}

/** Generate a unique, safe filename for storage uploads. */
export function uniqueFileName(originalName: string): string {
  const ext = originalName.split(".").pop()?.toLowerCase() ?? "bin";
  const safeExt = /^[a-z0-9]+$/.test(ext) ? ext : "bin";
  const random = crypto.randomUUID();
  return `${random}.${safeExt}`;
}
