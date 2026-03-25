import type { Metadata } from "next";
import { PricingPageContent } from "@/components/pages/pricing-page-content";
import { buildMetadata, getSeoKeywords } from "@/lib/site-content";

export const metadata: Metadata = buildMetadata({
  title: "Veebilehe Hinnad Eestis | Hinnakiri ja Paketid",
  description:
    "Veebilehe hinnad Eestis ettevõtetele, kes vajavad kiiremat, veenvamat ja SEO-valmis veebiesindust. Vaata stardi-, täiustatud ja hoolduspakette.",
  path: "/et/pricing",
  keywords: getSeoKeywords("pricing"),
  languages: {
    en: "/pricing",
    et: "/et/pricing",
  },
});

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
