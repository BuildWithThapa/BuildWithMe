import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarina K.C.",
    role: "Founder, TrekMate Nepal",
    content:
      "Thapa rebuilt our booking flow from scratch and it just works — faster load times, cleaner design, and our conversion rate is up noticeably.",
    rating: 5
  },
  {
    name: "Rajan Adhikari",
    role: "Product Lead, Himal Analytics",
    content:
      "Communication was clear from day one. We scoped the project together, and every milestone shipped on time with no surprises.",
    rating: 5
  },
  {
    name: "Maya Gurung",
    role: "Job seeker, CV Builder user",
    content:
      "Used the free CV builder to apply for a role abroad — the ATS-friendly template got past the screening and I landed the interview.",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          What people say
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl border border-ink-900/10 p-6 dark:border-paper/10"
            >
              <div className="flex gap-1 text-warning" aria-hidden="true">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-4 text-sm text-ink-900/75 dark:text-paper/75">
                &ldquo;{t.content}&rdquo;
              </blockquote>
              <figcaption className="mt-5">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-ink-900/50 dark:text-paper/50">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
