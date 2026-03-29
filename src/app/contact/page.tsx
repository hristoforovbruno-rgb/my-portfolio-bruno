import type { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/contact-page-content";
import { getSeoOverride } from "@/lib/admin-cms-server";
import { buildMetadata, getSeoKeywords, getSiteContent, siteUrl } from "@/lib/site-content";

// Server-rendered page metadata for the English contact route.
export async function generateMetadata(): Promise<Metadata> {
  const override = await getSeoOverride("/contact");

  return buildMetadata({
    title: override?.title || "Contact",
    description:
      override?.description ||
      "Get in touch with Bruno Hristoforov — freelance web developer in Tallinn, Estonia. Let's build your next website.",
    path: override?.canonicalPath || "/contact",
    keywords: override?.keywords || getSeoKeywords("contact"),
    locale: "en",
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
