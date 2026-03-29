import type { Metadata } from "next";
import { WhyChooseMePageContent } from "@/components/pages/why-choose-me-page-content";
import { buildMetadata, getSeoKeywords } from "@/lib/site-content";

// Server-rendered page metadata for the English positioning page.
export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Why Choose Bruno",
    description:
      "Why Bruno Hristoforov is a strong fit for businesses that need a modern website, better visibility, faster load times, and reliable communication.",
    path: "/why-choose-me",
    keywords: getSeoKeywords("whyChooseMe"),
    locale: "en",
  });
}

export default function WhyChooseMePage() {
  return <WhyChooseMePageContent />;
}
