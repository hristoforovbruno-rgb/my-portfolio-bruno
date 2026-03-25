import type { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/contact-page-content";
import { getSeoOverride } from "@/lib/admin-cms-server";
import { buildMetadata, getSeoKeywords, getSiteContent, siteUrl } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const override = await getSeoOverride("/contact");
  return buildMetadata({
    title: override?.title || "Contact Web Developer Tallinn | Kontakt Veebiarendaja Tallinn",
    description:
      override?.description ||
      "Contact Bruno Hristoforov for a free website audit and a practical plan to improve trust, speed, local SEO, and customer conversion in Tallinn and across Estonia. Kontakt veebiarendaja Tallinn.",
    path: override?.canonicalPath || "/contact",
    keywords: override?.keywords || getSeoKeywords("contact"),
  });
}

export default function ContactPage() {
  const { contact } = getSiteContent("en");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bruno Hristoforov",
    description:
      "Freelance web developer in Tallinn, Estonia building fast business websites for local companies.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tallinn",
      addressCountry: "Estonia",
    },
    email: contact.email,
    telephone: contact.phone,
    jobTitle: "Freelance Web Developer",
    knowsAbout: [
      "Web development",
      "Small business websites",
      "Local SEO",
      "Website redesign",
    ],
    areaServed: [
      {
        "@type": "Country",
        name: "Estonia",
      },
      {
        "@type": "City",
        name: "Tallinn",
      },
    ],
    url: `${siteUrl}/contact`,
  };

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
