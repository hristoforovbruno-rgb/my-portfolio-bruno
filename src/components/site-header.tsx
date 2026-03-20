"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { navigation } from "@/lib/site-content";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(8,8,8,0.92)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 lg:gap-6 lg:px-8">
        <Link prefetch href="/" className="flex shrink-0 items-center">
          <Image
            src="/favicon.svg"
            alt="Bruno Hristoforov logo"
            width={96}
            height={96}
            className="h-16 w-auto object-contain sm:h-20"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/8 bg-white/4 px-3 py-2 text-sm text-white/72 lg:flex">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                prefetch
                href={item.href}
                className={`rounded-full px-4 py-2 transition-all duration-300 ${
                  isActive
                    ? "bg-[rgba(212,175,55,0.14)] text-[var(--color-gold-light)]"
                    : "hover:text-[var(--color-gold)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            prefetch
            href="/contact"
            className="hidden rounded-full border border-[var(--color-gold-soft)] bg-[linear-gradient(135deg,rgba(212,175,55,0.2),rgba(212,175,55,0.06))] px-5 py-2 text-sm font-semibold text-[var(--color-gold-light)] transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            Free Audit
          </Link>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/4 text-white transition duration-300 hover:border-[var(--color-gold-soft)] hover:text-[var(--color-gold)] lg:hidden"
          >
            {isOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-white/8 bg-[rgba(10,10,10,0.98)] transition-[max-height,opacity] duration-400 lg:hidden ${
          isOpen ? "max-h-[24rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto grid max-w-7xl gap-2 px-4 py-4 sm:px-6">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                prefetch
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-2xl px-4 py-3 text-sm font-medium transition duration-300 ${
                  isActive
                    ? "bg-[rgba(212,175,55,0.12)] text-[var(--color-gold-light)]"
                    : "bg-white/3 text-white/72 hover:bg-white/6 hover:text-[var(--color-gold)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            prefetch
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-5 py-3 text-sm font-semibold text-black"
          >
            Get Free Audit
          </Link>
        </nav>
      </div>
    </header>
  );
}
