"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteLogo } from "@/components/site-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { localizePath, stripLocalePrefix } from "@/lib/locale-routing";
import { useLanguage } from "@/lib/language";
import { getSiteContent } from "@/lib/site-content";

export function SiteHeader() {
  const pathname = usePathname();
  const menuId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useLanguage();
  const content = getSiteContent(locale);
  const currentPath = stripLocalePrefix(pathname);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-panel)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:gap-6 lg:px-8">
        <Link prefetch href={localizePath("/", locale)} className="flex shrink-0 items-center">
          <SiteLogo className="h-16 w-auto object-contain sm:h-20" priority />
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-control-bg)] px-3 py-2 text-sm theme-text-muted lg:flex">
          {content.navigation.map((item) => {
            const isActive = currentPath === item.href;

            return (
              <Link
                key={item.href}
                prefetch
                href={localizePath(item.href, locale)}
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
          <LanguageSwitcher />
          <ThemeToggle />
          <Link
            prefetch
            href={localizePath("/contact", locale)}
            className="interactive-button hidden rounded-full border border-[var(--color-gold-soft)] bg-[linear-gradient(135deg,rgba(212,175,55,0.2),rgba(212,175,55,0.06))] px-5 py-2 text-sm font-semibold text-[var(--color-gold-light)] sm:inline-flex"
          >
            {content.ui.freeAudit}
          </Link>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-label={isOpen ? content.ui.closeNavigation : content.ui.openNavigation}
            onClick={() => setIsOpen((current) => !current)}
            className="interactive-button inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-control-bg)] theme-text-main hover:border-[var(--color-gold-soft)] hover:text-[var(--color-gold)] lg:hidden"
          >
            <span className="relative h-5 w-5">
              <MenuIcon
                className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                  isOpen ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
                }`}
              />
              <CloseIcon
                className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                  isOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`mobile-nav-backdrop fixed inset-x-0 bottom-0 top-[73px] z-40 transition-opacity duration-300 sm:top-[89px] lg:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
        onClick={() => setIsOpen(false)}
      />

      <div
        id={menuId}
        className={`fixed inset-x-4 top-[84px] z-50 overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel-2)] shadow-[0_24px_80px_rgba(0,0,0,0.28)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:inset-x-6 sm:top-[100px] lg:hidden ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <nav className="mx-auto grid max-h-[calc(100vh-7rem)] gap-2 overflow-y-auto px-4 py-4 sm:px-6">
          {content.navigation.map((item, index) => {
            const isActive = currentPath === item.href;

            return (
              <Link
                key={item.href}
                prefetch
                href={localizePath(item.href, locale)}
                onClick={() => setIsOpen(false)}
                className={`rounded-2xl px-4 py-3.5 text-base font-medium transition duration-300 ${
                  isActive
                    ? "bg-[rgba(212,175,55,0.12)] text-[var(--color-gold-light)]"
                    : "bg-[var(--color-control-bg)] theme-text-muted hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-gold)]"
                } ${isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                style={{ transitionDelay: isOpen ? `${70 + index * 40}ms` : "0ms" }}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            prefetch
            href={localizePath("/contact", locale)}
            onClick={() => setIsOpen(false)}
            className={`mt-2 inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-5 py-3.5 text-sm font-semibold text-black transition-all duration-400 ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
            style={{ transitionDelay: isOpen ? `${70 + content.navigation.length * 40}ms` : "0ms" }}
          >
            {content.ui.getFreeAudit}
          </Link>
        </nav>
      </div>
    </header>
  );
}
