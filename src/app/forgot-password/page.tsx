"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordValues } from "@/lib/validation";
import { requestPasswordReset } from "@/app/actions/auth";
import { AuthCard } from "@/components/auth/AuthCard";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordValues>({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = (values: ForgotPasswordValues) => {
    const formData = new FormData();
    formData.set("email", values.email);
    startTransition(async () => {
      await requestPasswordReset(formData);
      // Always show the same confirmation, whether or not the email exists.
      setSubmitted(true);
    });
  };

  if (submitted) {
    return (
      <AuthCard title="Check your inbox">
        <p className="text-sm text-ink-900/70 dark:text-paper/70">
          If an account exists for that email, we&apos;ve sent a link to
          reset your password.
        </p>
        <Button href="/login" className="mt-6 w-full">
          Back to login
        </Button>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Reset your password"
      subtitle="Enter your email and we'll send you a reset link."
      footer={
        <Link href="/login" className="text-ink-900/60 dark:text-paper/60">
          Back to login
        </Link>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <FormField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Sending..." : "Send reset link"}
        </Button>
      </form>
    </AuthCard>
  );
}
