import type { Metadata } from "next";
import { InsightsPageContent } from "@/components/pages/insights-page-content";
import { getExpandedContent } from "@/lib/expanded-content";
import { buildMetadata, getSeoKeywords, siteUrl } from "@/lib/site-content";

export const metadata: Metadata = buildMetadata({
  title: "Veebi Nõuanded Eestis | SEO, Hinnad ja Konversioon",
  description:
    "Lühikesed praktilised artiklid Eesti väikeettevõtetele veebiarenduse, SEO, hinnastamise ja konversiooni kohta.",
  path: "/et/insights",
  keywords: getSeoKeywords("insights"),
  languages: {
    en: "/insights",
    et: "/et/insights",
  },
});

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
