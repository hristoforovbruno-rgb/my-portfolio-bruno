import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/portfolio",
    "/why-choose-me",
    "/process",
    "/pricing",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route || "/"}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
