"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { localizePath } from "@/lib/locale-routing";
import { useLanguage } from "@/lib/language";
import { usePublicCms } from "@/lib/public-cms";
import { getSiteContent } from "@/lib/site-content";

export function CtaBanner() {
  const { locale } = useLanguage();
  const content = getSiteContent(locale);
  const cms = usePublicCms();
  const localizedContent = cms?.content?.[locale];

  return (
    <section className="mx-auto max-w-7xl px-6 py-18 lg:px-8">
      <div className="theme-highlight-surface surface-card overflow-hidden rounded-[2rem] p-8 md:p-12">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[var(--color-gold-light)]">{localizedContent?.ctaEyebrow || content.ui.ctaEyebrow}</p>
            <h2 className="theme-text-main text-3xl font-semibold md:text-4xl">
              {localizedContent?.ctaTitle || content.ui.ctaTitle}
            </h2>
            <p className="theme-text-muted max-w-2xl text-lg leading-8">
              {localizedContent?.ctaDescription || content.ui.ctaDescription}
            </p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <Link
              prefetch
              href={localizePath("/contact", locale)}
              className="interactive-button inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] px-6 py-3 text-sm font-semibold text-black"
            >
              {localizedContent?.ctaButton || content.ui.ctaButton}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <p className="theme-text-soft text-sm">{content.ui.ctaReplyTime}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
