import type { Metadata } from "next";
import { HomePageContent } from "@/components/pages/home-page-content";
import { getSeoOverride } from "@/lib/admin-cms-server";
import { buildMetadata, getSeoKeywords } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const override = await getSeoOverride("/");
  return buildMetadata({
    title: override?.title || "Web Developer Tallinn, Estonia | Veebiarendaja Tallinn | Bruno Hristoforov",
    description:
      override?.description ||
      "Bruno Hristoforov builds fast, persuasive websites for businesses in Tallinn and across Estonia. Veebiarendaja Tallinn for local companies that need stronger SEO, faster pages, and more enquiries.",
    path: override?.canonicalPath || "/",
    keywords: override?.keywords || getSeoKeywords("home"),
  });
}

export default function HomePage() {
  return <HomePageContent />;
}
