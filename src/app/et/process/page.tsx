import type { Metadata } from "next";
import { ProcessPageContent } from "@/components/pages/process-page-content";
import { buildMetadata, getSeoKeywords } from "@/lib/site-content";

// Server-rendered page metadata for the Estonian process page.
export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Veebiprotsess Eestis",
    description:
      "Selge neljaastmeline veebiprotsess Tallinna ja Eesti ettevõtetele, kes tahavad kiiremat koostööd, tugevamat tulemust ja vähem segadust.",
    path: "/et/process",
    keywords: getSeoKeywords("process"),
    locale: "et",
  });
}

export default function EstonianProcessPage() {
  return <ProcessPageContent />;
}
