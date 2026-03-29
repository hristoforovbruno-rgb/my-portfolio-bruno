import type { Metadata } from "next";
import { InsightsPageContent } from "@/components/pages/insights-page-content";
import { insightPosts } from "@/lib/expanded-content";
import { getSeoOverride } from "@/lib/admin-cms-server";
import { buildMetadata, getSeoKeywords, siteUrl } from "@/lib/site-content";

// Server-rendered page metadata for the English insights index.
export async function generateMetadata(): Promise<Metadata> {
  const override = await getSeoOverride("/insights");

  return buildMetadata({
    title: override?.title || "Website Insights Estonia",
    description:
      override?.description ||
      "Short website insights for Estonia small businesses on pricing, SEO, conversion, and what makes local business websites lose leads.",
    path: override?.canonicalPath || "/insights",
    keywords: override?.keywords || getSeoKeywords("insights"),
    locale: "en",
  });
}

export default function InsightsPage() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    blogPost: insightPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${siteUrl}/insights/${post.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <InsightsPageContent />
    </>
  );
}
