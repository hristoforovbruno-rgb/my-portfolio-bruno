import type { ReactNode } from "react";

type SectionShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function SectionShell({
  eyebrow,
  title,
  description,
  children,
}: SectionShellProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mb-8 max-w-3xl space-y-4 sm:mb-10">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[var(--color-gold)]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-balance theme-text-main text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="theme-text-muted max-w-2xl text-base leading-8 sm:text-lg">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
