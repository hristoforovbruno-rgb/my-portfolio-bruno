"use client";

import { useEffect } from "react";

const METAMASK_EXTENSION_PREFIX = "chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/";

function isMetaMaskExtensionError(value: unknown) {
  if (!value) {
    return false;
  }

  const text = typeof value === "string" ? value : value instanceof Error ? `${value.name} ${value.message} ${value.stack ?? ""}` : JSON.stringify(value);

  return (
    text.includes(METAMASK_EXTENSION_PREFIX) ||
    text.includes("Failed to connect to MetaMask") ||
    text.includes("scripts/inpage.js")
  );
}

export function DevExtensionErrorFilter() {
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (isMetaMaskExtensionError(event.reason)) {
        event.preventDefault();
      }
    };

    const handleError = (event: ErrorEvent) => {
      const details = `${event.message} ${event.filename} ${event.error instanceof Error ? `${event.error.message} ${event.error.stack ?? ""}` : ""}`;

      if (isMetaMaskExtensionError(details)) {
        event.preventDefault();
      }
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
      window.removeEventListener("error", handleError);
    };
  }, []);

  return null;
}
