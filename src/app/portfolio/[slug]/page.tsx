import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExampleDetailContent } from "@/components/pages/example-detail-content";
import { buildMetadata, getSiteContent } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const example = getSiteContent("en").examplePages.find((entry) => entry.slug === slug);

  if (!example) {
    return buildMetadata({
      title: "Example Not Found",
      description: "The requested example page could not be found.",
      path: `/portfolio/${slug}`,
    });
  }

  return buildMetadata({
    title: example.title,
    description: example.description,
    path: `/portfolio/${example.slug}`,
    keywords: [
      example.category,
      example.title,
      "website example Estonia",
      "veebilehe naide Eestis",
      "Tallinn web design example",
    ],
  });
}

export function generateStaticParams() {
  return getSiteContent("en").examplePages.map((entry) => ({ slug: entry.slug }));
}

export default async function ExampleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const example = getSiteContent("en").examplePages.find((entry) => entry.slug === slug);

  if (!example) {
    notFound();
  }

  return <ExampleDetailContent slug={slug} />;
}
