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
    <section className="mx-auto max-w-7xl px-6 py-18 lg:px-8">
      <div className="mb-10 max-w-3xl space-y-4">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[var(--color-gold)]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="theme-text-main text-4xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="theme-text-muted text-lg leading-8">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
