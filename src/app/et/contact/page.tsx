import type { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/contact-page-content";
import { buildMetadata, getSeoKeywords, getSiteContent, siteUrl } from "@/lib/site-content";

// Server-rendered page metadata for the Estonian contact route.
export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Kontakt",
    description:
      "Võta ühendust Bruno Hristoforoviga — vabakutseline veebiarendaja Tallinnas. Loome sinu järgmise kodulehe Eestis või rahvusvaheliselt.",
    path: "/et/contact",
    keywords: getSeoKeywords("contact"),
    locale: "et",
  });
}

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
