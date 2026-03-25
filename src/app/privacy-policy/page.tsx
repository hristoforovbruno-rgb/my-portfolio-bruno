import type { Metadata } from "next";
import { PrivacyPolicyPageContent } from "@/components/pages/privacy-policy-page-content";
import { buildMetadata } from "@/lib/site-content";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Website Services in Estonia",
  description:
    "Privacy policy for Bruno Hristoforov's website, including how contact details, cookies, and browser storage are handled for visitors in Estonia and the EU.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyPageContent />;
}
