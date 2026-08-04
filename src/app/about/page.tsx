import type { Metadata } from "next";
import { Download, TrendingUp, Rocket, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description: "The person and story behind BuildWithThapa."
};

const STATS = [
  { icon: Rocket, value: "50+", label: "Websites shipped" },
  { icon: Users, value: "100%", label: "Nepali businesses, gamers & streamers" },
  { icon: TrendingUp, value: "3x", label: "Average growth after launch" }
];

export default function AboutPage() {
  return (
    <div className="section-padding">
      <div className="container-max max-w-3xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
          About
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-900/70 dark:text-paper/70">
          I&apos;ve helped Nepali businesses, gamers, and streamers turn a
          rough idea into a live website that actually works for them —
          dozens of projects shipped, each one built to grow their online
          presence, not just look good in a screenshot. Now it&apos;s your
          turn.
        </p>

        <div className="mt-8 grid grid-cols-3 gap-4">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="rounded-xl border border-ink-900/10 p-4 text-center dark:border-paper/10">
              <Icon size={18} className="mx-auto text-signal-500" />
              <p className="mt-2 font-display text-2xl font-semibold">{value}</p>
              <p className="mt-1 text-xs text-ink-900/55 dark:text-paper/55">{label}</p>
            </div>
          ))}
        </div>

        <Button href="/cv.pdf" className="mt-8">
          <Download size={16} /> Download CV
        </Button>
      </div>
    </div>
  );
}
