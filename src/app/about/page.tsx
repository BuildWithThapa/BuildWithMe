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

const EXPERIENCE = [
  {
    role: "Founder & Full-Stack Developer",
    org: "BuildWithThapa",
    period: "2023 — Present",
    description:
      "Building sites and platforms for Nepali businesses, gamers, and streamers — from marketing pages to complete SaaS products, each one built to grow the client's online presence."
  },
  {
    role: "Frontend Engineer",
    org: "Freelance",
    period: "2021 — 2023",
    description:
      "Built and maintained React/Next.js applications for clients across e-commerce, analytics, and travel."
  }
];

const EDUCATION = [
  {
    degree: "B.Sc. in Computer Science",
    institution: "Tribhuvan University",
    period: "2017 — 2021"
  }
];

const SKILLS = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Supabase", "Tailwind CSS"];

const CERTIFICATES = [
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services" },
  { name: "Professional Scrum Master I", issuer: "Scrum.org" }
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

        <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight">Experience</h2>
        <div className="mt-6 space-y-8 border-l border-ink-900/10 pl-6 dark:border-paper/10">
          {EXPERIENCE.map((item) => (
            <div key={item.role} className="relative">
              <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-signal-500" />
              <p className="font-mono text-xs text-ink-900/45 dark:text-paper/45">{item.period}</p>
              <h3 className="mt-1 font-display text-lg font-semibold">{item.role}</h3>
              <p className="text-sm text-ink-900/55 dark:text-paper/55">{item.org}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-900/70 dark:text-paper/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight">Education</h2>
        <div className="mt-6 space-y-6 border-l border-ink-900/10 pl-6 dark:border-paper/10">
          {EDUCATION.map((item) => (
            <div key={item.degree} className="relative">
              <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-signal-500" />
              <p className="font-mono text-xs text-ink-900/45 dark:text-paper/45">{item.period}</p>
              <h3 className="mt-1 font-display text-lg font-semibold">{item.degree}</h3>
              <p className="text-sm text-ink-900/55 dark:text-paper/55">{item.institution}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight">Skills</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-ink-900/10 px-4 py-2 font-mono text-sm text-ink-900/75 dark:border-paper/15 dark:text-paper/75"
            >
              {skill}
            </span>
          ))}
        </div>

        <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight">Certificates</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {CERTIFICATES.map((cert) => (
            <div key={cert.name} className="rounded-xl border border-ink-900/10 p-4 dark:border-paper/10">
              <p className="font-medium">{cert.name}</p>
              <p className="text-sm text-ink-900/55 dark:text-paper/55">{cert.issuer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
