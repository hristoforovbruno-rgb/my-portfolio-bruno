import type { Metadata } from "next";
import { CtaBanner } from "@/components/cta-banner";
import { SectionShell } from "@/components/section-shell";
import { buildMetadata, processSteps, seoKeywords } from "@/lib/site-content";

export const metadata: Metadata = buildMetadata({
  title: "Website Process | Discovery, Design, Development, Launch",
  description:
    "A simple four-step website process that keeps projects clear, fast-moving, and focused on business results from day one to launch.",
  path: "/process",
  keywords: seoKeywords.process,
});

export default function ProcessPage() {
  return (
    <>
      <SectionShell
        eyebrow="Process"
        title="A clear 4-step process that keeps momentum high and confusion low."
        description="You do not need a messy project. You need a simple path from weak website to stronger business asset."
      >
        <div className="relative grid gap-6 lg:grid-cols-4">
          <div className="absolute left-6 right-6 top-8 hidden h-px bg-[linear-gradient(90deg,rgba(212,175,55,0.05),rgba(212,175,55,0.8),rgba(212,175,55,0.05))] lg:block" />
          {processSteps.map((step, index) => (
            <article
              key={step.title}
              className="relative rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,17,17,0.96),rgba(8,8,8,0.92))] p-7"
            >
              <div className="mb-5 flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-gold-soft)] bg-[rgba(212,175,55,0.12)] text-base font-semibold text-[var(--color-gold-light)]">
                  0{index + 1}
                </span>
                <h2 className="text-2xl font-semibold text-white">{step.title}</h2>
              </div>
              <p className="text-base leading-8 text-white/68">{step.description}</p>
            </article>
          ))}
        </div>
      </SectionShell>
      <CtaBanner />
    </>
  );
}
