import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/pages/services-page-content";
import { buildMetadata, getSeoKeywords } from "@/lib/site-content";

export const metadata: Metadata = buildMetadata({
  title: "Veebiarendus ja SEO Eestis | Teenused Tallinnas",
  description:
    "Veebiarendus, SEO optimeerimine, ümberdisain ja veebihooldus Tallinnas ja Eestis ettevõtetele, kes tahavad rohkem nähtavust ja päringuid.",
  path: "/et/services",
  keywords: getSeoKeywords("services"),
  languages: {
    en: "/services",
    et: "/et/services",
  },
});

export default function EstonianServicesPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      "Veebilehe arendus",
      "SEO optimeerimine",
      "Veebilehe ümberdisain",
      "Hooldusplaanid",
    ].map((name, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <ServicesPageContent />
    </>
  );
}
