import type { Metadata } from "next";
import { HomePageContent } from "@/components/pages/home-page-content";
import { buildMetadata, getSeoKeywords } from "@/lib/site-content";

// Server-rendered page metadata for the Estonian homepage locale.
export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Vabakutseline veebiarendaja Tallinnas",
    description:
      "Bruno Hristoforov — vabakutseline veebiarendaja Tallinnas. Loon kaasaegseid kodulehti ettevõtetele üle Eesti ja maailmas.",
    path: "/et",
    keywords: getSeoKeywords("home"),
    locale: "et",
  });
}

export default function EstonianHomePage() {
  return <HomePageContent />;
}
