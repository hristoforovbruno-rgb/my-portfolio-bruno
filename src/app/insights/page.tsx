import type { Metadata } from "next";
import { InsightsPageContent } from "@/components/pages/insights-page-content";
import { insightPosts } from "@/lib/expanded-content";
import { getSeoOverride } from "@/lib/admin-cms-server";
import { buildMetadata, getSeoKeywords } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const override = await getSeoOverride("/insights");
  return buildMetadata({
    title: override?.title || "Website Insights Estonia | Veebi Nõuanded, SEO ja Hinnad",
    description:
      override?.description ||
      "Short website insights for Estonia small businesses on pricing, SEO, conversion, and what makes local business websites lose leads. Veebi nouanded Eesti vaikeettevotetele.",
    path: override?.canonicalPath || "/insights",
    keywords: override?.keywords || getSeoKeywords("insights"),
  });
}

export default function InsightsPage() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    blogPost: insightPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://brunohristoforov.dev/insights/${post.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <InsightsPageContent />
    </>
  );
}
