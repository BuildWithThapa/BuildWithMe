"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, type NewsletterValues } from "@/lib/validation";
import { subscribeToNewsletter } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";

export function Newsletter() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<NewsletterValues>({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = (values: NewsletterValues) => {
    const formData = new FormData();
    formData.set("email", values.email);
    startTransition(async () => {
      const result = await subscribeToNewsletter(formData);
      if (result.success) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        setServerError(result.error);
      }
    });
  };

  return (
    <section className="section-padding">
      <div className="container-max rounded-3xl bg-signal-gradient px-8 py-14 text-center text-white md:px-16">
        <h2 className="font-display text-2xl font-semibold md:text-3xl">
          Get occasional dev notes, not spam
        </h2>
        <p className="mx-auto mt-3 max-w-md text-white/80">
          One email a month, at most — new projects, CV builder updates, and
          things we learned shipping.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register("email")}
            aria-invalid={!!errors.email}
            className="w-full flex-1 rounded-full border-0 bg-white/15 px-5 py-3 text-sm text-white placeholder:text-white/60 outline-none focus-visible:outline-white"
          />
          <Button
            type="submit"
            disabled={isPending}
            variant="secondary"
            className="bg-white text-ink-900 hover:bg-white/90"
          >
            {isPending ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
        <div aria-live="polite" className="mt-3 text-sm">
          {errors.email && <p className="text-white/90">{errors.email.message}</p>}
          {status === "success" && <p>You&apos;re subscribed — welcome aboard.</p>}
          {status === "error" && serverError && <p>{serverError}</p>}
        </div>
      </div>
    </section>
  );
}
