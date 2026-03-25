import type { Metadata } from "next";
import { PricingPageContent } from "@/components/pages/pricing-page-content";
import { getSeoOverride } from "@/lib/admin-cms-server";
import { buildMetadata, getSeoKeywords } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const override = await getSeoOverride("/pricing");
  return buildMetadata({
    title: override?.title || "Website Pricing Estonia | Veebilehe Hinnad Eestis",
    description:
      override?.description ||
      "Website pricing for Tallinn and Estonia small businesses that need a faster, more persuasive online presence without losing more revenue to outdated pages. Veebilehe hinnad Eestis kohalikele ettevotetele.",
    path: override?.canonicalPath || "/pricing",
    keywords: override?.keywords || getSeoKeywords("pricing"),
  });
}

export default function PricingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do I need to pay the full project fee upfront?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Projects are usually split into staged payments.",
        },
      },
      {
        "@type": "Question",
        name: "Can I start with a smaller website and expand later?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. A lean launch plus later expansion is often the best option.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PricingPageContent />
    </>
  );
}
