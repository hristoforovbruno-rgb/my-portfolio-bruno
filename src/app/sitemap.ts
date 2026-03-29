import type { MetadataRoute } from "next";
import { insightPosts, serviceDetails } from "@/lib/expanded-content";
import { siteUrl } from "@/lib/site-content";

// Server-rendered sitemap for the public marketing pages and localized content routes.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: `${siteUrl}/`,
          et: `${siteUrl}/et`,
        },
      },
    },
    {
      url: `${siteUrl}/et`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${siteUrl}/`,
          et: `${siteUrl}/et`,
        },
      },
    },
    {
      url: `${siteUrl}/services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${siteUrl}/services`,
          et: `${siteUrl}/et/services`,
        },
      },
    },
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: {
        languages: {
          en: `${siteUrl}/contact`,
          et: `${siteUrl}/et/contact`,
        },
      },
    },
    {
      url: `${siteUrl}/insights`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${siteUrl}/insights`,
          et: `${siteUrl}/et/insights`,
        },
      },
    },
    {
      url: `${siteUrl}/why-choose-me`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${siteUrl}/why-choose-me`,
          et: `${siteUrl}/et/why-choose-me`,
        },
      },
    },
    {
      url: `${siteUrl}/process`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${siteUrl}/process`,
          et: `${siteUrl}/et/process`,
        },
      },
    },
    {
      url: `${siteUrl}/pricing`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${siteUrl}/pricing`,
          et: `${siteUrl}/et/pricing`,
        },
      },
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/privacy-policy`,
          et: `${siteUrl}/et/privacy-policy`,
        },
      },
    },
  ];

  const serviceRoutes = serviceDetails.flatMap((service) => [
    {
      url: `${siteUrl}/services/${service.slug}`,
      lastModified,
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
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
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
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${siteUrl}/insights/${post.slug}`,
          et: `${siteUrl}/et/insights/${post.slug}`,
        },
      },
    },
    {
      url: `${siteUrl}/et/insights/${post.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.65,
      alternates: {
        languages: {
          en: `${siteUrl}/insights/${post.slug}`,
          et: `${siteUrl}/et/insights/${post.slug}`,
        },
      },
    },
  ]);

  return [...staticRoutes, ...serviceRoutes, ...insightRoutes];
}
