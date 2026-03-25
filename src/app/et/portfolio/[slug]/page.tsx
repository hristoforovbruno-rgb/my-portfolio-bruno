import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExampleDetailContent } from "@/components/pages/example-detail-content";
import { buildMetadata, getSiteContent } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const example = getSiteContent("et").examplePages.find((entry) => entry.slug === slug);

  if (!example) {
    return buildMetadata({
      title: "Näidet ei leitud",
      description: "Soovitud näitelehte ei leitud.",
      path: `/et/portfolio/${slug}`,
      languages: {
        en: `/portfolio/${slug}`,
        et: `/et/portfolio/${slug}`,
      },
    });
  }

  return buildMetadata({
    title: example.title,
    description: example.description,
    path: `/et/portfolio/${example.slug}`,
    keywords: [
      example.category,
      example.title,
      "veebilehe naide Eestis",
      "Tallinn veebidisaini naide",
      "kohaliku ettevõtte veebileht",
    ],
    languages: {
      en: `/portfolio/${example.slug}`,
      et: `/et/portfolio/${example.slug}`,
    },
  });
}

export function generateStaticParams() {
  return getSiteContent("et").examplePages.map((entry) => ({ slug: entry.slug }));
}

export default async function EstonianExampleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const example = getSiteContent("et").examplePages.find((entry) => entry.slug === slug);

  if (!example) {
    notFound();
  }

  return <ExampleDetailContent slug={slug} />;
}
