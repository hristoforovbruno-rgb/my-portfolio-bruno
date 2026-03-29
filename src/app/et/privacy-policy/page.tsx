import type { Metadata } from "next";
import { PrivacyPolicyPageContent } from "@/components/pages/privacy-policy-page-content";
import { buildMetadata } from "@/lib/site-content";

// Server-rendered page metadata for the Estonian privacy policy.
export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Privaatsuspoliitika",
    description:
      "Bruno Hristoforovi veebilehe privaatsuspoliitika, sealhulgas kuidas käsitletakse kontaktandmeid, küpsiseid ja brauseri salvestust Eestis ja Euroopa Liidus.",
    path: "/et/privacy-policy",
    locale: "et",
  });
}

export default function EstonianPrivacyPolicyPage() {
  return <PrivacyPolicyPageContent />;
}
