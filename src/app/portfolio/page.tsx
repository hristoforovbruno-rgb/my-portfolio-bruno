import Link from "next/link";
import type { Metadata } from "next";
import { CtaBanner } from "@/components/cta-banner";
import { ArrowRightIcon } from "@/components/icons";
import { SectionShell } from "@/components/section-shell";
import { buildMetadata, projects, seoKeywords } from "@/lib/site-content";

export const metadata: Metadata = buildMetadata({
  title: "Examples | Website Examples for Restaurants, Clinics, Gyms, Local Services",
  description:
    "See written website examples for restaurants, clinics, gyms, and local services, with clear notes on structure, messaging, and business purpose.",
  path: "/portfolio",
  keywords: seoKeywords.portfolio,
});

export default function PortfolioPage() {
  return (
    <>
      <SectionShell
        eyebrow="Examples"
        title="Written website examples that explain the direction clearly."
        description="These are text-only examples showing how each business type could be structured, positioned, and improved. No fake screenshots and no fake case study claims."
      >
        <div className="grid gap-6">
          {projects.map((project) => (
            <article
              key={project.name}
              className="surface-card overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,16,16,0.95),rgba(8,8,8,0.92))] transition duration-500 hover:border-[var(--color-gold-soft)]"
            >
              <div className="grid gap-6 p-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[var(--color-gold)]">
                    {project.business}
                  </p>
                  <h2 className="mt-3 text-4xl font-semibold text-white">{project.name}</h2>
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-white/45">Problem</p>
                  <p className="text-base leading-8 text-white/68">{project.problem}</p>
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-white/45">How It Would Be Done</p>
                  <p className="text-base leading-8 text-white/78">{project.build}</p>
                </div>
                <div>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-white/45">Key Focus Points</p>
                  <div className="flex flex-wrap gap-3">
                    {project.results.map((result) => (
                      <span
                        key={result}
                        className="rounded-full border border-[var(--color-gold-soft)] bg-[rgba(212,175,55,0.08)] px-4 py-2 text-sm text-[var(--color-gold-light)]"
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-gold-light)] transition-colors duration-300 hover:text-[var(--color-gold)]"
                  >
                    Read Full Text Example
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>
      <CtaBanner />
    </>
  );
}
