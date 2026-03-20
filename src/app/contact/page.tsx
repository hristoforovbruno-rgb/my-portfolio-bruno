import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { SectionShell } from "@/components/section-shell";
import { buildMetadata, contact, seoKeywords, siteUrl } from "@/lib/site-content";

export const metadata: Metadata = buildMetadata({
  title: "Contact Bruno Hristoforov | Stop Losing Customers Today",
  description:
    "Contact Bruno Hristoforov for a free website audit and a fast plan to improve trust, speed, SEO, and customer conversion.",
  path: "/contact",
  keywords: seoKeywords.contact,
});

export default function ContactPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bruno Hristoforov",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tallinn",
      addressCountry: "Estonia",
    },
    email: contact.email,
    telephone: contact.phone,
    jobTitle: "Freelance Web Developer",
    url: `${siteUrl}/contact`,
  };

  return (
    <SectionShell
      eyebrow="Contact"
      title="Stop losing customers. Fix the website problem now."
      description="Tell me what your current website is failing to do, and I will show you how to turn it into a stronger sales tool."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="surface-card rounded-[2rem] border border-[var(--color-gold-soft)] bg-[linear-gradient(180deg,rgba(212,175,55,0.1),rgba(8,8,8,0.95)_30%)] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[var(--color-gold)]">Direct Contact</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Free website audit</h2>
          <div className="mt-6 grid gap-4 text-base leading-8 text-white/70">
            <p className="flex items-center gap-3">
              <MailIcon className="h-5 w-5 text-[var(--color-gold)]" />
              {contact.email}
            </p>
            <p className="flex items-center gap-3">
              <PhoneIcon className="h-5 w-5 text-[var(--color-gold)]" />
              {contact.phone}
            </p>
            <p className="flex items-center gap-3">
              <MapPinIcon className="h-5 w-5 text-[var(--color-gold)]" />
              {contact.location}
            </p>
            <p>
              Best for: small businesses, restaurants, gyms, clinics, and local service companies that want a website that sells harder.
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </SectionShell>
  );
}
