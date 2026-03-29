import type { Metadata } from "next";
import { InsightsPageContent } from "@/components/pages/insights-page-content";
import { getExpandedContent } from "@/lib/expanded-content";
import { buildMetadata, getSeoKeywords, siteUrl } from "@/lib/site-content";

// Server-rendered page metadata for the Estonian insights index.
export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Veebi nõuanded Eestis",
    description:
      "Lühikesed praktilised artiklid Eesti väikeettevõtetele veebiarenduse, SEO, hinnastamise ja konversiooni kohta.",
    path: "/et/insights",
    keywords: getSeoKeywords("insights"),
    locale: "et",
  });
}

export default function EstonianInsightsPage() {
  const posts = getExpandedContent("et").insightPosts;
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${siteUrl}/et/insights/${post.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <InsightsPageContent />
    </>
  );
}
