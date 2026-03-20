import Image from "next/image";
import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { contact, navigation } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.2fr_0.7fr_1fr] lg:px-8">
        <div className="space-y-4">
          <Image src="/favicon.svg" alt="Bruno Hristoforov logo" width={64} height={64} className="h-14 w-auto object-contain sm:h-16" />
          <h2 className="max-w-xl text-2xl font-semibold text-white">
            Fast, persuasive websites for businesses that cannot afford to look slow, outdated, or invisible.
          </h2>
          <p className="max-w-lg text-sm leading-7 text-white/58">
            Built for small businesses and local service companies that need a sharper first impression, better visibility, and a clearer path to enquiries.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">Pages</p>
          <div className="flex flex-col gap-2 text-sm text-white/72">
            {navigation.map((item) => (
              <Link key={item.href} prefetch href={item.href} className="transition-colors duration-300 hover:text-[var(--color-gold)]">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-3 text-sm text-white/72">
          <p className="font-semibold uppercase tracking-[0.3em] text-white/50">Contact</p>
          <a href={`mailto:${contact.email}`} className="flex items-center gap-3 transition-colors duration-300 hover:text-[var(--color-gold)]">
            <MailIcon className="h-4 w-4 text-[var(--color-gold)]" />
            {contact.email}
          </a>
          <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="flex items-center gap-3 transition-colors duration-300 hover:text-[var(--color-gold)]">
            <PhoneIcon className="h-4 w-4 text-[var(--color-gold)]" />
            {contact.phone}
          </a>
          <p className="flex items-center gap-3">
            <MapPinIcon className="h-4 w-4 text-[var(--color-gold)]" />
            {contact.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
