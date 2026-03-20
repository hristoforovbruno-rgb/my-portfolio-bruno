import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRightIcon } from "@/components/icons";
import { buildMetadata, examplePages } from "@/lib/site-content";
import styles from "./example-page.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const example = examplePages.find((entry) => entry.slug === slug);

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
  });
}

export function generateStaticParams() {
  return examplePages.map((entry) => ({ slug: entry.slug }));
}

export default async function ExampleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const example = examplePages.find((entry) => entry.slug === slug);

  if (!example) {
    notFound();
  }

  return (
    <div className={`${styles.page} ${styles[example.theme]}`}>
      <div className={styles.shell}>
        <Link href="/portfolio" className={styles.back}>
          <ArrowRightIcon className="h-4 w-4 rotate-180" />
          Back to examples
        </Link>

        <section className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>{example.category}</p>
            <h1 className={styles.heading}>{example.title}</h1>
          </div>
          <p className={styles.lede}>{example.description}</p>
          <div className={styles.actions}>
            <span className={styles.primaryButton}>{example.primaryCta}</span>
            <span className={styles.secondaryButton}>{example.secondaryCta}</span>
          </div>
          <div className={styles.stats}>
            {example.stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.preview}>
          <div className={styles.textOnly}>
            <div className={styles.sidebar}>
              {example.sections.map((section) => (
                <div key={section.title} className={styles.panel}>
                  <h3 className={styles.panelTitle}>{section.title}</h3>
                  <p className={styles.panelText}>{section.text}</p>
                </div>
              ))}

              <div className={styles.panel}>
                <h3 className={styles.panelTitle}>What this text example includes</h3>
                <ul className={styles.featureList}>
                  {example.features.map((feature) => (
                    <li key={feature} className={styles.featureItem}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
