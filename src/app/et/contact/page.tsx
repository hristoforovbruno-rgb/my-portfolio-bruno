import type { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/contact-page-content";
import { buildContactSchema, buildMetadata, getSeoKeywords } from "@/lib/site-content";

// Server-rendered page metadata for the Estonian contact route.
export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Kontakt Bruno Hristoforoviga",
    description:
      "Võta ühendust Bruno Hristoforoviga, vabakutselise veebiarendajaga Tallinnas, et luua kiire ja usaldusväärne äriveeb.",
    path: "/et/contact",
    keywords: getSeoKeywords("contact"),
    locale: "et",
  });
}

export default function EstonianContactPage() {
  const structuredData = buildContactSchema("et");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ContactPageContent />
    </>
  );
}
