import type { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/contact-page-content";
import { getSiteContent, siteUrl, buildMetadata, getSeoKeywords } from "@/lib/site-content";

export const metadata: Metadata = buildMetadata({
  title: "Kontakt | Veebiarendaja Tallinn | Bruno Hristoforov",
  description:
    "Võta ühendust Bruno Hristoforoviga ja küsi tasuta veebiauditit. Veebiarendaja Tallinn ettevõtetele, kes vajavad rohkem usaldust, SEO-d ja päringuid.",
  path: "/et/contact",
  keywords: getSeoKeywords("contact"),
  languages: {
    en: "/contact",
    et: "/et/contact",
  },
});

export default function EstonianContactPage() {
  const { contact } = getSiteContent("et");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bruno Hristoforov",
    description: "Veebiarendaja Tallinnas, kes ehitab kiireid äriveebe Eesti ettevõtetele.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tallinn",
      addressCountry: "Estonia",
    },
    email: contact.email,
    telephone: contact.phone,
    jobTitle: "Veebiarendaja",
    knowsAbout: ["Veebiarendus", "Äriveebid", "Kohalik SEO", "Veebilehe ümberdisain"],
    areaServed: [
      { "@type": "Country", name: "Estonia" },
      { "@type": "City", name: "Tallinn" },
    ],
    url: `${siteUrl}/et/contact`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ContactPageContent />
    </>
  );
}
