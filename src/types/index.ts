export type Role = "admin" | "user";

export interface UserProfile {
  id: string;
  full_name: string | null;
  phone: string | null;
  website: string | null;
  address: string | null;
  avatar_url: string | null;
  social_links: Record<string, string>;
  bio: string | null;
  career_objective: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category_id: string | null;
  short_description: string | null;
  description: string | null;
  tech_stack: string[];
  github_url: string | null;
  live_url: string | null;
  cover_image_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  is_published: boolean;
  display_order: number;
}

export interface Package {
  id: string;
  service_id: string;
  name: "Basic" | "Basic Plus" | "Premium" | string;
  description: string | null;
  features: string[];
  price: number | null;
  currency: string;
  image_url: string | null;
  cta_label: string;
  is_published: boolean;
  display_order: number;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_role: string | null;
  client_company: string | null;
  client_avatar_url: string | null;
  content: string;
  rating: number;
  is_published: boolean;
  display_order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category_id: string | null;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  tags: string[];
  is_published: boolean;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
}

export type CvSectionType =
  | "personal_info"
  | "about"
  | "education"
  | "experience"
  | "projects"
  | "skills"
  | "languages"
  | "certifications"
  | "references";

export interface CvTemplate {
  id: string;
  name: "Modern" | "Professional" | "Creative" | "Minimal" | "ATS Friendly" | string;
  slug: string;
  preview_image_url: string | null;
  is_ats_friendly: boolean;
  is_active: boolean;
}

export interface Cv {
  id: string;
  user_id: string;
  template_id: string | null;
  title: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface CvSection {
  id: string;
  cv_id: string;
  section_type: CvSectionType;
  display_order: number;
  data: Record<string, unknown>;
}

export interface ContactMessageInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
}
