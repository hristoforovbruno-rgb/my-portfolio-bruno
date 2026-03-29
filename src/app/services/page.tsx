import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/pages/services-page-content";
import { getSeoOverride } from "@/lib/admin-cms-server";
import { buildMetadata, getSeoKeywords } from "@/lib/site-content";

// Server-rendered page metadata for the English services route.
export async function generateMetadata(): Promise<Metadata> {
  const override = await getSeoOverride("/services");

  return buildMetadata({
    title: override?.title || "Services",
    description:
      override?.description ||
      "Web development services by Bruno Hristoforov. Custom websites, landing pages, and web apps for businesses in Estonia and beyond.",
    path: override?.canonicalPath || "/services",
    keywords: override?.keywords || getSeoKeywords("services"),
    locale: "en",
  });
}

export default function ServicesPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      "Website Development",
      "SEO Optimization",
      "Website Redesign",
      "Maintenance Plans",
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
