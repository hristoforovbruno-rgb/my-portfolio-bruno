"use client";

import { CtaBanner } from "@/components/cta-banner";
import { SectionShell } from "@/components/section-shell";
import { useLanguage } from "@/lib/language";
import { getSiteContent } from "@/lib/site-content";
import { uiCopy } from "@/lib/ui-copy";

export function WhyChooseMePageContent() {
  const { locale } = useLanguage();
  const content = getSiteContent(locale);
  const copy = uiCopy[locale].whyChooseMePage;

  return (
    <>
      <SectionShell eyebrow={copy.eyebrow} title={copy.title} description={copy.description}>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="grid gap-4">
            {content.differentiators.map((item) => (
              <div key={item} className="theme-surface interactive-card rounded-[1.7rem] p-6 hover:border-[var(--color-gold-soft)]">
                <p className="theme-text-muted text-lg leading-8">{item}</p>
              </div>
            ))}
          </div>
          <div className="theme-highlight-surface rounded-[2rem] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[var(--color-gold)]">{copy.resultsFocus}</p>
            <h2 className="theme-text-main mt-4 text-3xl font-semibold">{copy.resultsTitle}</h2>
            <p className="theme-text-muted mt-5 text-lg leading-8">{copy.resultsBody}</p>
          </div>
        </div>
      </SectionShell>

      <SectionShell eyebrow={copy.testimonialsEyebrow} title={copy.testimonialsTitle} description={copy.testimonialsDescription}>
        <div className="grid gap-6 lg:grid-cols-3">
          {content.testimonials.map((testimonial) => (
            <blockquote key={testimonial.author} className="theme-surface-soft interactive-card rounded-[1.9rem] p-7 hover:border-[var(--color-gold-soft)]">
              <p className="theme-text-muted text-lg leading-8">&ldquo;{testimonial.quote}&rdquo;</p>
              <footer className="mt-6">
                <p className="font-semibold text-[var(--color-gold-light)]">{testimonial.author}</p>
                <p className="theme-text-faint text-sm">{testimonial.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </SectionShell>
      <CtaBanner />
    </>
  );
}
