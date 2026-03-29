import type { Metadata } from "next";
import { HomePageContent } from "@/components/pages/home-page-content";
import { getSeoOverride } from "@/lib/admin-cms-server";
import { buildMetadata, getSeoKeywords } from "@/lib/site-content";

// Server-rendered page metadata for the English homepage.
export async function generateMetadata(): Promise<Metadata> {
  const override = await getSeoOverride("/");

  return buildMetadata({
    title: override?.title || "Freelance Web Developer in Tallinn, Estonia",
    description:
      override?.description ||
      "Bruno Hristoforov builds fast, modern websites for businesses in Estonia and worldwide. Based in Tallinn.",
    path: override?.canonicalPath || "/",
    keywords: override?.keywords || getSeoKeywords("home"),
    locale: "en",
  });
}

export default function HomePage() {
  return <HomePageContent />;
}
