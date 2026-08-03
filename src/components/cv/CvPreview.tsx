import type { CvSection } from "@/types";
import { getSingleFields, getEntries, formatDateRange } from "@/lib/cv/dataHelpers";
import { getTemplateBySlug } from "@/lib/cv/templates";

interface CvPreviewProps {
  templateSlug: string;
  sections: CvSection[];
}

function SkillTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-black/[0.06] px-2.5 py-1 text-[11px]">{children}</span>
  );
}

export function CvPreview({ templateSlug, sections }: CvPreviewProps) {
  const template = getTemplateBySlug(templateSlug);
  const personal = getSingleFields(sections, "personal_info");
  const about = getSingleFields(sections, "about");
  const education = getEntries(sections, "education");
  const experience = getEntries(sections, "experience");
  const projects = getEntries(sections, "projects");
  const skills = getEntries(sections, "skills");
  const languages = getEntries(sections, "languages");
  const certifications = getEntries(sections, "certifications");
  const references = getEntries(sections, "references");

  const isCreative = template.slug === "creative";
  const isMinimal = template.slug === "minimal";
  const isAts = template.slug === "ats-friendly";

  const headingClass = isAts
    ? "text-lg font-bold uppercase tracking-wide"
    : "text-sm font-bold uppercase tracking-wide";

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) =>
    children ? (
      <div className="mb-5">
        <h2 className={`${headingClass} ${isAts ? "text-black" : template.accentClass} mb-2`}>
          {title}
        </h2>
        {children}
      </div>
    ) : null;

  const contactLine = [personal.email, personal.phone, personal.website, personal.address]
    .filter(Boolean)
    .join("  •  ");

  const mainContent = (
    <>
      <Section title="About">{about.summary && <p className="text-sm leading-relaxed">{about.summary}</p>}</Section>
      <Section title="Career Objective">
        {about.careerObjective && <p className="text-sm leading-relaxed">{about.careerObjective}</p>}
      </Section>

      {experience.length > 0 && (
        <Section title="Experience">
          <div className="space-y-4">
            {experience.map((e, i) => (
              <div key={i}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <p className="text-sm font-semibold">
                    {e.role} {e.company && <span className="font-normal">— {e.company}</span>}
                  </p>
                  <p className="text-xs opacity-60">
                    {formatDateRange(e.startDate, e.endDate, e.current)}
                  </p>
                </div>
                {e.location && <p className="text-xs opacity-60">{e.location}</p>}
                {e.description && <p className="mt-1 text-sm leading-relaxed">{e.description}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          <div className="space-y-3">
            {education.map((e, i) => (
              <div key={i}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <p className="text-sm font-semibold">
                    {e.degree} {e.fieldOfStudy && <span className="font-normal">in {e.fieldOfStudy}</span>}
                  </p>
                  <p className="text-xs opacity-60">{formatDateRange(e.startDate, e.endDate)}</p>
                </div>
                {e.institution && <p className="text-xs opacity-60">{e.institution}</p>}
                {e.description && <p className="mt-1 text-sm leading-relaxed">{e.description}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects">
          <div className="space-y-3">
            {projects.map((p, i) => (
              <div key={i}>
                <p className="text-sm font-semibold">
                  {p.name}
                  {p.link && <span className="ml-2 text-xs font-normal opacity-60">{p.link}</span>}
                </p>
                {p.techStack && <p className="text-xs opacity-60">{p.techStack}</p>}
                {p.description && <p className="mt-1 text-sm leading-relaxed">{p.description}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {references.length > 0 && (
        <Section title="References">
          <div className="grid gap-3 sm:grid-cols-2">
            {references.map((r, i) => (
              <div key={i} className="text-sm">
                <p className="font-semibold">{r.name}</p>
                <p className="text-xs opacity-60">
                  {[r.role, r.company].filter(Boolean).join(", ")}
                </p>
                <p className="text-xs opacity-60">{[r.email, r.phone].filter(Boolean).join(" · ")}</p>
              </div>
            ))}
          </div>
        </Section>
      )}
    </>
  );

  const sideContent = (
    <>
      {skills.length > 0 && (
        <Section title="Skills">
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s, i) => (
              <SkillTag key={i}>{[s.name, s.level].filter(Boolean).join(" · ")}</SkillTag>
            ))}
          </div>
        </Section>
      )}
      {languages.length > 0 && (
        <Section title="Languages">
          <ul className="space-y-1 text-sm">
            {languages.map((l, i) => (
              <li key={i}>
                {l.name} {l.proficiency && <span className="opacity-60">— {l.proficiency}</span>}
              </li>
            ))}
          </ul>
        </Section>
      )}
      {certifications.length > 0 && (
        <Section title="Certifications">
          <ul className="space-y-1.5 text-sm">
            {certifications.map((c, i) => (
              <li key={i}>
                <p className="font-medium">{c.name}</p>
                <p className="text-xs opacity-60">{[c.issuer, c.date].filter(Boolean).join(" · ")}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );

  return (
    <div
      id="cv-preview-root"
      className={`${template.containerClass} mx-auto w-[210mm] min-h-[297mm] bg-white p-12 text-black shadow-lg`}
    >
      <header className={`mb-8 ${isCreative ? "" : "border-b border-black/10 pb-6"}`}>
        <h1 className={`font-bold ${isMinimal ? "text-4xl tracking-tight" : "text-3xl"}`}>
          {personal.fullName || "Your Name"}
        </h1>
        {contactLine && <p className="mt-2 text-sm opacity-70">{contactLine}</p>}
        {(personal.githubUrl || personal.linkedinUrl) && (
          <p className="mt-1 text-sm opacity-70">
            {[personal.githubUrl, personal.linkedinUrl].filter(Boolean).join("  •  ")}
          </p>
        )}
      </header>

      {isCreative ? (
        <div className="grid grid-cols-[1fr_2fr] gap-8">
          <div className="border-r border-black/10 pr-6">{sideContent}</div>
          <div>{mainContent}</div>
        </div>
      ) : (
        <div>
          {mainContent}
          {sideContent}
        </div>
      )}
    </div>
  );
}
