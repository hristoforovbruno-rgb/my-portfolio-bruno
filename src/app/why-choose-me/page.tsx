import type { Metadata } from "next";
import { CtaBanner } from "@/components/cta-banner";
import { SectionShell } from "@/components/section-shell";
import {
  buildMetadata,
  differentiators,
  seoKeywords,
  testimonials,
} from "@/lib/site-content";

export const metadata: Metadata = buildMetadata({
  title: "Why Choose Bruno | Fast, SEO-Friendly Websites for Growth",
  description:
    "Why Bruno Hristoforov is a strong fit for businesses that need a modern website, better visibility, faster load times, and reliable communication.",
  path: "/why-choose-me",
  keywords: seoKeywords.whyChooseMe,
});

export default function WhyChooseMePage() {
  return (
    <>
      <SectionShell
        eyebrow="Why Choose Bruno"
        title="Every day your site stays slow, you are losing customers you already paid to attract."
        description="You do not need more excuses from a website. You need a sales tool that looks sharp, loads fast, and makes action feel obvious."
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="grid gap-4">
            {differentiators.map((item) => (
              <div
                key={item}
                className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,17,17,0.96),rgba(8,8,8,0.92))] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-gold-soft)]"
              >
                <p className="text-lg leading-8 text-white/76">{item}</p>
              </div>
            ))}
          </div>
          <div className="rounded-[2rem] border border-[var(--color-gold-soft)] bg-[linear-gradient(180deg,rgba(212,175,55,0.11),rgba(7,7,7,0.96)_28%)] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[var(--color-gold)]">Results Focus</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">
              The goal is not to impress other developers. The goal is to make your business easier to choose.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              I keep the language simple, the process clear, and the outcome tied to what matters: more trust, more visibility, and more enquiries.
            </p>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Testimonials"
        title="What clients notice after the rebuild goes live."
        description="Better websites change behaviour. Visitors stay longer, trust faster, and contact with less hesitation."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <blockquote
              key={testimonial.author}
              className="rounded-[1.9rem] border border-white/10 bg-white/4 p-7 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-gold-soft)]"
            >
              <p className="text-lg leading-8 text-white/78">&ldquo;{testimonial.quote}&rdquo;</p>
              <footer className="mt-6">
                <p className="font-semibold text-[var(--color-gold-light)]">{testimonial.author}</p>
                <p className="text-sm text-white/52">{testimonial.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </SectionShell>
      <CtaBanner />
    </>
  );
}
