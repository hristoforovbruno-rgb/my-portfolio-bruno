import type { Metadata } from "next";
import { ProcessPageContent } from "@/components/pages/process-page-content";
import { buildMetadata, getSeoKeywords } from "@/lib/site-content";

export const metadata: Metadata = buildMetadata({
  title: "Veebiprotsess Eestis | Analüüs, Disain, Arendus, Launch",
  description:
    "Selge veebiprotsess Eesti ettevõtetele: analüüs, disain, arendus ja käivitamine. Fookus kiirusel, nähtavusel ja päringutel.",
  path: "/et/process",
  keywords: getSeoKeywords("process"),
  languages: {
    en: "/process",
    et: "/et/process",
  },
});

export default function EstonianProcessPage() {
  return <ProcessPageContent />;
}
