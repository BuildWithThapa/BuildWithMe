import Link from "next/link";

export function AuthCard({
  title,
  subtitle,
  children,
  footer
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex justify-center font-display text-lg font-semibold">
          BuildWith<span className="text-signal-500">Thapa</span>
        </Link>
        <div className="rounded-2xl border border-ink-900/10 p-8 dark:border-paper/10">
          <h1 className="font-display text-2xl font-semibold tracking-tight">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-sm text-ink-900/60 dark:text-paper/60">{subtitle}</p>
          )}
          <div className="mt-6">{children}</div>
        </div>
        {footer && <div className="mt-6 text-center text-sm">{footer}</div>}
      </div>
    </section>
  );
}
