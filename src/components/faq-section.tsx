"use client";

import { SectionShell } from "@/components/section-shell";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly FaqItem[];
};

export function FaqSection({ eyebrow, title, description, items }: FaqSectionProps) {
  return (
    <SectionShell eyebrow={eyebrow} title={title} description={description}>
      <div className="grid gap-4">
        {items.map((item) => (
          <article key={item.question} className="theme-surface rounded-[1.8rem] p-6">
            <h3 className="theme-text-main text-xl font-semibold">{item.question}</h3>
            <p className="theme-text-muted mt-3 max-w-4xl text-base leading-8">{item.answer}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
