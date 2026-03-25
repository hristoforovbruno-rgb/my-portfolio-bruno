"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { SectionShell } from "@/components/section-shell";
import { getExpandedContent, type InsightSlug } from "@/lib/expanded-content";
import { localizePath } from "@/lib/locale-routing";
import { useLanguage } from "@/lib/language";
import { usePublicCms } from "@/lib/public-cms";

export function InsightPostPageContent({ slug }: { slug: InsightSlug }) {
  const { locale } = useLanguage();
  const content = getExpandedContent(locale);
  const cms = usePublicCms();
  const post = cms?.posts.find((item) => item.slug === slug) || content.insightPosts.find((item) => item.slug === slug);

  if (!post) {
    return null;
  }

  return (
    <SectionShell eyebrow={post.category} title={post.title} description={post.description}>
      <div className="theme-surface rounded-[2rem] p-8">
        <p className="theme-text-faint text-sm">
          {post.publishedAt} · {post.readingTime}
        </p>
        <div className="mt-6 space-y-8">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="theme-text-main text-2xl font-semibold">{section.heading}</h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="theme-text-muted text-base leading-8">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
        <Link
          href={localizePath("/insights", locale)}
          className="interactive-button mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-gold-light)] hover:text-[var(--color-gold)]"
        >
          <ArrowRightIcon className="h-4 w-4 rotate-180" />
          {locale === "en" ? "Back to insights" : "Tagasi nõuannete juurde"}
        </Link>
      </div>
    </SectionShell>
  );
}
