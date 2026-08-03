import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Skills } from "@/components/home/Skills";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { CvBuilderPromo } from "@/components/home/CvBuilderPromo";
import { Testimonials } from "@/components/home/Testimonials";
import { BlogPreview } from "@/components/home/BlogPreview";
import { Contact } from "@/components/home/Contact";
import { Newsletter } from "@/components/home/Newsletter";

export const metadata: Metadata = {
  title: "BuildWithThapa — Building Modern Web Experiences & Digital Solutions"
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "BuildWithThapa",
  description:
    "Full-stack web development studio offering premium web experiences, digital solutions, and a free CV builder.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://buildwiththapa.np",
  sameAs: ["https://github.com", "https://linkedin.com", "https://twitter.com"]
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <Services />
      <Skills />
      <PortfolioPreview />
      <CvBuilderPromo />
      <Testimonials />
      <BlogPreview />
      <Contact />
      <Newsletter />
    </>
  );
}
