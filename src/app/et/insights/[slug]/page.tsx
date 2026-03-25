import type { Metadata } from "next";
import { InsightPostPageContent } from "@/components/pages/insight-post-page-content";
import { getExpandedContent, insightPosts, type InsightSlug } from "@/lib/expanded-content";
import { buildMetadata } from "@/lib/site-content";

export function generateStaticParams() {
  return insightPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getExpandedContent("et").insightPosts.find((entry) => entry.slug === slug);

  if (!post) {
    return {};
  }

  return buildMetadata({
    title: `${post.title} | Nõuanded`,
    description: post.description,
    path: `/et/insights/${post.slug}`,
    keywords: post.keywords,
    languages: {
      en: `/insights/${post.slug}`,
      et: `/et/insights/${post.slug}`,
    },
  });
}

export default async function EstonianInsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getExpandedContent("et").insightPosts.find((entry) => entry.slug === slug);

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
