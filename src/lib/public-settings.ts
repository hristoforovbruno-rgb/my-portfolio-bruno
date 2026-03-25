"use client";

import { useEffect, useState } from "react";
import { getApiBaseUrl } from "@/lib/api-base-url";

type PublicSettings = {
  publicEmail: string;
  contactPageText: {
    en: string;
    et: string;
  };
  starterPrice: string;
  advancedPrice: string;
  maintenancePrice: string;
};

const API_BASE_URL = getApiBaseUrl();

export function usePublicSettings() {
  const [settings, setSettings] = useState<PublicSettings | null>(null);

  useEffect(() => {
    let mounted = true;

    void fetch(`${API_BASE_URL}/api/settings/public`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to load public settings");
        }

        return response.json() as Promise<PublicSettings>;
      })
      .then((result) => {
        if (mounted) {
          setSettings(result);
        }
      })
      .catch(() => {
        if (mounted) {
          setSettings(null);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return settings;
}
