import type { Metadata } from "next";
import { PricingPageContent } from "@/components/pages/pricing-page-content";
import { buildMetadata, getSeoKeywords } from "@/lib/site-content";

// Server-rendered page metadata for the Estonian pricing page.
export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Veebilehe hinnad Eestis",
    description:
      "Veebilehe hinnad Tallinna ja Eesti ettevõtetele, kes tahavad kiiremat, usaldusväärsemat ja tulemuslikumat veebilehte.",
    path: "/et/pricing",
    keywords: getSeoKeywords("pricing"),
    locale: "et",
  });
}

export default function EstonianPricingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Kas kogu projekti eest tuleb kohe maksta?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ei. Projektid jagatakse tavaliselt etappideks.",
        },
      },
      {
        "@type": "Question",
        name: "Kas saan alustada väiksema veebiga ja hiljem laiendada?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Jah. Kiire käivitus ja hilisem laiendus on sageli kõige mõistlikum.",
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
