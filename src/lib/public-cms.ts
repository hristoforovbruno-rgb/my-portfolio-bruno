"use client";

import { useEffect, useState } from "react";
import { getApiBaseUrl } from "@/lib/api-base-url";
import type { CmsPublicData } from "@/lib/admin-api";

const API_BASE_URL = getApiBaseUrl();

export function usePublicCms() {
  const [data, setData] = useState<CmsPublicData | null>(null);

  useEffect(() => {
    let mounted = true;

    void fetch(`${API_BASE_URL}/api/cms/public`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to load CMS data");
        }

        return response.json() as Promise<CmsPublicData>;
      })
      .then((result) => {
        if (mounted) {
          setData(result);
        }
      })
      .catch(() => {
        if (mounted) {
          setData(null);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return data;
}
