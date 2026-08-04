"use client";

import { useState } from "react";
import { Plus, Trash2, Download, Loader2 } from "lucide-react";

interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  description: string;
}

interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
}

const inputClass =
  "w-full rounded-lg border border-ink-900/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-signal-500 dark:border-paper/20";
const labelClass = "mb-1.5 block text-xs font-medium text-ink-900/60 dark:text-paper/60";

export function QuickCvBuilder() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");

  const [experience, setExperience] = useState<ExperienceEntry[]>([
    { role: "", company: "", period: "", description: "" }
  ]);
  const [education, setEducation] = useState<EducationEntry[]>([
    { degree: "", institution: "", period: "" }
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateExperience = (i: number, key: keyof ExperienceEntry, value: string) =>
    setExperience((prev) => prev.map((e, idx) => (idx === i ? { ...e, [key]: value } : e)));
  const updateEducation = (i: number, key: keyof EducationEntry, value: string) =>
    setEducation((prev) => prev.map((e, idx) => (idx === i ? { ...e, [key]: value } : e)));

  const handleDownload = async () => {
    setError(null);
    setIsGenerating(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf")
      ]);

      const node = document.getElementById("quick-cv-preview");
      if (!node) throw new Error("Preview not found");

      const canvas = await html2canvas(node, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${(fullName || "cv").toLowerCase().replace(/\s+/g, "-")}.pdf`);
    } catch {
      setError("Could not generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const skillList = skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="rounded-2xl border border-ink-900/10 p-6 dark:border-paper/10">
          <h2 className="font-display text-lg font-semibold">Personal Information</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Full name</label>
              <input className={inputClass} value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Address</label>
              <input className={inputClass} value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-ink-900/10 p-6 dark:border-paper/10">
          <h2 className="font-display text-lg font-semibold">Summary</h2>
          <textarea
            rows={3}
            className={`${inputClass} mt-4`}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        <div className="rounded-2xl border border-ink-900/10 p-6 dark:border-paper/10">
          <h2 className="font-display text-lg font-semibold">Experience</h2>
          <div className="mt-4 space-y-4">
            {experience.map((exp, i) => (
              <div key={i} className="rounded-xl border border-ink-900/10 p-4 dark:border-paper/10">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    className={inputClass}
                    placeholder="Job title"
                    value={exp.role}
                    onChange={(e) => updateExperience(i, "role", e.target.value)}
                  />
                  <input
                    className={inputClass}
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => updateExperience(i, "company", e.target.value)}
                  />
                </div>
                <input
                  className={`${inputClass} mt-3`}
                  placeholder="Period (e.g. 2023 — Present)"
                  value={exp.period}
                  onChange={(e) => updateExperience(i, "period", e.target.value)}
                />
                <textarea
                  className={`${inputClass} mt-3`}
                  rows={2}
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => updateExperience(i, "description", e.target.value)}
                />
                {experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setExperience((prev) => prev.filter((_, idx) => idx !== i))}
                    className="mt-2 flex items-center gap-1 text-xs text-red-500"
                  >
                    <Trash2 size={12} /> Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setExperience((prev) => [...prev, { role: "", company: "", period: "", description: "" }])
              }
              className="flex items-center gap-2 rounded-lg border border-dashed border-ink-900/20 px-4 py-2 text-sm font-medium text-ink-900/70 hover:border-signal-500 hover:text-signal-500 dark:border-paper/20 dark:text-paper/70"
            >
              <Plus size={14} /> Add experience
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-ink-900/10 p-6 dark:border-paper/10">
          <h2 className="font-display text-lg font-semibold">Education</h2>
          <div className="mt-4 space-y-4">
            {education.map((edu, i) => (
              <div key={i} className="rounded-xl border border-ink-900/10 p-4 dark:border-paper/10">
                <input
                  className={inputClass}
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => updateEducation(i, "degree", e.target.value)}
                />
                <input
                  className={`${inputClass} mt-3`}
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => updateEducation(i, "institution", e.target.value)}
                />
                <input
                  className={`${inputClass} mt-3`}
                  placeholder="Period (e.g. 2017 — 2021)"
                  value={edu.period}
                  onChange={(e) => updateEducation(i, "period", e.target.value)}
                />
                {education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setEducation((prev) => prev.filter((_, idx) => idx !== i))}
                    className="mt-2 flex items-center gap-1 text-xs text-red-500"
                  >
                    <Trash2 size={12} /> Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => setEducation((prev) => [...prev, { degree: "", institution: "", period: "" }])}
              className="flex items-center gap-2 rounded-lg border border-dashed border-ink-900/20 px-4 py-2 text-sm font-medium text-ink-900/70 hover:border-signal-500 hover:text-signal-500 dark:border-paper/20 dark:text-paper/70"
            >
              <Plus size={14} /> Add education
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-ink-900/10 p-6 dark:border-paper/10">
          <h2 className="font-display text-lg font-semibold">Skills</h2>
          <input
            className={`${inputClass} mt-4`}
            placeholder="React, Next.js, TypeScript (comma-separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
      </div>

      <div>
        <div className="sticky top-24">
          <button
            type="button"
            onClick={handleDownload}
            disabled={isGenerating}
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-full bg-signal-500 px-6 py-3 text-sm font-medium text-white disabled:opacity-60"
          >
            {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            {isGenerating ? "Generating PDF..." : "Download PDF"}
          </button>
          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}

          <div className="overflow-x-auto rounded-2xl bg-ink-900/[0.03] p-4 dark:bg-paper/[0.03]">
            <div
              id="quick-cv-preview"
              className="mx-auto w-[210mm] min-h-[297mm] bg-white p-12 text-black shadow-lg"
            >
              <h1 className="text-3xl font-bold">{fullName || "Your Name"}</h1>
              <p className="mt-2 text-sm opacity-70">
                {[email, phone, address].filter(Boolean).join("  •  ")}
              </p>

              {summary && (
                <div className="mt-6">
                  <h2 className="mb-2 text-sm font-bold uppercase tracking-wide">Summary</h2>
                  <p className="text-sm leading-relaxed">{summary}</p>
                </div>
              )}

              {experience.some((e) => e.role || e.company) && (
                <div className="mt-6">
                  <h2 className="mb-2 text-sm font-bold uppercase tracking-wide">Experience</h2>
                  <div className="space-y-4">
                    {experience.map(
                      (e, i) =>
                        (e.role || e.company) && (
                          <div key={i}>
                            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                              <p className="text-sm font-semibold">
                                {e.role} {e.company && <span className="font-normal">— {e.company}</span>}
                              </p>
                              <p className="text-xs opacity-60">{e.period}</p>
                            </div>
                            {e.description && <p className="mt-1 text-sm leading-relaxed">{e.description}</p>}
                          </div>
                        )
                    )}
                  </div>
                </div>
              )}

              {education.some((e) => e.degree || e.institution) && (
                <div className="mt-6">
                  <h2 className="mb-2 text-sm font-bold uppercase tracking-wide">Education</h2>
                  <div className="space-y-3">
                    {education.map(
                      (e, i) =>
                        (e.degree || e.institution) && (
                          <div key={i}>
                            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                              <p className="text-sm font-semibold">{e.degree}</p>
                              <p className="text-xs opacity-60">{e.period}</p>
                            </div>
                            {e.institution && <p className="text-xs opacity-60">{e.institution}</p>}
                          </div>
                        )
                    )}
                  </div>
                </div>
              )}

              {skillList.length > 0 && (
                <div className="mt-6">
                  <h2 className="mb-2 text-sm font-bold uppercase tracking-wide">Skills</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {skillList.map((s, i) => (
                      <span key={i} className="rounded-full bg-black/[0.06] px-2.5 py-1 text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-ink-900/40 dark:text-paper/40">
            This stays in your browser only — nothing is saved. Download before closing the tab.
          </p>
        </div>
      </div>
    </div>
  );
}
