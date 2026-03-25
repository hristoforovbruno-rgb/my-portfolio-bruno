import type { Metadata } from "next";
import { InsightPostPageContent } from "@/components/pages/insight-post-page-content";
import { getExpandedContent, insightPosts, type InsightSlug } from "@/lib/expanded-content";
import { getSeoOverride } from "@/lib/admin-cms-server";
import { buildMetadata } from "@/lib/site-content";

export function generateStaticParams() {
  return insightPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(async ({ slug }) => {
    const post = insightPosts.find((entry) => entry.slug === slug);
    const localizedPost = getExpandedContent("et").insightPosts.find((entry) => entry.slug === slug);
    const override = await getSeoOverride(`/insights/${slug}`);

    if (!post) {
      return {};
    }

    return buildMetadata({
      title: override?.title || `${post.title} | Insights | ${localizedPost?.title || "Nouanded Eestis"}`,
      description: override?.description || post.description,
      path: override?.canonicalPath || `/insights/${post.slug}`,
      keywords: override?.keywords || [...new Set([...(post.keywords || []), ...(localizedPost?.keywords || [])])],
    });
  });
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = insightPosts.find((entry) => entry.slug === slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post?.title || slug,
    description: post?.description || slug,
    datePublished: "2026-03-22",
    author: {
      "@type": "Person",
      name: "Bruno Hristoforov",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <InsightPostPageContent slug={slug as InsightSlug} />
    </>
  );
}
