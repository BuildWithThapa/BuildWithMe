"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation";
import { submitContactForm } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";

export function Contact() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactFormSchema) });

  const onSubmit = (values: ContactFormValues) => {
    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("email", values.email);
    formData.set("subject", values.subject ?? "");
    formData.set("message", values.message);

    startTransition(async () => {
      const result = await submitContactForm(formData);
      if (result.success) {
        setStatus("success");
        setServerError(null);
        reset();
      } else {
        setStatus("error");
        setServerError(result.error);
      }
    });
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-max grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Let&apos;s build something
          </h2>
          <p className="mt-4 max-w-md text-ink-900/65 dark:text-paper/65">
            Tell us about your project and we&apos;ll get back to you within
            one business day. We&apos;re happy to create a solution according
            to your needs and budget.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
              Full name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              {...register("name")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="w-full rounded-lg border border-ink-900/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-signal-500 dark:border-paper/20"
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="w-full rounded-lg border border-ink-900/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-signal-500 dark:border-paper/20"
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">
              Subject <span className="text-ink-900/40 dark:text-paper/40">(optional)</span>
            </label>
            <input
              id="subject"
              type="text"
              {...register("subject")}
              className="w-full rounded-lg border border-ink-900/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-signal-500 dark:border-paper/20"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
              Project details
            </label>
            <textarea
              id="message"
              rows={5}
              {...register("message")}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="w-full rounded-lg border border-ink-900/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-signal-500 dark:border-paper/20"
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-xs text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
            {isPending ? "Sending..." : "Send message"}
          </Button>

          <div aria-live="polite">
            {status === "success" && (
              <p className="text-sm text-success">Message sent — we&apos;ll be in touch soon.</p>
            )}
            {status === "error" && serverError && (
              <p className="text-sm text-red-500">{serverError}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
