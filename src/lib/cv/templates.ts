export interface CvTemplateDef {
  slug: string;
  name: string;
  description: string;
  isAtsFriendly: boolean;
  /** Tailwind classes applied to the preview/PDF container root for this template's look. */
  containerClass: string;
  accentClass: string;
}

export const CV_TEMPLATES: CvTemplateDef[] = [
  {
    slug: "modern",
    name: "Modern",
    description: "Clean two-tone layout with a bold name header.",
    isAtsFriendly: true,
    containerClass: "font-sans",
    accentClass: "text-signal-600"
  },
  {
    slug: "professional",
    name: "Professional",
    description: "Traditional single-column layout for corporate roles.",
    isAtsFriendly: true,
    containerClass: "font-serif",
    accentClass: "text-ink-900"
  },
  {
    slug: "creative",
    name: "Creative",
    description: "Distinct sidebar layout for design and creative roles.",
    isAtsFriendly: false,
    containerClass: "font-sans",
    accentClass: "text-signal-600"
  },
  {
    slug: "minimal",
    name: "Minimal",
    description: "Typography-first layout with generous whitespace.",
    isAtsFriendly: true,
    containerClass: "font-sans",
    accentClass: "text-ink-900"
  },
  {
    slug: "ats-friendly",
    name: "ATS Friendly",
    description: "Plain single-column format optimized for applicant tracking systems.",
    isAtsFriendly: true,
    containerClass: "font-sans",
    accentClass: "text-ink-900"
  }
];

const DEFAULT_TEMPLATE = CV_TEMPLATES[0]!;

export function getTemplateBySlug(slug: string): CvTemplateDef {
  return CV_TEMPLATES.find((t) => t.slug === slug) ?? DEFAULT_TEMPLATE;
}
