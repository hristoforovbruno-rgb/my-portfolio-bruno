import type { Metadata } from "next";
import { ServiceDetailPageContent } from "@/components/pages/service-detail-page-content";
import { getExpandedContent, serviceDetails, type ServiceSlug } from "@/lib/expanded-content";
import { buildMetadata } from "@/lib/site-content";

export function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getExpandedContent("et").serviceDetails.find((entry) => entry.slug === slug);

  if (!service) {
    return {};
  }

  return buildMetadata({
    title: `${service.title} | Tallinn ja Eesti`,
    description: service.summary,
    path: `/et/services/${service.slug}`,
    keywords: service.keywords,
    languages: {
      en: `/services/${service.slug}`,
      et: `/et/services/${service.slug}`,
    },
  });
}

export default async function EstonianServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getExpandedContent("et").serviceDetails.find((entry) => entry.slug === slug);

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
