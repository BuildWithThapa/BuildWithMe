"use client";

import { useState, useTransition, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginValues } from "@/lib/validation";
import { loginUser } from "@/app/actions/auth";
import { AuthCard } from "@/components/auth/AuthCard";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackError = searchParams.get("error");
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(
    callbackError ? "Your confirmation link expired or is invalid. Please try again." : null
  );

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (values: LoginValues) => {
    setServerError(null);
    const formData = new FormData();
    formData.set("email", values.email);
    formData.set("password", values.password);

    startTransition(async () => {
      const result = await loginUser(formData);
      // A successful login redirects server-side, so we only ever see the
      // failure branch here.
      if (!result.success) {
        setServerError(result.error);
      }
    });
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to manage your CVs and dashboard."
      footer={
        <span className="text-ink-900/60 dark:text-paper/60">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-signal-500">
            Create one
          </Link>
        </span>
      }
    >
      <GoogleSignInButton />

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-ink-900/10 dark:bg-paper/15" />
        <span className="text-xs text-ink-900/40 dark:text-paper/40">or</span>
        <div className="h-px flex-1 bg-ink-900/10 dark:bg-paper/15" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <FormField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <div>
          <FormField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />
          <Link
            href="/forgot-password"
            className="mt-1.5 inline-block text-xs text-signal-500"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Logging in..." : "Log in"}
        </Button>

        {serverError && (
          <p role="alert" className="text-sm text-red-500">
            {serverError}
          </p>
        )}
      </form>
    </AuthCard>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
