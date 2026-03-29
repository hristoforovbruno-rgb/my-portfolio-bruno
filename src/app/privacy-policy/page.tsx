import type { Metadata } from "next";
import { PrivacyPolicyPageContent } from "@/components/pages/privacy-policy-page-content";
import { buildMetadata } from "@/lib/site-content";

// Server-rendered page metadata for the English privacy policy.
export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Privacy Policy",
    description:
      "Privacy policy for Bruno Hristoforov's website, including how contact details, cookies, and browser storage are handled for visitors in Estonia and the EU.",
    path: "/privacy-policy",
    locale: "en",
  });
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyPageContent />;
}
