import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/pages/services-page-content";
import { getSeoOverride } from "@/lib/admin-cms-server";
import { buildMetadata, getSeoKeywords } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const override = await getSeoOverride("/services");
  return buildMetadata({
    title: override?.title || "Web Development Services Tallinn | Veebiarendus ja SEO Eestis",
    description:
      override?.description ||
      "Website development, SEO optimization, redesigns, and maintenance plans for businesses in Tallinn and Estonia that need faster pages, stronger trust, and better enquiries. Veebiarendus, SEO ja hooldus Eestis.",
    path: override?.canonicalPath || "/services",
    keywords: override?.keywords || getSeoKeywords("services"),
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
