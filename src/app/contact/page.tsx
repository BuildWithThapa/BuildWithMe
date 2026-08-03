import type { Metadata } from "next";
import { Contact } from "@/components/home/Contact";
import { Newsletter } from "@/components/home/Newsletter";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about your next project."
};

export default function ContactPage() {
  return (
    <div>
      <Contact />
      <Newsletter />
    </div>
  );
}
