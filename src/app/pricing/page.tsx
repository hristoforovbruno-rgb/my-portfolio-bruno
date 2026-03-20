import type { Metadata } from "next";
import { CtaBanner } from "@/components/cta-banner";
import { SectionShell } from "@/components/section-shell";
import { buildMetadata, pricingPlans, seoKeywords } from "@/lib/site-content";

export const metadata: Metadata = buildMetadata({
  title: "Website Pricing Estonia | Starter, Advanced, Monthly Maintenance",
  description:
    "Website pricing for small businesses and local service companies that need a faster, more persuasive online presence without wasting more revenue on outdated pages.",
  path: "/pricing",
  keywords: seoKeywords.pricing,
});

export default function PricingPage() {
  return (
    <>
      <SectionShell
        eyebrow="Pricing"
        title="Cheaper than the revenue a weak website keeps costing you."
        description="The real expense is not the new website. It is the old one still driving customers away."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <article
              key={plan.name}
              className={`rounded-[2rem] border p-7 transition duration-300 hover:-translate-y-1 ${
                index === 1
                  ? "border-[var(--color-gold-soft)] bg-[linear-gradient(180deg,rgba(212,175,55,0.12),rgba(7,7,7,0.96)_22%)]"
                  : "border-white/10 bg-[linear-gradient(180deg,rgba(18,18,18,0.96),rgba(8,8,8,0.92))]"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[var(--color-gold)]">{plan.name}</p>
              <p className="mt-4 text-4xl font-semibold text-white">{plan.price}</p>
              <p className="mt-4 text-base leading-8 text-white/68">{plan.description}</p>
              <div className="mt-6 grid gap-3">
                {plan.points.map((point) => (
                  <div
                    key={point}
                    className="rounded-full border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/75"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </SectionShell>
      <CtaBanner />
    </>
  );
}
