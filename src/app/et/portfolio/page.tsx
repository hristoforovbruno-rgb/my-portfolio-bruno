import type { Metadata } from "next";
import { PortfolioPageContent } from "@/components/pages/portfolio-page-content";
import { buildMetadata, getSeoKeywords } from "@/lib/site-content";

export const metadata: Metadata = buildMetadata({
  title: "Veebilehe Näited Eestis | Restoran, Kliinik, Jõusaal ja Teenus",
  description:
    "Vaata veebilehe näiteid Eesti ettevõtetele: restoran, kliinik, jõusaal ja kohalik teenus. Struktuur, sõnum ja konversiooni eesmärgid selgelt lahti.",
  path: "/et/portfolio",
  keywords: getSeoKeywords("portfolio"),
  languages: {
    en: "/portfolio",
    et: "/et/portfolio",
  },
});

export default function EstonianPortfolioPage() {
  return <PortfolioPageContent />;
}
