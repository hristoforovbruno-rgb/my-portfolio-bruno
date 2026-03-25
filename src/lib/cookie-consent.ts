"use client";

export type ConsentState = "accepted" | "essential";

const COOKIE_CONSENT_KEY = "cookie-consent";
const consentListeners = new Set<() => void>();
let memoryConsent: ConsentState | null = null;
let bannerRequested = false;

function notifyConsentListeners() {
  consentListeners.forEach((listener) => listener());
}

function normalizeConsent(value: string | null): ConsentState | null {
  return value === "accepted" || value === "essential" ? value : null;
}

export function subscribeToConsent(listener: () => void) {
  consentListeners.add(listener);
  return () => consentListeners.delete(listener);
}

export function getConsentSnapshot(): ConsentState | null {
  if (typeof window === "undefined") {
    return memoryConsent;
  }

  try {
    const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    const consent = normalizeConsent(stored);
    memoryConsent = consent;
    return consent;
  } catch {
    return memoryConsent;
  }
}

export function getBannerVisibilitySnapshot(): boolean {
  return bannerRequested || getConsentSnapshot() === null;
}

export function setConsent(value: ConsentState): boolean {
  memoryConsent = value;
  bannerRequested = false;

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
    } catch {
      notifyConsentListeners();
      return false;
    }
  }

  notifyConsentListeners();
  return true;
}

export function resetConsent(): boolean {
  memoryConsent = null;
  bannerRequested = true;

  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(COOKIE_CONSENT_KEY);
    } catch {
      notifyConsentListeners();
      return false;
    }
  }

  notifyConsentListeners();
  return true;
}
