"use client";

import { ContactForm } from "@/components/contact-form";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { SectionShell } from "@/components/section-shell";
import { useLanguage } from "@/lib/language";
import { usePublicCms } from "@/lib/public-cms";
import { usePublicSettings } from "@/lib/public-settings";
import { getSiteContent } from "@/lib/site-content";
import { uiCopy } from "@/lib/ui-copy";

export function ContactPageContent() {
  const { locale } = useLanguage();
  const content = getSiteContent(locale);
  const copy = uiCopy[locale].contactPage;
  const settings = usePublicSettings();
  const cms = usePublicCms();
  const publicEmail = settings?.publicEmail || content.contact.email;
  const localizedContent = cms?.content?.[locale];
  const contactPageText = settings?.contactPageText?.[locale] || copy.bestFor;

  return (
    <SectionShell eyebrow={copy.eyebrow} title={copy.title} description={copy.description}>
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="theme-highlight-surface surface-card min-w-0 rounded-[2rem] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[var(--color-gold)]">{copy.directContact}</p>
          <h2 className="text-balance theme-text-main mt-4 text-2xl font-semibold sm:text-3xl">{copy.auditTitle}</h2>
          <div className="theme-text-muted mt-6 grid gap-4 text-base leading-8">
            <a href={`mailto:${publicEmail}`} className="flex items-start gap-3 break-all hover:text-[var(--color-gold)]"><MailIcon className="mt-1 h-5 w-5 shrink-0 text-[var(--color-gold)]" />{publicEmail}</a>
            <a href={`tel:${(localizedContent?.contactPhone || content.contact.phone).replace(/\s+/g, "")}`} className="flex items-start gap-3 hover:text-[var(--color-gold)]"><PhoneIcon className="mt-1 h-5 w-5 shrink-0 text-[var(--color-gold)]" />{localizedContent?.contactPhone || content.contact.phone}</a>
            <p className="flex items-start gap-3"><MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-[var(--color-gold)]" />{localizedContent?.contactLocation || content.contact.location}</p>
            <p>{contactPageText}</p>
          </div>
        </div>
        <ContactForm />
      </div>
    </SectionShell>
  );
}
