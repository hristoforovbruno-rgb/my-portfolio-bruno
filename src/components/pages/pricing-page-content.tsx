"use client";

import { useEffect, useState } from "react";
import { CtaBanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/faq-section";
import { SectionShell } from "@/components/section-shell";
import { apiRequest, type AdminSettings } from "@/lib/admin-api";
import { getExpandedContent } from "@/lib/expanded-content";
import { useLanguage } from "@/lib/language";
import { getSiteContent } from "@/lib/site-content";
import { uiCopy } from "@/lib/ui-copy";

export function PricingPageContent() {
  const { locale } = useLanguage();
  const content = getSiteContent(locale);
  const expandedContent = getExpandedContent(locale);
  const copy = uiCopy[locale].pricingPage;
  const pricingGuide = expandedContent.pricingGuide;
  const maintenancePlansSection = expandedContent.maintenancePlansSection;
  const [pricingOverrides, setPricingOverrides] = useState<Pick<
    AdminSettings,
    "starterPrice" | "advancedPrice" | "maintenancePrice"
  > | null>(null);

  useEffect(() => {
    let mounted = true;

    void apiRequest<AdminSettings>("/api/settings/public")
      .then((result) => {
        if (mounted) {
          setPricingOverrides({
            starterPrice: result.starterPrice,
            advancedPrice: result.advancedPrice,
            maintenancePrice: result.maintenancePrice,
          });
        }
      })
      .catch(() => {
        if (mounted) {
          setPricingOverrides(null);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const pricingPlans = content.pricingPlans.map((plan, index) => {
    if (!pricingOverrides) {
      return plan;
    }

    const overridePrice =
      index === 0
        ? pricingOverrides.starterPrice
        : index === 1
          ? pricingOverrides.advancedPrice
          : pricingOverrides.maintenancePrice;

    return {
      ...plan,
      price: overridePrice || plan.price,
    };
  });

  return (
    <>
      <SectionShell eyebrow={copy.eyebrow} title={copy.title} description={copy.description}>
        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <article
              key={plan.name}
              className={`interactive-card rounded-[2rem] p-7 ${index === 1 ? "theme-highlight-surface" : "theme-surface"}`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[var(--color-gold)]">{plan.name}</p>
              <p className="theme-text-main mt-4 text-4xl font-semibold">{plan.price}</p>
              <p className="theme-text-muted mt-4 text-base leading-8">{plan.description}</p>
              <div className="mt-6 grid gap-3">
                {plan.points.map((point) => (
                  <div key={point} className="theme-surface-strong theme-text-muted rounded-full px-4 py-3 text-sm">
                    {point}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow={pricingGuide.kicker} title={pricingGuide.title} description={pricingGuide.description}>
        <div className="grid gap-6 lg:grid-cols-2">
          {pricingGuide.factors.map((factor) => (
            <article key={factor.title} className="theme-surface interactive-card rounded-[1.9rem] p-7">
              <h3 className="theme-text-main text-2xl font-semibold">{factor.title}</h3>
              <p className="theme-text-muted mt-4 text-base leading-8">{factor.body}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow={maintenancePlansSection.kicker}
        title={maintenancePlansSection.title}
        description={maintenancePlansSection.description}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {maintenancePlansSection.plans.map((plan, index) => (
            <article
              key={plan.name}
              className={`interactive-card rounded-[2rem] p-7 ${index === 1 ? "theme-highlight-surface" : "theme-surface"}`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[var(--color-gold)]">{plan.name}</p>
              <p className="theme-text-main mt-4 text-4xl font-semibold">{plan.price}</p>
              <p className="theme-text-muted mt-4 text-base leading-8">{plan.description}</p>
              <div className="mt-6 grid gap-3">
                {plan.points.map((point) => (
                  <div key={point} className="theme-surface-strong theme-text-muted rounded-full px-4 py-3 text-sm">
                    {point}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow={locale === "en" ? "Comparison" : "Võrdlus"}
        title={pricingGuide.comparisonTitle}
        description={
          locale === "en"
            ? "Use this to compare the package, fit, timeline, and focus side by side."
            : "Kasuta seda, et võrrelda paketti, sobivust, ajakava ja põhifookust kõrvuti."
        }
      >
        <div className="grid gap-6 xl:grid-cols-3">
          {pricingGuide.comparisonRows.map((row, index) => (
            <article
              key={row[0]}
              className={`interactive-card rounded-[2rem] p-7 ${index === 1 ? "theme-highlight-surface" : "theme-surface"}`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-gold)]">
                    {pricingGuide.comparisonColumns[0]}
                  </p>
                  <h3 className="theme-text-main mt-3 text-2xl font-semibold">{row[0]}</h3>
                </div>
                <span className="rounded-full border border-[var(--color-gold-soft)] bg-[var(--accent-surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-gold-light)]">
                  {row[2]}
                </span>
              </div>

              <div className="mt-6 grid gap-4">
                <div className="theme-surface-strong rounded-[1.4rem] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-gold)]">
                    {pricingGuide.comparisonColumns[1]}
                  </p>
                  <p className="theme-text-muted mt-2 text-sm leading-7">{row[1]}</p>
                </div>

                <div className="theme-surface-soft rounded-[1.4rem] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-gold)]">
                    {pricingGuide.comparisonColumns[3]}
                  </p>
                  <p className="theme-text-muted mt-2 text-sm leading-7">{row[3]}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>

      <FaqSection
        eyebrow={locale === "en" ? "FAQ" : "KKK"}
        title={locale === "en" ? "Pricing questions that usually come up first" : "Hinnaküsimused, mis tekivad kõige sagedamini"}
        description={
          locale === "en"
            ? "This is where most uncertainty disappears before the project starts."
            : "Siin kaob enamik ebakindlust enne projekti algust."
        }
        items={expandedContent.pricingFaq}
      />

      <CtaBanner />
    </>
  );
}
