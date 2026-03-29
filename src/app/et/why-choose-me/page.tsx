import type { Metadata } from "next";
import { WhyChooseMePageContent } from "@/components/pages/why-choose-me-page-content";
import { buildMetadata, getSeoKeywords } from "@/lib/site-content";

// Server-rendered page metadata for the Estonian positioning page.
export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Miks valida Bruno",
    description:
      "Miks Bruno Hristoforov on tugev valik Eesti ettevõtetele, kes vajavad kaasaegset veebilehte, paremat nähtavust ja usaldusväärset koostööd.",
    path: "/et/why-choose-me",
    keywords: getSeoKeywords("whyChooseMe"),
    locale: "et",
  });
}

export default function EstonianWhyChooseMePage() {
  return <WhyChooseMePageContent />;
}
