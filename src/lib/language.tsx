"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { type Locale } from "@/lib/site-content";
import { getLocaleFromPathname, localizePath } from "@/lib/locale-routing";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const STORAGE_KEY = "portfolio-locale";

const LanguageContext = createContext<LanguageContextValue | null>(null);

function setStoredLocale(locale: Locale) {
  window.localStorage.setItem(STORAGE_KEY, locale);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocaleFromPathname(pathname);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale: (nextLocale) => {
        setStoredLocale(nextLocale);
        router.push(localizePath(pathname || "/", nextLocale));
      },
    }),
    [locale, pathname, router],
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    setStoredLocale(locale);
  }, [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
