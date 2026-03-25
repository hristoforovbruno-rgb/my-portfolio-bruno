"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { SectionShell } from "@/components/section-shell";
import { getExpandedContent } from "@/lib/expanded-content";
import { localizePath } from "@/lib/locale-routing";
import { useLanguage } from "@/lib/language";
import { usePublicCms } from "@/lib/public-cms";

export function InsightsPageContent() {
  const { locale } = useLanguage();
  const content = getExpandedContent(locale);
  const cms = usePublicCms();
  const copy = content.insightsLanding;
  const posts = cms?.posts.length ? cms.posts : content.insightPosts;

  return (
    <SectionShell eyebrow={copy.eyebrow} title={copy.title} description={copy.description}>
      <div className="grid gap-6 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="theme-surface interactive-card rounded-[2rem] p-7 hover:border-[var(--color-gold-soft)]">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-gold)]">{post.category}</p>
            <h2 className="theme-text-main mt-4 text-2xl font-semibold leading-tight">{post.title}</h2>
            <p className="theme-text-faint mt-3 text-sm">
              {post.publishedAt} · {post.readingTime}
            </p>
            <p className="theme-text-muted mt-4 text-base leading-8">{post.excerpt}</p>
            <Link
              href={localizePath(`/insights/${post.slug}`, locale)}
              className="interactive-button mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-gold-light)] hover:text-[var(--color-gold)]"
            >
              {copy.readMore}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
