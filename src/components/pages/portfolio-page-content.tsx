"use client";

import Link from "next/link";
import { CtaBanner } from "@/components/cta-banner";
import { ArrowRightIcon } from "@/components/icons";
import { SectionShell } from "@/components/section-shell";
import { localizePath } from "@/lib/locale-routing";
import { useLanguage } from "@/lib/language";
import { getSiteContent } from "@/lib/site-content";
import { uiCopy } from "@/lib/ui-copy";

export function PortfolioPageContent() {
  const { locale } = useLanguage();
  const content = getSiteContent(locale);
  const copy = uiCopy[locale].portfolioPage;

  return (
    <>
      <SectionShell eyebrow={copy.eyebrow} title={copy.title} description={copy.description}>
        <div className="grid gap-6">
          {content.projects.map((project) => (
            <article key={project.name} className="theme-surface surface-card interactive-card overflow-hidden rounded-[2rem] hover:border-[var(--color-gold-soft)]">
              <div className="grid gap-6 p-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[var(--color-gold)]">{project.business}</p>
                  <h2 className="theme-text-main mt-3 text-3xl font-semibold sm:text-4xl">{project.name}</h2>
                </div>
                <div>
                  <p className="theme-text-faint mb-2 text-sm font-semibold uppercase tracking-[0.3em]">{copy.problemLabel}</p>
                  <p className="theme-text-muted text-base leading-8">{project.problem}</p>
                </div>
                <div>
                  <p className="theme-text-faint mb-2 text-sm font-semibold uppercase tracking-[0.3em]">{copy.buildLabel}</p>
                  <p className="theme-text-muted text-base leading-8">{project.build}</p>
                </div>
                <div>
                  <p className="theme-text-faint mb-3 text-sm font-semibold uppercase tracking-[0.3em]">{copy.resultsLabel}</p>
                  <div className="flex flex-wrap gap-3">
                    {project.results.map((result) => (
                      <span key={result} className="rounded-full border border-[var(--color-gold-soft)] bg-[var(--accent-surface)] px-4 py-2 text-sm text-[var(--color-gold-light)]">
                        {result}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <Link href={localizePath(`/portfolio/${project.slug}`, locale)} className="interactive-button inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-gold-light)] hover:text-[var(--color-gold)]">
                    {copy.readExample}
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>
      <CtaBanner />
    </>
  );
}
