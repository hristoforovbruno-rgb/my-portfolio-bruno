import type { Metadata } from "next";
import { WhyChooseMePageContent } from "@/components/pages/why-choose-me-page-content";
import { buildMetadata, getSeoKeywords } from "@/lib/site-content";

export const metadata: Metadata = buildMetadata({
  title: "Miks Valida Bruno | Veebiarendaja Tallinn ja Eesti",
  description:
    "Miks Bruno Hristoforov on tugev valik Eesti ettevõtetele, kes vajavad kaasaegset veebilehte, paremat nähtavust ja usaldusväärset koostööd.",
  path: "/et/why-choose-me",
  keywords: getSeoKeywords("whyChooseMe"),
  languages: {
    en: "/why-choose-me",
    et: "/et/why-choose-me",
  },
});

export default function EstonianWhyChooseMePage() {
  return <WhyChooseMePageContent />;
}
