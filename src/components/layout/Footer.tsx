import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, MessageCircle } from "lucide-react";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { href: "/portfolio", label: "Portfolio" },
      { href: "/services", label: "Services" },
      { href: "/cv-builder", label: "CV Builder" },
      { href: "/blog", label: "Blog" }
    ]
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" }
    ]
  }
];

/** Simple TikTok glyph — lucide-react doesn't ship brand icons. */
function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 2c.3 2.1 1.6 3.8 3.7 4.2v2.9c-1.3.1-2.6-.3-3.7-1v6.4c0 3.1-2.5 5.5-5.6 5.5-3.1 0-5.6-2.5-5.6-5.5 0-3 2.5-5.5 5.6-5.5.4 0 .8 0 1.1.1v3c-.3-.1-.7-.2-1.1-.2-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6 1.4 0 2.7-1.1 2.7-2.6V2h2.9Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink-900/8 dark:border-paper/10">
      <div className="container-max grid gap-10 px-6 py-16 md:grid-cols-[2fr_1fr_1fr] md:px-10">
        <div>
          <Link href="/" className="inline-flex items-center rounded-lg bg-white px-3 py-2 shadow-sm">
            <Image src="/logo.png" alt="BuildWithThapa" width={160} height={30} className="h-7 w-auto" />
          </Link>
          <p className="mt-3 max-w-xs text-sm text-ink-900/60 dark:text-paper/60">
            Building Modern Web Experiences &amp; Digital Solutions.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.tiktok.com/@build.with.thapa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-900/10 hover:bg-ink-900/5 dark:border-paper/15 dark:hover:bg-paper/10"
            >
              <TikTokIcon size={16} />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-900/10 hover:bg-ink-900/5 dark:border-paper/15 dark:hover:bg-paper/10"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://wa.me/447824385902"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-900/10 hover:bg-ink-900/5 dark:border-paper/15 dark:hover:bg-paper/10"
            >
              <MessageCircle size={16} />
            </a>
            <a
              href="mailto:hello@buildwiththapa.np"
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-900/10 hover:bg-ink-900/5 dark:border-paper/15 dark:hover:bg-paper/10"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink-900/50 dark:text-paper/50">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-900/70 hover:text-ink-900 dark:text-paper/70 dark:hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-ink-900/8 px-6 py-6 text-center text-xs text-ink-900/50 dark:border-paper/10 dark:text-paper/50 md:px-10">
        © {new Date().getFullYear()} BuildWithThapa. All rights reserved.
      </div>
    </footer>
  );
}
