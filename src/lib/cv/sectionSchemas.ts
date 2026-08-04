import type { CvSectionType } from "@/types";

export type FieldType = "text" | "textarea" | "date" | "checkbox" | "select" | "url" | "email";

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
  /** Renders full-width in the entry grid. */
  span2?: boolean;
}

export interface SectionConfig {
  type: CvSectionType;
  label: string;
  description: string;
  /** 'single' = one object (personal info, about). 'list' = repeatable entries. */
  mode: "single" | "list";
  fields: FieldConfig[];
  addLabel?: string;
  /** Field keys joined with " — " to build a list entry's display title (e.g. ["role","company"]). Plain data only — this crosses the server/client boundary and must stay serializable. */
  titleFields: string[];
}

export const SECTION_CONFIGS: Record<CvSectionType, SectionConfig> = {
  personal_info: {
    type: "personal_info",
    label: "Personal Information",
    description: "How employers reach you and see your basic details.",
    mode: "single",
    fields: [
      { key: "fullName", label: "Full name", type: "text" },
      { key: "email", label: "Email", type: "email" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "website", label: "Website", type: "url" },
      { key: "address", label: "Address", type: "text", span2: true },
      { key: "githubUrl", label: "GitHub", type: "url" },
      { key: "linkedinUrl", label: "LinkedIn", type: "url" },
      { key: "profilePhotoUrl", label: "Profile photo URL", type: "url", span2: true }
    ],
    titleFields: []
  },
  about: {
    type: "about",
    label: "About & Career Objective",
    description: "A short summary and what you're looking for next.",
    mode: "single",
    fields: [
      { key: "summary", label: "About", type: "textarea", span2: true },
      { key: "careerObjective", label: "Career objective", type: "textarea", span2: true }
    ],
    titleFields: []
  },
  education: {
    type: "education",
    label: "Education",
    description: "Schools, degrees, and fields of study.",
    mode: "list",
    addLabel: "Add education",
    fields: [
      { key: "institution", label: "Institution", type: "text" },
      { key: "degree", label: "Degree", type: "text" },
      { key: "fieldOfStudy", label: "Field of study", type: "text" },
      { key: "startDate", label: "Start date", type: "date" },
      { key: "endDate", label: "End date", type: "date" },
      { key: "description", label: "Description", type: "textarea", span2: true }
    ],
    titleFields: ["degree", "institution"]
  },
  experience: {
    type: "experience",
    label: "Experience",
    description: "Roles, responsibilities, and impact.",
    mode: "list",
    addLabel: "Add experience",
    fields: [
      { key: "role", label: "Job title", type: "text" },
      { key: "company", label: "Company", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "startDate", label: "Start date", type: "date" },
      { key: "endDate", label: "End date", type: "date" },
      { key: "current", label: "I currently work here", type: "checkbox" },
      { key: "description", label: "Description", type: "textarea", span2: true }
    ],
    titleFields: ["role", "company"]
  },
  projects: {
    type: "projects",
    label: "Projects",
    description: "Work worth highlighting, personal or professional.",
    mode: "list",
    addLabel: "Add project",
    fields: [
      { key: "name", label: "Project name", type: "text" },
      { key: "link", label: "Link", type: "url" },
      { key: "techStack", label: "Technologies (comma-separated)", type: "text", span2: true },
      { key: "description", label: "Description", type: "textarea", span2: true }
    ],
    titleFields: ["name"]
  },
  skills: {
    type: "skills",
    label: "Skills",
    description: "Technical and professional skills.",
    mode: "list",
    addLabel: "Add skill",
    fields: [
      { key: "name", label: "Skill", type: "text" },
      {
        key: "level",
        label: "Level",
        type: "select",
        options: ["Beginner", "Intermediate", "Advanced", "Expert"]
      }
    ],
    titleFields: ["name"]
  },
  languages: {
    type: "languages",
    label: "Languages",
    description: "Languages you speak and your proficiency.",
    mode: "list",
    addLabel: "Add language",
    fields: [
      { key: "name", label: "Language", type: "text" },
      {
        key: "proficiency",
        label: "Proficiency",
        type: "select",
        options: ["Basic", "Conversational", "Fluent", "Native"]
      }
    ],
    titleFields: ["name"]
  },
  certifications: {
    type: "certifications",
    label: "Certifications",
    description: "Licenses, courses, and credentials.",
    mode: "list",
    addLabel: "Add certification",
    fields: [
      { key: "name", label: "Certification name", type: "text" },
      { key: "issuer", label: "Issuing organization", type: "text" },
      { key: "date", label: "Date", type: "date" },
      { key: "credentialUrl", label: "Credential URL", type: "url", span2: true }
    ],
    titleFields: ["name"]
  },
  references: {
    type: "references",
    label: "References",
    description: "People who can vouch for your work.",
    mode: "list",
    addLabel: "Add reference",
    fields: [
      { key: "name", label: "Full name", type: "text" },
      { key: "role", label: "Job title", type: "text" },
      { key: "company", label: "Company", type: "text" },
      { key: "email", label: "Email", type: "email" },
      { key: "phone", label: "Phone", type: "text" }
    ],
    titleFields: ["name"]
  }
};

export const SECTION_ORDER: CvSectionType[] = [
  "personal_info",
  "about",
  "education",
  "experience",
  "projects",
  "skills",
  "languages",
  "certifications",
  "references"
];
