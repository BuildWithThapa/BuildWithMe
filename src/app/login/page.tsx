"use client";

import { useState, useTransition, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginValues } from "@/lib/validation";
import { loginUser } from "@/app/actions/auth";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

// Leaf image + per-leaf position/timing, matching the original template's
// staggered fall animation (8 leaves cycling through 4 images).
const LEAVES = [
  { src: "/login-bg/leaf_01.png", left: "20%", duration: "20s" },
  { src: "/login-bg/leaf_02.png", left: "50%", duration: "14s" },
  { src: "/login-bg/leaf_03.png", left: "70%", duration: "12s" },
  { src: "/login-bg/leaf_04.png", left: "5%", duration: "15s" },
  { src: "/login-bg/leaf_01.png", left: "85%", duration: "18s" },
  { src: "/login-bg/leaf_02.png", left: "90%", duration: "12s" },
  { src: "/login-bg/leaf_03.png", left: "15%", duration: "14s" },
  { src: "/login-bg/leaf_04.png", left: "60%", duration: "15s" }
];

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
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-6 py-16">
      {/* Background scene from the template — photo, walking figure,
          falling leaves, tree silhouette frame in front */}
      <Image src="/login-bg/bg.jpg" alt="" fill priority className="pointer-events-none object-cover" />

      <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
        {LEAVES.map((leaf, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={leaf.src}
            alt=""
            className="login-leaf"
            style={{ left: leaf.left, animation: `loginLeafFall ${leaf.duration} linear infinite` }}
          />
        ))}
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/login-bg/girl.png" alt="" className="login-girl z-10" />

      <Image
        src="/login-bg/trees.png"
        alt=""
        fill
        className="pointer-events-none z-[100] object-cover"
      />

      {/* Glass card — sits above every decorative layer so it's always
          usable regardless of the tree silhouette's framing */}
      <div className="relative z-[200] w-full max-w-md rounded-3xl border border-white bg-white/25 p-10 shadow-[0_25px_50px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
        <Link href="/" className="mb-8 flex justify-center">
          <span className="inline-flex items-center rounded-lg bg-white px-3 py-1.5 shadow-sm">
            <Image src="/logo.png" alt="BuildWithThapa" width={140} height={26} className="h-6 w-auto" />
          </span>
        </Link>

        <h1 className="text-center font-display text-3xl font-semibold text-ink-900">Sign In</h1>
        <p className="mt-2 text-center text-sm text-ink-900/70">
          Log in to manage your CVs and dashboard.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-4">
          <div>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              aria-invalid={!!errors.email}
              className="w-full rounded-lg border-none bg-white px-5 py-3.5 text-ink-900 placeholder-ink-900/50 outline-none"
              {...register("email")}
            />
            {errors.email && <p className="mt-1.5 text-xs text-red-700">{errors.email.message}</p>}
          </div>

          <div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              aria-invalid={!!errors.password}
              className="w-full rounded-lg border-none bg-white px-5 py-3.5 text-ink-900 placeholder-ink-900/50 outline-none"
              {...register("password")}
            />
            {errors.password && <p className="mt-1.5 text-xs text-red-700">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-signal-500 py-3.5 font-semibold text-white transition-colors hover:bg-signal-600 disabled:opacity-60"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>

          {serverError && (
            <p role="alert" className="text-center text-sm text-red-700">
              {serverError}
            </p>
          )}

          <div className="flex items-center justify-between pt-1 text-sm">
            <Link href="/forgot-password" className="font-medium text-ink-900/80 hover:text-ink-900">
              Forgot Password
            </Link>
            <Link href="/register" className="font-medium text-ink-900 underline underline-offset-2">
              Signup
            </Link>
          </div>
        </form>

        {/* Google sign-in — below the form, not above it */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-ink-900/15" />
          <span className="text-xs text-ink-900/50">or</span>
          <div className="h-px flex-1 bg-ink-900/15" />
        </div>
        <GoogleSignInButton variant="light" />
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
