import type { Metadata } from "next";
import { WhyChooseMePageContent } from "@/components/pages/why-choose-me-page-content";
import { buildMetadata, getSeoKeywords } from "@/lib/site-content";

export const metadata: Metadata = buildMetadata({
  title: "Why Choose Bruno | Tallinn Web Developer | Veebiarendaja Eestis",
  description:
    "Why Bruno Hristoforov is a strong fit for Tallinn and Estonia businesses that need a modern website, better visibility, faster load times, and reliable communication. Veebiarendaja Eestis kohalikele ettevotetele.",
  path: "/why-choose-me",
  keywords: getSeoKeywords("whyChooseMe"),
});

export default function WhyChooseMePage() {
  return <WhyChooseMePageContent />;
}
