import Link from "next/link";
import type { Metadata } from "next";
import { CtaBanner } from "@/components/cta-banner";
import {
  ArrowRightIcon,
  CheckIcon,
  SearchIcon,
  ShieldIcon,
  SpeedIcon,
} from "@/components/icons";
import { SectionShell } from "@/components/section-shell";
import { buildMetadata, seoKeywords, serviceHighlights } from "@/lib/site-content";

export const metadata: Metadata = buildMetadata({
  title: "Web Developer Tallinn | Fast Websites That Stop You Losing Customers",
  description:
    "Bruno Hristoforov builds fast, persuasive websites for businesses in Tallinn and beyond. Get a free website audit before your slow site costs you more customers.",
  keywords: seoKeywords.home,
});

export default function HomePage() {
  const heroStats = [
    ["Faster trust", "Your business looks serious from the first second.", SpeedIcon],
    ["Better visibility", "More chances to be found before competitors are.", SearchIcon],
    ["Stronger conversion", "More calls, bookings, and enquiry form submissions.", ShieldIcon],
  ] as const;

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-8 lg:py-28">
        <div className="space-y-8">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[var(--color-gold)]">
            Web Developer in Tallinn, Estonia
          </p>
          <div className="space-y-6">
            <h1 className="max-w-4xl text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-7xl">
              Your website is either winning customers or quietly pushing them away.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-white/72 sm:text-lg md:text-xl">
              I build fast, modern websites that help small businesses and local service companies look trustworthy, rank better, and turn more visits into real revenue.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              prefetch
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] px-6 py-4 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 sm:px-7"
            >
              Get a Free Website Audit Before You Lose Customers
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              prefetch
              href="/portfolio"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/14 px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:border-[var(--color-gold-soft)] hover:text-[var(--color-gold)] sm:px-7"
            >
              See Website Examples
            </Link>
          </div>
          <div className="grid max-w-2xl gap-5 pt-4 sm:grid-cols-3">
            {heroStats.map(([label, copy, Icon]) => (
              <div key={label} className="rounded-[1.6rem] border border-white/10 bg-white/4 p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-gold-soft)] bg-[rgba(212,175,55,0.08)] text-[var(--color-gold)]">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mb-2 text-sm font-semibold text-[var(--color-gold-light)]">{label}</p>
                <p className="text-sm leading-7 text-white/62">{copy}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="overflow-hidden rounded-[2rem] border border-[var(--color-gold-soft)] bg-[linear-gradient(180deg,rgba(21,18,10,0.96),rgba(9,9,9,0.96)_20%,rgba(6,6,6,0.98))] shadow-[0_24px_60px_rgba(0,0,0,0.34)]">
            <div className="border-b border-[var(--color-gold-soft)] bg-[linear-gradient(135deg,rgba(212,175,55,0.14),rgba(212,175,55,0.03))] px-5 py-6 sm:px-8 sm:py-7">
              <div className="flex items-start justify-between gap-4 sm:gap-6">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-gold)]">
                    Revenue Leak Check
                  </p>
                  <h2 className="text-2xl font-semibold text-white sm:text-3xl">Free Website Audit</h2>
                  <p className="max-w-md text-sm leading-7 text-white/70 sm:text-base">
                    I&apos;ll show you exactly where your current website is losing trust, traffic, and enquiries.
                  </p>
                </div>
                <div className="gold-ring flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-gold-soft)] bg-[radial-gradient(circle,_rgba(212,175,55,0.26),_rgba(12,12,12,0.96)_70%)] sm:h-16 sm:w-16">
                  <SearchIcon className="h-6 w-6 text-[var(--color-gold-light)] sm:h-7 sm:w-7" />
                </div>
              </div>
            </div>

            <div className="space-y-5 px-5 py-6 sm:space-y-6 sm:px-8 sm:py-7">
              <div className="grid gap-3">
                {[
                  "Where your pages feel slow or weak",
                  "Where visitors lose confidence and leave",
                  "What competing local websites are doing better",
                  "What to fix first to get more calls and enquiries",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[1.2rem] border border-white/8 bg-white/4 px-4 py-4"
                  >
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[rgba(212,175,55,0.12)] text-[var(--color-gold)]">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <p className="text-sm leading-6 text-white/74 sm:leading-7">{item}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-gold)]">
                  About Bruno
                </p>
                <p className="mt-3 text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
                  I&apos;m Bruno Hristoforov, 17, based in Tallinn. I build websites that make businesses look sharper, load faster, and convert more visitors into real leads.
                </p>
              </div>

              <Link
                prefetch
                href="/contact"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] px-6 py-4 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5"
              >
                Request Your Free Audit
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SectionShell
        eyebrow="About Me"
        title="Young, relentless, and focused on business results."
        description="I work with React, TypeScript, Node.js, Next.js, and SEO, but the point is not the stack. The point is helping your business look more credible, load faster, and convert better."
      >
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/4 p-7">
            <p className="text-lg leading-8 text-white/72">
              I bring the speed, ambition, and attention to detail most businesses wish they had in their current website. Every layout, headline, and call to action is built to make visitors feel one thing: this business is worth contacting now.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["React", "TypeScript", "Node.js", "Next.js", "SEO"].map((skill) => (
              <div
                key={skill}
                className="rounded-[1.6rem] border border-[var(--color-gold-soft)] bg-[linear-gradient(145deg,rgba(212,175,55,0.08),rgba(18,18,18,0.94))] p-5 text-lg font-medium text-white transition duration-300 hover:-translate-y-1 hover:border-[var(--color-gold)]"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Services"
        title="What I fix before your website costs you more business."
        description="Each service is built around a simple reality: when your website feels slow, weak, or invisible, potential customers leave."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {serviceHighlights.map((service) => (
            <article
              key={service.title}
              className="surface-card group rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,17,17,0.96),rgba(9,9,9,0.9))] p-6 transition duration-500 hover:-translate-y-1 hover:border-[var(--color-gold-soft)] hover:shadow-[0_18px_50px_rgba(212,175,55,0.08)]"
            >
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-gold)]">
                {service.title}
              </p>
              <p className="mb-4 text-base leading-8 text-white/62">{service.problem}</p>
              <p className="text-base leading-8 text-white">
                {service.result}
              </p>
            </article>
          ))}
        </div>
      </SectionShell>

      <CtaBanner />
    </>
  );
}
