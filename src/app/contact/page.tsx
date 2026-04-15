import type { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/contact-page-content";
import { getSeoOverride } from "@/lib/admin-cms-server";
import { buildContactSchema, buildMetadata, getSeoKeywords } from "@/lib/site-content";

// Server-rendered page metadata for the English contact route.
export async function generateMetadata(): Promise<Metadata> {
  const override = await getSeoOverride("/contact");

  return buildMetadata({
    title: override?.title || "Contact Bruno Hristoforov",
    description:
      override?.description ||
      "Get in touch with Bruno Hristoforov, a freelance web developer in Tallinn, Estonia, for a fast, modern business website.",
    path: override?.canonicalPath || "/contact",
    keywords: override?.keywords || getSeoKeywords("contact"),
    locale: "en",
  });
}

export default function ContactPage() {
  const structuredData = buildContactSchema("en");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ContactPageContent />
    </>
  );
}
