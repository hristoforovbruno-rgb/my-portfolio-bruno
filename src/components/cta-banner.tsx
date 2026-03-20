import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-18 lg:px-8">
      <div className="surface-card overflow-hidden rounded-[2rem] border border-[var(--color-gold-soft)] bg-[linear-gradient(135deg,rgba(212,175,55,0.18),rgba(17,17,17,0.96)_44%,rgba(8,8,8,0.96))] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.45)] md:p-12">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[var(--color-gold-light)]">Urgency</p>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Every week you delay, more buyers leave your website and pay someone else.
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-white/72">
              Get a free website audit and see exactly where your current site looks slow, weak, or invisible.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <Link
              prefetch
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] px-6 py-3 text-sm font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              Get a Free Website Audit Before You Lose Customers
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <p className="text-sm text-white/55">Reply time: usually within 24 hours.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
