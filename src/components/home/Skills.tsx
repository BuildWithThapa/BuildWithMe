const TECHNOLOGIES = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js",
  "PostgreSQL", "Supabase", "Vercel", "Figma", "GraphQL"
];

const SKILLS = [
  { label: "Frontend Engineering", value: 95 },
  { label: "Backend & Databases", value: 88 },
  { label: "UI / UX Design", value: 85 },
  { label: "DevOps & Deployment", value: 80 }
];

export function Skills() {
  return (
    <section className="section-padding">
      <div className="container-max grid gap-16 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Skills
          </h2>
          <div className="mt-8 space-y-6">
            {SKILLS.map((skill) => (
              <div key={skill.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">{skill.label}</span>
                  <span className="font-mono text-ink-900/50 dark:text-paper/50">
                    {skill.value}%
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-900/10 dark:bg-paper/10">
                  <div
                    className="h-full rounded-full bg-signal-gradient"
                    style={{ width: `${skill.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Technologies
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {TECHNOLOGIES.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-ink-900/10 px-4 py-2 font-mono text-sm text-ink-900/75 dark:border-paper/15 dark:text-paper/75"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
