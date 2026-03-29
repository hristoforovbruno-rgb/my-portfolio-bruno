import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-content";

// Server-rendered robots configuration for public crawling and sitemap discovery.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
