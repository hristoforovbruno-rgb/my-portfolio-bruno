"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { localizePath } from "@/lib/locale-routing";
import { useLanguage } from "@/lib/language";
import {
  getBannerVisibilitySnapshot,
  setConsent,
  subscribeToConsent,
  type ConsentState,
} from "@/lib/cookie-consent";
import { uiCopy } from "@/lib/ui-copy";

export function CookieBanner() {
  const { locale } = useLanguage();
  const copy = uiCopy[locale].cookieBanner;
  const [isClosing, setIsClosing] = useState(false);
  const dismissTimerRef = useRef<number | null>(null);
  const ready = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const shouldShowBanner = useSyncExternalStore(
    subscribeToConsent,
    getBannerVisibilitySnapshot,
    () => true,
  );

  useEffect(() => {
    return () => {
      if (dismissTimerRef.current !== null) {
        window.clearTimeout(dismissTimerRef.current);
      }
    };
  }, []);

  const handleConsent = (value: ConsentState) => {
    if (isClosing) {
      return;
    }

    setIsClosing(true);
    dismissTimerRef.current = window.setTimeout(() => {
      setConsent(value);
      setIsClosing(false);
      dismissTimerRef.current = null;
    }, 260);
  };

  if (!ready || (!isClosing && !shouldShowBanner)) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6">
      <div
        className={`cookie-banner theme-highlight-surface pointer-events-auto mx-auto flex max-w-4xl flex-col gap-4 rounded-[1.75rem] p-5 backdrop-blur-md sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:p-6 ${
          isClosing ? "cookie-banner-closing" : "cookie-banner-open"
        }`}
      >
        <div
          className={`cookie-banner-copy max-w-2xl space-y-2 ${
            isClosing ? "cookie-banner-copy-closing" : "cookie-banner-copy-open"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-gold)]">
            {copy.eyebrow}
          </p>
          <h2 className="theme-text-main text-xl font-semibold">{copy.title}</h2>
          <p className="theme-text-muted text-sm leading-7">
            {copy.description}{" "}
            <Link href={localizePath("/privacy-policy", locale)} className="text-[var(--color-gold-light)] transition hover:text-[var(--color-gold)]">
              {copy.learnMore}
            </Link>
          </p>
        </div>
        <div
          className={`cookie-banner-actions flex flex-col gap-3 sm:min-w-[240px] ${
            isClosing ? "cookie-banner-actions-closing" : "cookie-banner-actions-open"
          }`}
        >
          <button
            type="button"
            onClick={() => handleConsent("accepted")}
            disabled={isClosing}
            className="interactive-button inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-5 py-3 text-sm font-semibold text-black disabled:cursor-wait disabled:opacity-80"
          >
            {copy.accept}
          </button>
          <button
            type="button"
            onClick={() => handleConsent("essential")}
            disabled={isClosing}
            className="theme-ghost interactive-button inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold hover:border-[var(--color-gold-soft)] hover:text-[var(--color-gold-light)] disabled:cursor-wait disabled:opacity-80"
          >
            {copy.essentialOnly}
          </button>
        </div>
      </div>
    </div>
  );
}
