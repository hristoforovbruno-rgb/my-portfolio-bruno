"use client";

import { CtaBanner } from "@/components/cta-banner";
import { SectionShell } from "@/components/section-shell";
import { useLanguage } from "@/lib/language";
import { getSiteContent } from "@/lib/site-content";
import { uiCopy } from "@/lib/ui-copy";

export function ProcessPageContent() {
  const { locale } = useLanguage();
  const content = getSiteContent(locale);
  const copy = uiCopy[locale].processPage;

  return (
    <>
      <SectionShell eyebrow={copy.eyebrow} title={copy.title} description={copy.description}>
        <div className="relative grid gap-6 lg:grid-cols-4">
          <div className="absolute left-6 right-6 top-8 hidden h-px bg-[linear-gradient(90deg,rgba(212,175,55,0.05),rgba(212,175,55,0.8),rgba(212,175,55,0.05))] lg:block" />
          {content.processSteps.map((step, index) => {
            const stepLabel = String(index + 1).padStart(2, "0");

            return (
            <article key={step.title} className="theme-surface relative rounded-[1.9rem] p-7">
              <div className="mb-5 flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-gold-soft)] bg-[var(--accent-surface-strong)] text-base font-semibold tabular-nums text-[var(--color-gold-light)]">
                  {stepLabel}
                </span>
                <h2 className="theme-text-main text-2xl font-semibold">{step.title}</h2>
              </div>
              <p className="theme-text-muted text-base leading-8">{step.description}</p>
            </article>
          )})}
        </div>
      </SectionShell>
      <CtaBanner />
    </>
  );
}
