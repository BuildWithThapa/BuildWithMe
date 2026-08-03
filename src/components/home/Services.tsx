import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

const PACKAGES = [
  {
    name: "Basic",
    priceLabel: "Contact for pricing",
    description: "A polished single-page site to get you online fast.",
    features: ["Up to 5 sections", "Mobile responsive", "Basic SEO setup", "1 round of revisions"],
    featured: false
  },
  {
    name: "Basic Plus",
    priceLabel: "Contact for pricing",
    description: "A multi-page site or web app with real functionality.",
    features: [
      "Up to 8 pages",
      "Supabase auth & database",
      "CMS-editable content",
      "Contact & newsletter forms",
      "3 rounds of revisions"
    ],
    featured: true
  },
  {
    name: "Premium",
    priceLabel: "Contact for pricing",
    description: "A full SaaS platform, built and shipped end to end.",
    features: [
      "Custom architecture",
      "Admin panel & role-based access",
      "Third-party integrations",
      "Performance & security hardening",
      "Ongoing support"
    ],
    featured: false
  }
];

export function Services() {
  return (
    <section id="services" className="section-padding bg-ink-900/[0.02] dark:bg-paper/[0.02]">
      <div className="container-max">
        <div className="max-w-2xl">
          <h2 className="text-balance font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Packages built around what you actually need
          </h2>
          <p className="mt-4 text-ink-900/65 dark:text-paper/65">
            Every project is scoped around what you actually need. Contact
            us for more information — we&apos;re happy to create a solution
            according to your needs and budget.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`flex flex-col rounded-2xl border p-8 ${
                pkg.featured
                  ? "border-signal-500 bg-ink-900 text-paper shadow-xl dark:bg-paper dark:text-ink-900"
                  : "border-ink-900/10 dark:border-paper/10"
              }`}
            >
              <h3 className="font-display text-xl font-semibold">{pkg.name}</h3>
              <p
                className={`mt-2 text-sm ${
                  pkg.featured ? "opacity-70" : "text-ink-900/60 dark:text-paper/60"
                }`}
              >
                {pkg.description}
              </p>
              <p
                className={`mt-6 font-display text-lg font-semibold ${
                  pkg.featured ? "" : "text-signal-500"
                }`}
              >
                {pkg.priceLabel}
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={16} className="mt-0.5 shrink-0 text-signal-500" />
                    <span className={pkg.featured ? "" : "text-ink-900/75 dark:text-paper/75"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                href="/contact"
                variant={pkg.featured ? "primary" : "ghost"}
                className="mt-8"
              >
                Get started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
