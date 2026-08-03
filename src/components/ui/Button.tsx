import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-signal-500 text-white hover:bg-signal-600 shadow-[0_8px_24px_-8px_rgba(79,124,255,0.6)]",
  secondary:
    "bg-ink-900 text-paper hover:bg-ink-800 dark:bg-paper dark:text-ink-900 dark:hover:bg-paper/90",
  ghost:
    "bg-transparent text-ink-900 hover:bg-ink-900/5 dark:text-paper dark:hover:bg-paper/10 border border-ink-900/10 dark:border-paper/15"
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base"
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

interface ButtonAsButton
  extends BaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  href?: undefined;
}

interface ButtonAsLink extends BaseProps {
  href: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonAsButton | ButtonAsLink>(
  ({ variant = "primary", size = "md", className, children, href, ...props }, ref) => {
    const classes = cn(baseClasses, variantStyles[variant], sizeStyles[size], className);

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
