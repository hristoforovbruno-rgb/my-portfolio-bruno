import type { Metadata } from "next";
import { PortfolioPageContent } from "@/components/pages/portfolio-page-content";
import { buildMetadata, getSeoKeywords } from "@/lib/site-content";

export const metadata: Metadata = buildMetadata({
  title: "Website Examples Estonia | Veebilehe Näited Eestis",
  description:
    "See website examples for restaurants, clinics, gyms, and local service businesses in Estonia, with clear notes on structure, messaging, and lead generation goals. Veebilehe naited Eestis.",
  path: "/portfolio",
  keywords: getSeoKeywords("portfolio"),
});

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
