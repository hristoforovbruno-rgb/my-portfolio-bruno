import type { Metadata } from "next";
import { PrivacyPolicyPageContent } from "@/components/pages/privacy-policy-page-content";
import { buildMetadata } from "@/lib/site-content";

export const metadata: Metadata = buildMetadata({
  title: "Privaatsuspoliitika | Bruno Hristoforov",
  description: "Privaatsuspoliitika Bruno Hristoforovi veebilehele Eestis ja Euroopa Liidus.",
  path: "/et/privacy-policy",
  languages: {
    en: "/privacy-policy",
    et: "/et/privacy-policy",
  },
});

export default function EstonianPrivacyPolicyPage() {
  return <PrivacyPolicyPageContent />;
}
