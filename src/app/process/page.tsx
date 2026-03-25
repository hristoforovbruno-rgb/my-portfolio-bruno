import type { Metadata } from "next";
import { ProcessPageContent } from "@/components/pages/process-page-content";
import { buildMetadata, getSeoKeywords } from "@/lib/site-content";

export const metadata: Metadata = buildMetadata({
  title: "Website Process Estonia | Veebiprotsess Eestis",
  description:
    "A clear four-step website process for Tallinn and Estonia businesses that keeps projects fast-moving and focused on real business results from day one to launch. Veebiprotsess Eesti ettevotetele.",
  path: "/process",
  keywords: getSeoKeywords("process"),
});

export default function ProcessPage() {
  return <ProcessPageContent />;
}
