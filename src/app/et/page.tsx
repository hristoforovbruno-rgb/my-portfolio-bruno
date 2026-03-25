import type { Metadata } from "next";
import { HomePageContent } from "@/components/pages/home-page-content";
import { buildMetadata, getSeoKeywords } from "@/lib/site-content";

export const metadata: Metadata = buildMetadata({
  title: "Veebiarendaja Tallinn | Kiired Äriveebid Eestis | Bruno Hristoforov",
  description:
    "Bruno Hristoforov ehitab kiireid ja veenvaid veebilehti Tallinnas ja üle Eesti. Veebiarendaja kohalikele ettevõtetele, kes vajavad rohkem nähtavust ja päringuid.",
  path: "/et",
  keywords: getSeoKeywords("home"),
  languages: {
    en: "/",
    et: "/et",
  },
});

export default function EstonianHomePage() {
  return <HomePageContent />;
}
