import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/pages/services-page-content";
import { buildMetadata, getSeoKeywords } from "@/lib/site-content";

// Server-rendered page metadata for the Estonian services route.
export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Teenused",
    description:
      "Bruno Hristoforovi veebiarenduse teenused: koduleht, maandumisleht ja veebilahendused ettevõtetele Tallinnas, Eestis ja väljaspool Eestit.",
    path: "/et/services",
    keywords: getSeoKeywords("services"),
    locale: "et",
  });
}

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
