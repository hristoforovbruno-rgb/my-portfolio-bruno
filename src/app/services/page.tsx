import type { Metadata } from "next";
import { CtaBanner } from "@/components/cta-banner";
import { RefreshIcon, SearchIcon, ShieldIcon, SpeedIcon } from "@/components/icons";
import { SectionShell } from "@/components/section-shell";
import { buildMetadata, seoKeywords, services } from "@/lib/site-content";

export const metadata: Metadata = buildMetadata({
  title: "Web Development Services Tallinn | Fast Websites, SEO, Redesigns",
  description:
    "Website development, SEO optimization, redesigns, and maintenance plans for businesses that need faster pages, stronger trust, and better enquiries.",
  path: "/services",
  keywords: seoKeywords.services,
});

export default function ServicesPage() {
  const icons = [SpeedIcon, SearchIcon, RefreshIcon, ShieldIcon];

  return (
    <>
      <SectionShell
        eyebrow="Services"
        title="Services built to stop leaks in traffic, trust, and revenue."
        description="If your website is slow, hard to trust, or invisible in search, it is not just a design problem. It is a sales problem."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service, index) => {
            const Icon = icons[index % icons.length];

            return (
            <article
              key={service.title}
              className="surface-card group rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,18,18,0.96),rgba(7,7,7,0.94))] p-7 transition duration-500 hover:-translate-y-1 hover:border-[var(--color-gold-soft)]"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.38em] text-[var(--color-gold)]">
                    {service.keyword}
                  </p>
                  <h2 className="text-3xl font-semibold text-white">{service.title}</h2>
                </div>
                <span className="gold-ring mt-1 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--color-gold-soft)] bg-[rgba(212,175,55,0.08)] text-[var(--color-gold)]">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <div className="space-y-4 text-base leading-8">
                <p className="text-white/60">
                  <span className="font-semibold text-white">Problem:</span> {service.pain}
                </p>
                <p className="text-white/75">
                  <span className="font-semibold text-[var(--color-gold-light)]">Solution:</span> {service.solution}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {service.outcomes.map((outcome) => (
                  <span
                    key={outcome}
                    className="rounded-full border border-[var(--color-gold-soft)] bg-[rgba(212,175,55,0.08)] px-4 py-2 text-sm text-[var(--color-gold-light)]"
                  >
                    {outcome}
                  </span>
                ))}
              </div>
            </article>
            );
          })}
        </div>
      </SectionShell>
      <CtaBanner />
    </>
  );
}
