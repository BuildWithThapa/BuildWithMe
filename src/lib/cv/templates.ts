export interface CvTemplateDef {
  slug: string;
  name: string;
  description: string;
  isAtsFriendly: boolean;
  /** Primary accent color as a hex value — used for small UI touches (e.g. picker badges). */
  accentHex: string;
}

// Exactly 4 templates, each with its own distinct hand-built layout in
// CvPreview.tsx and TemplateThumbnail.tsx — these aren't just color
// variants of one layout, the structure differs per template.
export const CV_TEMPLATES: CvTemplateDef[] = [
  {
    slug: "navy-sidebar",
    name: "Navy Sidebar",
    description: "Dark navy sidebar with a photo, contact, skills, and languages at a glance.",
    isAtsFriendly: false,
    accentHex: "#1B2436"
  },
  {
    slug: "sunburst",
    name: "Sunburst",
    description: "Bold black-and-amber layout with skill bars and a photo-led sidebar.",
    isAtsFriendly: false,
    accentHex: "#F0A93A"
  },
  {
    slug: "bold-contrast",
    name: "Bold Contrast",
    description: "Striking navy-and-amber two-tone design with oversized name typography.",
    isAtsFriendly: false,
    accentHex: "#F5B942"
  },
  {
    slug: "teal-professional",
    name: "Teal Professional",
    description: "Clean teal sidebar with bordered contact and about sections.",
    isAtsFriendly: false,
    accentHex: "#2FB6C4"
  }
];

const DEFAULT_TEMPLATE = CV_TEMPLATES[0]!;

export function getTemplateBySlug(slug: string): CvTemplateDef {
  return CV_TEMPLATES.find((t) => t.slug === slug) ?? DEFAULT_TEMPLATE;
}
