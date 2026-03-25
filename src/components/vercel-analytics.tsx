"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getConsentSnapshot, subscribeToConsent } from "@/lib/cookie-consent";
import { useSyncExternalStore } from "react";

export function VercelAnalytics() {
  const consent = useSyncExternalStore(subscribeToConsent, getConsentSnapshot, () => null);

  if (consent !== "accepted") {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
