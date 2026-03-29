import type { Metadata } from "next";
import { ProcessPageContent } from "@/components/pages/process-page-content";
import { buildMetadata, getSeoKeywords } from "@/lib/site-content";

// Server-rendered page metadata for the English process page.
export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Website Process Estonia",
    description:
      "A clear four-step website process for Tallinn and Estonia businesses that keeps projects focused on real business results from day one to launch.",
    path: "/process",
    keywords: getSeoKeywords("process"),
    locale: "en",
  });
}

export default function ProcessPage() {
  return <ProcessPageContent />;
}
