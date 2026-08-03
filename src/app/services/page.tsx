import type { Metadata } from "next";
import { Check } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import type { Service, Package } from "@/types";

export const metadata: Metadata = {
  title: "Services",
  description: "Web development packages built around what you actually need."
};

export default async function ServicesPage() {
  const supabase = createClient();

  const { data: services } = await supabase
    .from("services")
    .select("*, packages(*)")
    .eq("is_published", true)
    .order("display_order");

  return (
    <div className="section-padding">
      <div className="container-max">
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Services
        </h1>
        <p className="mt-3 max-w-2xl text-ink-900/65 dark:text-paper/65">
          Every project is scoped around what you actually need — contact
          us for more information and we&apos;ll put together a solution
          that fits your budget.
        </p>

        {(services as (Service & { packages: Package[] })[] | null)?.map((service) => (
          <div key={service.id} className="mt-16 first:mt-12">
            <h2 className="font-display text-2xl font-semibold tracking-tight">{service.name}</h2>
            {service.description && (
              <p className="mt-2 max-w-xl text-ink-900/60 dark:text-paper/60">
                {service.description}
              </p>
            )}

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {service.packages
                ?.filter((pkg) => pkg.is_published)
                .sort((a, b) => a.display_order - b.display_order)
                .map((pkg) => {
                  const featured = pkg.name === "Basic Plus";
                  return (
                    <div
                      key={pkg.id}
                      className={`flex flex-col rounded-2xl border p-8 ${
                        featured
                          ? "border-signal-500 bg-ink-900 text-paper shadow-xl dark:bg-paper dark:text-ink-900"
                          : "border-ink-900/10 dark:border-paper/10"
                      }`}
                    >
                      <h3 className="font-display text-xl font-semibold">{pkg.name}</h3>
                      {pkg.description && (
                        <p
                          className={`mt-2 text-sm ${
                            featured ? "opacity-70" : "text-ink-900/60 dark:text-paper/60"
                          }`}
                        >
                          {pkg.description}
                        </p>
                      )}
                      <p
                        className={`mt-6 font-display text-lg font-semibold ${
                          featured ? "" : "text-signal-500"
                        }`}
                      >
                        Contact for pricing
                      </p>
                      <ul className="mt-6 flex-1 space-y-3">
                        {pkg.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm">
                            <Check size={16} className="mt-0.5 shrink-0 text-signal-500" />
                            <span className={featured ? "" : "text-ink-900/75 dark:text-paper/75"}>
                              {f}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        href="/contact"
                        variant={featured ? "primary" : "ghost"}
                        className="mt-8"
                      >
                        {pkg.cta_label || "Get started"}
                      </Button>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
