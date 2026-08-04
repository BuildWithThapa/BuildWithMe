import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://buildwiththapa.np";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BuildWithThapa — Building Modern Web Experiences & Digital Solutions",
    template: "%s | BuildWithThapa"
  },
  description:
    "BuildWithThapa designs and builds premium web experiences: full-stack development, portfolio-quality engineering, and a free CV builder for job seekers.",
  keywords: [
    "web development",
    "full stack developer",
    "Nepal developer",
    "CV builder",
    "React developer",
    "Next.js developer"
  ],
  authors: [{ name: "Thapa" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "BuildWithThapa",
    title: "BuildWithThapa — Building Modern Web Experiences & Digital Solutions",
    description:
      "Full-stack development, premium portfolio engineering, and a free CV builder.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildWithThapa — Building Modern Web Experiences & Digital Solutions",
    description: "Full-stack development, premium portfolio engineering, and a free CV builder."
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  let displayName: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();
    displayName = profile?.full_name?.split(" ")[0] || user.email?.split("@")[0] || "there";
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} min-h-screen flex flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-signal-500 focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <Header displayName={displayName} />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
