"use client";

import Link from "next/link";
import { CtaBanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/faq-section";
import { RefreshIcon, SearchIcon, ShieldIcon, SpeedIcon } from "@/components/icons";
import { SectionShell } from "@/components/section-shell";
import { getExpandedContent } from "@/lib/expanded-content";
import { localizePath } from "@/lib/locale-routing";
import { useLanguage } from "@/lib/language";
import { usePublicCms } from "@/lib/public-cms";
import { getSiteContent } from "@/lib/site-content";
import { uiCopy } from "@/lib/ui-copy";

export function ServicesPageContent() {
  const { locale } = useLanguage();
  const content = getSiteContent(locale);
  const expandedContent = getExpandedContent(locale);
  const cms = usePublicCms();
  const copy = uiCopy[locale].servicesPage;
  const icons = [SpeedIcon, SearchIcon, RefreshIcon, ShieldIcon];
  const services = cms?.servicePages.length
    ? cms.servicePages.map((service) => ({
        title: service.title,
        keyword: service.keyword,
        pain: service.pain,
        solution: service.solution,
        outcomes: service.outcomes,
        slug: service.slug,
      }))
    : content.services.map((service, index) => ({
        ...service,
        slug: expandedContent.serviceDetails[index]?.slug ?? "",
      }));

  return (
    <>
      <SectionShell eyebrow={copy.eyebrow} title={copy.title} description={copy.description}>
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service, index) => {
            const Icon = icons[index % icons.length];

            return (
              <article
                key={service.title}
                className="theme-surface surface-card interactive-card group rounded-[2rem] p-7 hover:border-[var(--color-gold-soft)]"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.38em] text-[var(--color-gold)]">{service.keyword}</p>
                    <h2 className="theme-text-main text-3xl font-semibold">{service.title}</h2>
                  </div>
                  <span className="gold-ring mt-1 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--accent-surface)] text-[var(--color-gold)]">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <div className="space-y-4 text-base leading-8">
                  <p className="theme-text-soft"><span className="theme-text-main font-semibold">{copy.problemLabel}</span> {service.pain}</p>
                  <p className="theme-text-muted"><span className="font-semibold text-[var(--color-gold-light)]">{copy.solutionLabel}</span> {service.solution}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {service.outcomes.map((outcome) => (
                    <span key={outcome} className="rounded-full border border-[var(--color-gold-soft)] bg-[var(--accent-surface)] px-4 py-2 text-sm text-[var(--color-gold-light)]">
                      {outcome}
                    </span>
                  ))}
                </div>
                <Link
                  href={localizePath(`/services/${service.slug}`, locale)}
                  className="interactive-button mt-6 inline-flex items-center text-sm font-semibold text-[var(--color-gold-light)] hover:text-[var(--color-gold)]"
                >
                  {locale === "en" ? "See full service page" : "Vaata teenuse täislehte"}
                </Link>
              </article>
            );
          })}
        </div>
      </SectionShell>
      <FaqSection
        eyebrow={locale === "en" ? "FAQ" : "KKK"}
        title={locale === "en" ? "Questions business owners ask before choosing a service" : "Küsimused, mida ettevõtjad enne teenuse valikut küsivad"}
        description={
          locale === "en"
            ? "The best option depends on where your site is leaking value right now."
            : "Parim valik sõltub sellest, kus sinu veeb praegu väärtust kaotab."
        }
        items={expandedContent.servicesFaq}
      />
      <CtaBanner />
    </>
  );
}
