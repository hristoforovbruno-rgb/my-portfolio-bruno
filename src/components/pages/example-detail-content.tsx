"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { localizePath } from "@/lib/locale-routing";
import { useLanguage } from "@/lib/language";
import { getSiteContent } from "@/lib/site-content";
import { uiCopy } from "@/lib/ui-copy";
import styles from "@/app/portfolio/[slug]/example-page.module.css";

export function ExampleDetailContent({ slug }: { slug: string }) {
  const { locale } = useLanguage();
  const content = getSiteContent(locale);
  const copy = uiCopy[locale].exampleDetailPage;
  const example = content.examplePages.find((entry) => entry.slug === slug);

  if (!example) {
    return null;
  }

  return (
    <div className={`${styles.page} ${styles[example.theme]}`}>
      <div className={styles.shell}>
        <Link href={localizePath("/portfolio", locale)} className={styles.back}>
          <ArrowRightIcon className="h-4 w-4 rotate-180" />
          {copy.back}
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
              <div key={`${stat.value}-${stat.label}`} className={styles.stat}>
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
                <h3 className={styles.panelTitle}>{copy.includesTitle}</h3>
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
