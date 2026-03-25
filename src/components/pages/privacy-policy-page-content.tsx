"use client";

import { SectionShell } from "@/components/section-shell";
import { getConsentSnapshot, resetConsent, subscribeToConsent } from "@/lib/cookie-consent";
import { useLanguage } from "@/lib/language";
import { uiCopy } from "@/lib/ui-copy";
import { useSyncExternalStore } from "react";

export function PrivacyPolicyPageContent() {
  const { locale } = useLanguage();
  const copy = uiCopy[locale].privacyPolicyPage;
  const consent = useSyncExternalStore(subscribeToConsent, getConsentSnapshot, () => null);

  const currentConsentLabel =
    consent === "accepted"
      ? copy.preferences.accepted
      : consent === "essential"
        ? copy.preferences.essential
        : copy.preferences.unset;

  return (
    <SectionShell eyebrow={copy.eyebrow} title={copy.title} description={copy.intro}>
      <div className="theme-highlight-surface mb-8 rounded-[1.8rem] p-6">
        <h2 className="theme-text-main text-2xl font-semibold">{copy.preferences.title}</h2>
        <p className="theme-text-muted mt-3 max-w-3xl text-base leading-8">{copy.preferences.description}</p>
        <p className="mt-4 text-sm text-[var(--color-gold-light)]">
          {copy.preferences.current}: {currentConsentLabel}
        </p>
        <button
          type="button"
          onClick={() => resetConsent()}
          className="theme-ghost interactive-button mt-5 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold hover:border-[var(--color-gold)] hover:text-[var(--color-gold-light)]"
        >
          {copy.preferences.reset}
        </button>
      </div>
      <div className="grid gap-5">
        {copy.sections.map((section) => (
          <article
            key={section.title}
            className="theme-surface rounded-[1.8rem] p-6"
          >
            <h2 className="theme-text-main text-2xl font-semibold">{section.title}</h2>
            <p className="theme-text-muted mt-3 max-w-4xl text-base leading-8">{section.body}</p>
            {"bullets" in section && section.bullets ? (
              <ul className="mt-4 grid gap-3">
                {section.bullets.map((item) => (
                  <li
                    key={item}
                    className="theme-surface-soft theme-text-muted rounded-[1.1rem] px-4 py-3 text-sm leading-7"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
      <p className="theme-text-faint mt-8 text-sm">{copy.updated}</p>
    </SectionShell>
  );
}
