import type { MetadataRoute } from "next";
import { insightPosts, serviceDetails } from "@/lib/expanded-content";
import { getSiteContent, siteUrl } from "@/lib/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/insights",
    "/portfolio",
    "/why-choose-me",
    "/process",
    "/pricing",
    "/contact",
    "/privacy-policy",
  ];

  const staticRoutes = routes.flatMap((route) => [
    {
      url: `${siteUrl}${route || "/"}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: {
          en: `${siteUrl}${route || "/"}`,
          et: `${siteUrl}${route === "" ? "/et" : `/et${route}`}`,
        },
      },
    },
    {
      url: `${siteUrl}${route === "" ? "/et" : `/et${route}`}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 0.95 : 0.8,
      alternates: {
        languages: {
          en: `${siteUrl}${route || "/"}`,
          et: `${siteUrl}${route === "" ? "/et" : `/et${route}`}`,
        },
      },
    },
  ]);

  const serviceRoutes = serviceDetails.flatMap((service) => [
    {
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
      alternates: {
        languages: {
          en: `${siteUrl}/services/${service.slug}`,
          et: `${siteUrl}/et/services/${service.slug}`,
        },
      },
    },
    {
      url: `${siteUrl}/et/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
      alternates: {
        languages: {
          en: `${siteUrl}/services/${service.slug}`,
          et: `${siteUrl}/et/services/${service.slug}`,
        },
      },
    },
  ]);

  const insightRoutes = insightPosts.flatMap((post) => [
    {
      url: `${siteUrl}/insights/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.72,
      alternates: {
        languages: {
          en: `${siteUrl}/insights/${post.slug}`,
          et: `${siteUrl}/et/insights/${post.slug}`,
        },
      },
    },
    {
      url: `${siteUrl}/et/insights/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.72,
      alternates: {
        languages: {
          en: `${siteUrl}/insights/${post.slug}`,
          et: `${siteUrl}/et/insights/${post.slug}`,
        },
      },
    },
  ]);

  const portfolioRoutes = getSiteContent("en").examplePages.flatMap((example) => [
    {
      url: `${siteUrl}/portfolio/${example.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${siteUrl}/portfolio/${example.slug}`,
          et: `${siteUrl}/et/portfolio/${example.slug}`,
        },
      },
    },
    {
      url: `${siteUrl}/et/portfolio/${example.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${siteUrl}/portfolio/${example.slug}`,
          et: `${siteUrl}/et/portfolio/${example.slug}`,
        },
      },
    },
  ]);

  return [...staticRoutes, ...serviceRoutes, ...insightRoutes, ...portfolioRoutes];
}
