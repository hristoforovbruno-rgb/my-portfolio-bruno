import type { Metadata } from "next";
import { ServiceDetailPageContent } from "@/components/pages/service-detail-page-content";
import { getExpandedContent, serviceDetails, type ServiceSlug } from "@/lib/expanded-content";
import { getSeoOverride } from "@/lib/admin-cms-server";
import { buildMetadata } from "@/lib/site-content";

export function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }));
}

// Server-rendered page metadata for each English service detail route.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceDetails.find((entry) => entry.slug === slug);
  const localizedService = getExpandedContent("et").serviceDetails.find((entry) => entry.slug === slug);
  const override = await getSeoOverride(`/services/${slug}`);

  if (!service) {
    return {};
  }

  return buildMetadata({
    title: override?.title || `${service.title} Tallinn Estonia | ${localizedService?.title || "Veebiteenus Eestis"}`,
    description: override?.description || service.summary,
    path: override?.canonicalPath || `/services/${service.slug}`,
    keywords: override?.keywords || [...new Set([...(service.keywords || []), ...(localizedService?.keywords || [])])],
    locale: "en",
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceDetails.find((entry) => entry.slug === slug);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service?.title || slug,
    provider: {
      "@type": "Person",
      name: "Bruno Hristoforov",
    },
    areaServed: "Estonia",
    description: service?.summary || slug,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <ServiceDetailPageContent slug={slug as ServiceSlug} />
    </>
  );
}
