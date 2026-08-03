import { createClient } from "@/lib/supabase/server";
import { TestimonialCard } from "@/components/admin/TestimonialCard";
import type { Testimonial } from "@/types";

export default async function AdminTestimonialsPage() {
  const supabase = createClient();
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("display_order");

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight">Testimonials</h1>
      <p className="mt-1 text-sm text-ink-900/60 dark:text-paper/60">
        Shown on the homepage in the order they appear here.
      </p>

      <div className="mt-8 space-y-6">
        <TestimonialCard />
        {(testimonials as Testimonial[] | null)?.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </div>
    </div>
  );
}
