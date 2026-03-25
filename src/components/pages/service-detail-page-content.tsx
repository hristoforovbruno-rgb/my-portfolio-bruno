"use client";

import Link from "next/link";
import { CtaBanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/faq-section";
import { ArrowRightIcon } from "@/components/icons";
import { SectionShell } from "@/components/section-shell";
import { getExpandedContent, type ServiceSlug } from "@/lib/expanded-content";
import { localizePath } from "@/lib/locale-routing";
import { useLanguage } from "@/lib/language";
import { usePublicCms } from "@/lib/public-cms";

export function ServiceDetailPageContent({ slug }: { slug: ServiceSlug }) {
  const { locale } = useLanguage();
  const content = getExpandedContent(locale);
  const cms = usePublicCms();
  const service = cms?.servicePages.find((item) => item.slug === slug) || content.serviceDetails.find((item) => item.slug === slug);

  if (!service) {
    return null;
  }

  return (
    <>
      <SectionShell eyebrow={service.eyebrow} title={service.title} description={service.summary}>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="theme-surface rounded-[2rem] p-8">
            <p className="theme-text-muted text-lg leading-8">{service.intro}</p>
            <div className="mt-6 rounded-[1.6rem] border border-[var(--color-gold-soft)] bg-[var(--accent-surface)] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
                {locale === "en" ? "Typical fit" : "Tüüpiline sobivus"}
              </p>
              <p className="theme-text-main mt-3 text-base leading-8">{service.priceNote}</p>
            </div>
            <Link
              href={localizePath("/contact", locale)}
              className="interactive-button mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-gold-light)] hover:text-[var(--color-gold)]"
            >
              {locale === "en" ? "Request this service" : "Küsi seda teenust"}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </article>

          <article className="theme-highlight-surface rounded-[2rem] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
              {locale === "en" ? "Best for" : "Sobib kõige paremini"}
            </p>
            <div className="mt-5 grid gap-3">
              {service.bestFor.map((item) => (
                <div key={item} className="theme-surface-strong rounded-[1.2rem] px-4 py-4 theme-text-muted">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow={locale === "en" ? "Included" : "Sisaldab"}
        title={locale === "en" ? "What this service usually includes" : "Mida see teenus tavaliselt sisaldab"}
        description={
          locale === "en"
            ? "The exact mix changes by project, but these are the usual building blocks."
            : "Täpne kombinatsioon muutub projekti järgi, aga need on tüüpilised põhiosad."
        }
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="theme-surface rounded-[2rem] p-7">
            <h3 className="theme-text-main text-2xl font-semibold">
              {locale === "en" ? "Deliverables" : "Töö sisu"}
            </h3>
            <div className="mt-5 grid gap-3">
              {service.deliverables.map((item) => (
                <div key={item} className="theme-surface-soft rounded-[1.2rem] px-4 py-4 theme-text-muted">
                  {item}
                </div>
              ))}
            </div>
          </article>
          <article className="theme-surface rounded-[2rem] p-7">
            <h3 className="theme-text-main text-2xl font-semibold">
              {locale === "en" ? "Expected outcomes" : "Oodatavad tulemused"}
            </h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {service.outcomes.map((item) => (
                <span key={item} className="rounded-full border border-[var(--color-gold-soft)] bg-[var(--accent-surface)] px-4 py-3 text-sm text-[var(--color-gold-light)]">
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow={locale === "en" ? "Process" : "Protsess"}
        title={locale === "en" ? "How the work moves" : "Kuidas töö liigub"}
        description={
          locale === "en"
            ? "Simple execution, clear milestones, and no wasted movement."
            : "Lihtne teostus, selged etapid ja ilma tarbetu segaduseta."
        }
      >
        <div className="grid gap-4 lg:grid-cols-4">
          {service.process.map((step, index) => (
            <article key={step} className="theme-surface rounded-[1.8rem] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
                0{index + 1}
              </p>
              <p className="theme-text-muted mt-4 text-base leading-8">{step}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <FaqSection
        eyebrow={locale === "en" ? "FAQ" : "KKK"}
        title={locale === "en" ? "Common questions before starting" : "Levinud küsimused enne alustamist"}
        description={
          locale === "en"
            ? "Most uncertainty comes from scope and fit. These answers clear that up."
            : "Enamik ebakindlust tuleb mahust ja sobivusest. Need vastused teevad selle selgemaks."
        }
        items={content.servicesFaq}
      />

      <CtaBanner />
    </>
  );
}
