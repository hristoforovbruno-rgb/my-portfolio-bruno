"use client";

import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { localizePath } from "@/lib/locale-routing";
import { SiteLogo } from "@/components/site-logo";
import { useLanguage } from "@/lib/language";
import { usePublicCms } from "@/lib/public-cms";
import { usePublicSettings } from "@/lib/public-settings";
import { getSiteContent } from "@/lib/site-content";

export function SiteFooter() {
  const { locale } = useLanguage();
  const content = getSiteContent(locale);
  const settings = usePublicSettings();
  const cms = usePublicCms();
  const localizedContent = cms?.content?.[locale];
  const publicEmail = settings?.publicEmail || content.contact.email;
  const copy = locale === "en"
    ? {
        legal: "Legal",
        privacy: "Privacy Policy",
      }
    : {
        legal: "Juriidiline",
        privacy: "Privaatsuspoliitika",
      };

  return (
    <footer className="border-t border-[var(--color-border)] bg-[color:var(--color-panel)]/70 backdrop-blur-sm">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.2fr_0.7fr_1fr] lg:px-8">
        <div className="space-y-4">
          <SiteLogo width={64} height={64} className="block h-14 w-auto object-contain sm:h-16" />
          <h2 className="theme-text-main max-w-xl text-2xl font-semibold">
            {localizedContent?.footerTitle || content.ui.footerTitle}
          </h2>
          <p className="theme-text-soft max-w-lg text-sm leading-7">
            {localizedContent?.footerText || content.ui.footerText}
          </p>
        </div>
        <div className="space-y-3">
          <p className="theme-text-faint text-sm font-semibold uppercase tracking-[0.3em]">{content.ui.footerPages}</p>
          <div className="theme-text-muted flex flex-col gap-2 text-sm">
            {content.navigation.map((item) => (
              <Link key={item.href} prefetch href={localizePath(item.href, locale)} className="transition-colors duration-300 hover:text-[var(--color-gold)]">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="theme-text-muted space-y-3 text-sm">
          <p className="theme-text-faint font-semibold uppercase tracking-[0.3em]">{content.ui.footerContact}</p>
          <a href={`mailto:${publicEmail}`} className="flex items-start gap-3 break-all transition-colors duration-300 hover:text-[var(--color-gold)]">
            <MailIcon className="h-4 w-4 text-[var(--color-gold)]" />
            {publicEmail}
          </a>
          <a href={`tel:${(localizedContent?.contactPhone || content.contact.phone).replace(/\s+/g, "")}`} className="flex items-start gap-3 transition-colors duration-300 hover:text-[var(--color-gold)]">
            <PhoneIcon className="h-4 w-4 text-[var(--color-gold)]" />
            {localizedContent?.contactPhone || content.contact.phone}
          </a>
          <p className="flex items-start gap-3">
            <MapPinIcon className="h-4 w-4 text-[var(--color-gold)]" />
            {localizedContent?.contactLocation || content.contact.location}
          </p>
          <div className="pt-3">
            <p className="theme-text-faint mb-2 font-semibold uppercase tracking-[0.3em]">{copy.legal}</p>
            <Link prefetch href={localizePath("/privacy-policy", locale)} className="transition-colors duration-300 hover:text-[var(--color-gold)]">
              {copy.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
