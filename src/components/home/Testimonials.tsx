const TESTIMONIALS = [
  {
    name: "Sarina K.C.",
    content:
      "Thapa rebuilt our booking flow from scratch and it just works — faster load times, cleaner design, and our conversion rate is up noticeably."
  },
  {
    name: "Rajan Adhikari",
    content:
      "Communication was clear from day one. We scoped the project together, and every milestone shipped on time with no surprises."
  },
  {
    name: "Maya Gurung",
    content:
      "Used the free CV builder to apply for a role abroad — the ATS-friendly template got past the screening and I landed the interview."
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
              <blockquote className="text-sm text-ink-900/75 dark:text-paper/75">
                &ldquo;{t.content}&rdquo;
              </blockquote>
              <figcaption className="mt-5">
                <p className="text-sm font-semibold">{t.name}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
