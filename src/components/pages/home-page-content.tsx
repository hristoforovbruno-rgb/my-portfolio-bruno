"use client";

import Link from "next/link";
import { CtaBanner } from "@/components/cta-banner";
import { ArrowRightIcon, CheckIcon, SearchIcon, ShieldIcon, SpeedIcon } from "@/components/icons";
import { SectionShell } from "@/components/section-shell";
import { localizePath } from "@/lib/locale-routing";
import { useLanguage } from "@/lib/language";
import { usePublicCms } from "@/lib/public-cms";
import { getSiteContent } from "@/lib/site-content";
import { uiCopy } from "@/lib/ui-copy";

export function HomePageContent() {
  const { locale } = useLanguage();
  const content = getSiteContent(locale);
  const cms = usePublicCms();
  const localizedContent = cms?.content?.[locale];
  const copy = uiCopy[locale].home;
  const heroStats = [
    [copy.heroStats[0][0], copy.heroStats[0][1], SpeedIcon],
    [copy.heroStats[1][0], copy.heroStats[1][1], SearchIcon],
    [copy.heroStats[2][0], copy.heroStats[2][1], ShieldIcon],
  ] as const;

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-8 lg:py-28">
        <div className="space-y-8">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[var(--color-gold)]">{localizedContent?.homeHeroEyebrow || copy.heroEyebrow}</p>
          <div className="space-y-6">
            <h1 className="theme-text-main max-w-4xl text-4xl font-semibold leading-[0.95] tracking-tight sm:text-5xl md:text-7xl">{localizedContent?.homeHeroTitle || copy.heroTitle}</h1>
            <p className="theme-text-muted max-w-2xl text-base leading-8 sm:text-lg md:text-xl">{localizedContent?.homeHeroDescription || copy.heroDescription}</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link prefetch href={localizePath("/contact", locale)} className="interactive-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] px-6 py-4 text-sm font-semibold text-black sm:px-7">
              {localizedContent?.homePrimaryCta || copy.heroPrimaryCta}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link prefetch href={localizePath("/portfolio", locale)} className="theme-ghost interactive-button inline-flex min-h-12 items-center justify-center rounded-full px-6 py-4 text-sm font-semibold hover:border-[var(--color-gold-soft)] hover:text-[var(--color-gold)] sm:px-7">
              {localizedContent?.homeSecondaryCta || copy.heroSecondaryCta}
            </Link>
          </div>
          <div className="grid max-w-2xl gap-5 pt-4 sm:grid-cols-3">
            {heroStats.map(([label, body, Icon]) => (
              <div key={label} className="theme-surface-soft rounded-[1.6rem] p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--accent-surface)] text-[var(--color-gold)]">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mb-2 text-sm font-semibold text-[var(--color-gold-light)]">{label}</p>
                <p className="theme-text-soft text-sm leading-7">{body}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="theme-hero-panel overflow-hidden rounded-[2rem]">
            <div className="border-b border-[var(--color-gold-soft)] bg-[linear-gradient(135deg,rgba(212,175,55,0.14),rgba(212,175,55,0.03))] px-5 py-6 sm:px-8 sm:py-7">
              <div className="flex items-start justify-between gap-4 sm:gap-6">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-gold)]">{copy.auditEyebrow}</p>
                  <h2 className="theme-text-main text-2xl font-semibold sm:text-3xl">{copy.auditTitle}</h2>
                  <p className="theme-text-muted max-w-md text-sm leading-7 sm:text-base">{copy.auditDescription}</p>
                </div>
                <div className="gold-ring flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--icon-panel-bg)] sm:h-16 sm:w-16">
                  <SearchIcon className="h-6 w-6 text-[var(--color-gold-light)] sm:h-7 sm:w-7" />
                </div>
              </div>
            </div>
            <div className="space-y-5 px-5 py-6 sm:space-y-6 sm:px-8 sm:py-7">
              <div className="grid gap-3">
                {copy.auditPoints.map((item) => (
                  <div key={item} className="theme-surface-soft flex items-start gap-3 rounded-[1.2rem] px-4 py-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent-surface-strong)] text-[var(--color-gold)]">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <p className="theme-text-muted text-sm leading-6 sm:leading-7">{item}</p>
                  </div>
                ))}
              </div>
              <div className="theme-surface-strong rounded-[1.5rem] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-gold)]">{copy.aboutBruno}</p>
                <p className="theme-text-muted mt-3 text-sm leading-7 sm:text-base sm:leading-8">{copy.aboutBrunoText}</p>
              </div>
              <Link prefetch href={localizePath("/contact", locale)} className="interactive-button inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] px-6 py-4 text-sm font-semibold text-black">
                {copy.requestAudit}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SectionShell eyebrow={copy.aboutSectionEyebrow} title={copy.aboutSectionTitle} description={copy.aboutSectionDescription}>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="theme-surface-soft rounded-[2rem] p-7">
            <p className="theme-text-muted text-lg leading-8">{copy.aboutSectionBody}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["React", "TypeScript", "Node.js", "Next.js", "SEO"].map((skill) => (
              <div key={skill} className="theme-highlight-surface interactive-card theme-text-main rounded-[1.6rem] p-5 text-lg font-medium hover:border-[var(--color-gold)]">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell eyebrow={copy.servicesEyebrow} title={copy.servicesTitle} description={copy.servicesDescription}>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {content.serviceHighlights.map((service) => (
            <article key={service.title} className="theme-surface surface-card interactive-card group rounded-[1.8rem] p-6 hover:border-[var(--color-gold-soft)]">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-gold)]">{service.title}</p>
              <p className="theme-text-soft mb-4 text-base leading-8">{service.problem}</p>
              <p className="theme-text-main text-base leading-8">{service.result}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <CtaBanner />
    </>
  );
}
