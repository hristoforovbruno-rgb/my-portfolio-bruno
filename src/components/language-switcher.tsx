"use client";

import { useLanguage } from "@/lib/language";
import { getSiteContent } from "@/lib/site-content";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const content = getSiteContent(locale);

  return (
    <div
      aria-label={content.ui.languageSwitcherLabel}
      className="pointer-events-auto inline-flex items-center gap-0.5 rounded-full border border-[var(--color-border)] bg-[var(--color-control-bg)] p-[3px]"
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={`cursor-pointer rounded-full px-2 py-1 text-[10px] font-semibold leading-none transition ${
          locale === "en"
            ? "bg-[rgba(212,175,55,0.14)] text-[var(--color-gold-light)]"
            : "theme-text-muted hover:bg-[rgba(212,175,55,0.08)] hover:text-[var(--color-gold)]"
        }`}
      >
        {content.ui.languageEnglish}
      </button>
      <button
        type="button"
        onClick={() => setLocale("et")}
        aria-pressed={locale === "et"}
        className={`cursor-pointer rounded-full px-2 py-1 text-[10px] font-semibold leading-none transition ${
          locale === "et"
            ? "bg-[rgba(212,175,55,0.14)] text-[var(--color-gold-light)]"
            : "theme-text-muted hover:bg-[rgba(212,175,55,0.08)] hover:text-[var(--color-gold)]"
        }`}
      >
        {content.ui.languageEstonian}
      </button>
    </div>
  );
}
