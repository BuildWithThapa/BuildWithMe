import type { CvSection } from "@/types";
import { getSingleFields, getEntries, formatDateRange } from "@/lib/cv/dataHelpers";

interface CvPreviewProps {
  templateSlug: string;
  sections: CvSection[];
}

export function CvPreview({ templateSlug, sections }: CvPreviewProps) {
  const personal = getSingleFields(sections, "personal_info");
  const about = getSingleFields(sections, "about");
  const education = getEntries(sections, "education");
  const experience = getEntries(sections, "experience");
  const projects = getEntries(sections, "projects");
  const skills = getEntries(sections, "skills");
  const languages = getEntries(sections, "languages");
  const certifications = getEntries(sections, "certifications");
  const references = getEntries(sections, "references");

  const name = personal.fullName || "Your Name";
  const initial = name.trim().charAt(0).toUpperCase() || "Y";

  const Photo = ({ className }: { className: string }) =>
    personal.profilePhotoUrl ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={personal.profilePhotoUrl} alt={name} className={`${className} object-cover`} />
    ) : (
      <div className={`${className} flex items-center justify-center bg-white/25 text-2xl font-bold text-white`}>
        {initial}
      </div>
    );

  // =====================================================================
  // Template 1 — Navy Sidebar
  // =====================================================================
  if (templateSlug === "navy-sidebar") {
    return (
      <div
        id="cv-preview-root"
        className="mx-auto flex w-[210mm] min-h-[297mm] bg-white text-black shadow-lg"
      >
        <aside className="w-[34%] bg-[#1B2436] p-8 text-white">
          <Photo className="mx-auto h-28 w-28 rounded-full border-4 border-white/20" />

          <div className="mt-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white/60">Contact</h2>
            <div className="mt-3 space-y-2 text-[11px] leading-relaxed">
              {personal.phone && <p>{personal.phone}</p>}
              {personal.email && <p className="break-all">{personal.email}</p>}
              {personal.website && <p className="break-all">{personal.website}</p>}
              {personal.address && <p>{personal.address}</p>}
            </div>
          </div>

          {skills.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xs font-bold uppercase tracking-wider text-white/60">Skills</h2>
              <div className="mt-3 space-y-2">
                {skills.map((s, i) => (
                  <div key={i} className="text-[11px]">
                    <p>{s.name}</p>
                    <div className="mt-1 h-1 w-full rounded-full bg-white/15">
                      <div
                        className="h-1 rounded-full bg-white/70"
                        style={{
                          width:
                            s.level === "Expert"
                              ? "95%"
                              : s.level === "Advanced"
                                ? "80%"
                                : s.level === "Intermediate"
                                  ? "60%"
                                  : "40%"
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xs font-bold uppercase tracking-wider text-white/60">Language</h2>
              <div className="mt-3 space-y-1.5 text-[11px]">
                {languages.map((l, i) => (
                  <p key={i}>
                    {l.name} {l.proficiency && <span className="text-white/50">— {l.proficiency}</span>}
                  </p>
                ))}
              </div>
            </div>
          )}

          {references.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xs font-bold uppercase tracking-wider text-white/60">References</h2>
              <div className="mt-3 space-y-3 text-[11px]">
                {references.map((r, i) => (
                  <div key={i}>
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-white/60">{[r.role, r.company].filter(Boolean).join(", ")}</p>
                    <p className="text-white/60">{[r.email, r.phone].filter(Boolean).join(" · ")}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold tracking-tight">{name.toUpperCase()}</h1>
          {(about.careerObjective || personal.website) && (
            <p className="mt-1 text-xs uppercase tracking-widest text-[#1B2436]/60">
              {about.careerObjective ? about.careerObjective.slice(0, 60) : "Professional"}
            </p>
          )}

          {about.summary && (
            <Section title="About Me">
              <p className="text-[11px] leading-relaxed">{about.summary}</p>
            </Section>
          )}

          {education.length > 0 && (
            <Section title="Education">
              <div className="space-y-3">
                {education.map((e, i) => (
                  <div key={i}>
                    <p className="text-[11px] font-bold">{formatDateRange(e.startDate, e.endDate)}</p>
                    <p className="text-[11px] font-semibold">
                      {e.degree}
                      {e.institution && <span className="font-normal"> — {e.institution}</span>}
                    </p>
                    {e.description && <p className="text-[11px] text-black/60">{e.description}</p>}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {experience.length > 0 && (
            <Section title="Experience">
              <div className="space-y-3">
                {experience.map((e, i) => (
                  <div key={i}>
                    <p className="text-[11px] font-bold">{formatDateRange(e.startDate, e.endDate, e.current)}</p>
                    <p className="text-[11px] font-semibold">
                      {e.role}
                      {e.company && <span className="font-normal"> — {e.company}</span>}
                    </p>
                    {e.description && <p className="text-[11px] text-black/60">{e.description}</p>}
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
                    <p className="text-[11px] font-semibold">{p.name}</p>
                    {p.techStack && <p className="text-[10px] text-black/50">{p.techStack}</p>}
                    {p.description && <p className="text-[11px] text-black/60">{p.description}</p>}
                  </div>
                ))}
              </div>
            </Section>
          )}
        </main>
      </div>
    );

    function Section({ title, children }: { title: string; children: React.ReactNode }) {
      return (
        <div className="mt-6">
          <h2 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B2436]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1B2436]" />
            {title}
          </h2>
          {children}
        </div>
      );
    }
  }

  // =====================================================================
  // Template 2 — Sunburst (black + amber)
  // =====================================================================
  if (templateSlug === "sunburst") {
    const AMBER = "#F0A93A";
    return (
      <div id="cv-preview-root" className="mx-auto flex w-[210mm] min-h-[297mm] bg-white text-black shadow-lg">
        <aside className="w-[34%] bg-black p-7 pt-10 text-white">
          <Photo className="mx-auto h-24 w-24 rounded-full" />

          <div className="mt-8 border-t pt-4" style={{ borderColor: AMBER }}>
            <h2 className="text-xs font-bold uppercase tracking-wider">Contact Details</h2>
            <div className="mt-3 space-y-2 text-[11px] leading-relaxed text-white/80">
              {personal.phone && <p>{personal.phone}</p>}
              {personal.email && <p className="break-all">{personal.email}</p>}
              {personal.website && <p className="break-all">{personal.website}</p>}
            </div>
          </div>

          {about.careerObjective && (
            <div className="mt-6 border-t pt-4" style={{ borderColor: AMBER }}>
              <h2 className="text-xs font-bold uppercase tracking-wider">Objective</h2>
              <p className="mt-2 text-[11px] leading-relaxed text-white/80">{about.careerObjective}</p>
            </div>
          )}

          {skills.length > 0 && (
            <div className="mt-6 border-t pt-4" style={{ borderColor: AMBER }}>
              <h2 className="text-xs font-bold uppercase tracking-wider">Skills</h2>
              <div className="mt-3 space-y-2">
                {skills.map((s, i) => (
                  <div key={i} className="text-[11px]">
                    <p>{s.name}</p>
                    <div className="mt-1 h-1 w-full rounded-full bg-white/15">
                      <div
                        className="h-1 rounded-full"
                        style={{
                          backgroundColor: AMBER,
                          width:
                            s.level === "Expert"
                              ? "95%"
                              : s.level === "Advanced"
                                ? "80%"
                                : s.level === "Intermediate"
                                  ? "60%"
                                  : "40%"
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div className="mt-6 border-t pt-4" style={{ borderColor: AMBER }}>
              <h2 className="text-xs font-bold uppercase tracking-wider">Languages</h2>
              <div className="mt-2 space-y-1 text-[11px] text-white/80">
                {languages.map((l, i) => (
                  <p key={i}>{l.name}</p>
                ))}
              </div>
            </div>
          )}
        </aside>

        <main className="flex-1">
          <div className="p-7" style={{ backgroundColor: AMBER }}>
            <p className="text-2xl font-bold text-[#1B2436]">{name}</p>
            {about.summary && <p className="mt-0.5 text-xs font-medium text-[#1B2436]/70">{about.summary.slice(0, 50)}</p>}
          </div>

          <div className="p-7">
            {education.length > 0 && (
              <div>
                <h2 className="mb-2 inline-block px-2 py-0.5 text-xs font-bold uppercase text-white" style={{ backgroundColor: AMBER }}>
                  Education
                </h2>
                <div className="mt-2 space-y-2">
                  {education.map((e, i) => (
                    <div key={i} className="text-[11px]">
                      <p className="font-semibold">
                        {e.degree}
                        {e.fieldOfStudy && <span className="font-normal"> in {e.fieldOfStudy}</span>}
                      </p>
                      <p className="text-black/50">
                        {[e.institution, formatDateRange(e.startDate, e.endDate)].filter(Boolean).join(" | ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {experience.length > 0 && (
              <div className="mt-6">
                <h2 className="mb-2 inline-block px-2 py-0.5 text-xs font-bold uppercase text-white" style={{ backgroundColor: AMBER }}>
                  Work Experience
                </h2>
                <div className="mt-2 space-y-3">
                  {experience.map((e, i) => (
                    <div key={i} className="text-[11px]">
                      <p className="font-semibold">{e.role}</p>
                      <p className="text-black/50">
                        {[e.company, formatDateRange(e.startDate, e.endDate, e.current)].filter(Boolean).join(" | ")}
                      </p>
                      {e.description && <p className="mt-1 text-black/70">{e.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div className="mt-6">
                <h2 className="mb-2 inline-block px-2 py-0.5 text-xs font-bold uppercase text-white" style={{ backgroundColor: AMBER }}>
                  Certifications
                </h2>
                <div className="mt-2 space-y-1.5 text-[11px]">
                  {certifications.map((c, i) => (
                    <p key={i}>
                      <span className="font-semibold">{c.name}</span>
                      {c.issuer && <span className="text-black/50"> — {c.issuer}</span>}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // =====================================================================
  // Template 3 — Bold Contrast (navy + amber, oversized name)
  // =====================================================================
  if (templateSlug === "bold-contrast") {
    const AMBER = "#F5B942";
    const NAVY = "#10182B";
    return (
      <div
        id="cv-preview-root"
        className="mx-auto w-[210mm] min-h-[297mm] text-white shadow-lg"
        style={{ backgroundColor: NAVY }}
      >
        <div className="grid grid-cols-2 gap-6 p-9">
          <div>
            <Photo className="h-40 w-full rounded-md" />
            <p className="mt-5 text-4xl font-extrabold leading-none" style={{ color: AMBER }}>
              {name.split(" ")[0]}
            </p>
            <p className="text-4xl font-extrabold leading-none text-white">
              {name.split(" ").slice(1).join(" ") || " "}
            </p>
            {about.careerObjective && (
              <span className="mt-3 inline-block rounded px-3 py-1 text-xs font-semibold" style={{ backgroundColor: AMBER, color: NAVY }}>
                {about.careerObjective.slice(0, 30)}
              </span>
            )}
          </div>

          <div className="rounded-xl p-5" style={{ backgroundColor: AMBER, color: NAVY }}>
            <h2 className="text-sm font-bold uppercase">Profile</h2>
            {about.summary && <p className="mt-2 text-[11px] leading-relaxed">{about.summary}</p>}
            <div className="mt-4 space-y-1.5 text-[11px] font-medium">
              {personal.phone && <p>{personal.phone}</p>}
              {personal.email && <p className="break-all">{personal.email}</p>}
              {personal.website && <p className="break-all">{personal.website}</p>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-6 px-9 pb-9">
          {experience.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: AMBER }}>
                Experience
              </h2>
              <div className="mt-2 space-y-2 border-l pl-3" style={{ borderColor: AMBER }}>
                {experience.map((e, i) => (
                  <div key={i} className="text-[11px]">
                    <p className="font-semibold">
                      {e.role} {e.company && <span className="font-normal text-white/70">({e.company})</span>}
                    </p>
                    <p className="text-white/50">{formatDateRange(e.startDate, e.endDate, e.current)}</p>
                    {e.description && <p className="mt-0.5 text-white/70">{e.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: AMBER }}>
                Education
              </h2>
              <div className="mt-2 space-y-2 border-l pl-3" style={{ borderColor: AMBER }}>
                {education.map((e, i) => (
                  <div key={i} className="text-[11px]">
                    <p className="font-semibold">{e.institution}</p>
                    <p className="text-white/50">{formatDateRange(e.startDate, e.endDate)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: AMBER }}>
                Languages
              </h2>
              <ul className="mt-2 space-y-1 text-[11px] text-white/80">
                {languages.map((l, i) => (
                  <li key={i}>- {l.name}</li>
                ))}
              </ul>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: AMBER }}>
                Skills
              </h2>
              <ul className="mt-2 space-y-1 text-[11px] text-white/80">
                {skills.map((s, i) => (
                  <li key={i}>- {s.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =====================================================================
  // Template 4 — Teal Professional
  // =====================================================================
  const TEAL = "#2FB6C4";
  return (
    <div id="cv-preview-root" className="mx-auto flex w-[210mm] min-h-[297mm] bg-white text-black shadow-lg">
      <aside className="w-[34%] p-7 text-center text-white" style={{ backgroundColor: TEAL }}>
        <Photo className="mx-auto h-28 w-28 rounded-full border-4 border-white/50" />
        <p className="mt-4 text-xl font-bold">{name}</p>
        {about.careerObjective && <p className="text-sm text-white/85">{about.careerObjective.slice(0, 30)}</p>}

        {about.summary && (
          <div className="mt-6 rounded border border-white/60 p-3 text-left">
            <h2 className="text-xs font-bold uppercase">About Me</h2>
            <p className="mt-1.5 text-[10px] leading-relaxed text-white/90">{about.summary}</p>
          </div>
        )}

        <div className="mt-4 rounded border border-white/60 p-3 text-left">
          <h2 className="text-xs font-bold uppercase">Contact</h2>
          <div className="mt-2 space-y-2 text-[10px] leading-relaxed">
            {personal.phone && (
              <p>
                <span className="block font-semibold">Phone</span>
                {personal.phone}
              </p>
            )}
            {personal.email && (
              <p>
                <span className="block font-semibold">Email</span>
                <span className="break-all">{personal.email}</span>
              </p>
            )}
            {personal.address && (
              <p>
                <span className="block font-semibold">Address</span>
                {personal.address}
              </p>
            )}
            {personal.linkedinUrl && (
              <p>
                <span className="block font-semibold">LinkedIn</span>
                <span className="break-all">{personal.linkedinUrl}</span>
              </p>
            )}
          </div>
        </div>
      </aside>

      <main className="flex-1 p-7">
        {skills.length > 0 && (
          <div>
            <h2 className="rounded px-3 py-1.5 text-xs font-bold uppercase text-white" style={{ backgroundColor: TEAL }}>
              Skills
            </h2>
            <ul className="mt-2 space-y-1 text-[11px]">
              {skills.map((s, i) => (
                <li key={i}>&bull; {s.name}</li>
              ))}
            </ul>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mt-5">
            <h2 className="rounded px-3 py-1.5 text-xs font-bold uppercase text-white" style={{ backgroundColor: TEAL }}>
              Work Experience
            </h2>
            <div className="mt-2 space-y-3">
              {experience.map((e, i) => (
                <div key={i} className="text-[11px]">
                  <p className="font-bold">{e.role}</p>
                  <p className="text-black/50">
                    {[e.company, formatDateRange(e.startDate, e.endDate, e.current)].filter(Boolean).join(" | ")}
                  </p>
                  {e.description && <p className="mt-1 text-black/70">&bull; {e.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="mt-5">
            <h2 className="rounded px-3 py-1.5 text-xs font-bold uppercase text-white" style={{ backgroundColor: TEAL }}>
              Education
            </h2>
            <div className="mt-2 space-y-2 text-[11px]">
              {education.map((e, i) => (
                <div key={i}>
                  <p className="font-bold">{e.degree}</p>
                  <p className="text-black/50">
                    {[e.institution, formatDateRange(e.startDate, e.endDate)].filter(Boolean).join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
