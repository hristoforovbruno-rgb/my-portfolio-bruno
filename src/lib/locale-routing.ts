import { defaultLocale, type Locale } from "@/lib/site-content";

export const localePrefixes: Record<Locale, string> = {
  en: "",
  et: "/et",
};

export function getLocaleFromPathname(pathname: string | null | undefined): Locale {
  if (!pathname) {
    return defaultLocale;
  }

  return pathname === "/et" || pathname.startsWith("/et/") ? "et" : "en";
}

export function stripLocalePrefix(pathname: string) {
  if (pathname === "/et") {
    return "/";
  }

  if (pathname.startsWith("/et/")) {
    return pathname.slice(3);
  }

  return pathname;
}

export function localizePath(pathname: string, locale: Locale) {
  const normalized = pathname === "" ? "/" : stripLocalePrefix(pathname);

  if (locale === "en") {
    return normalized;
  }

  return normalized === "/" ? "/et" : `/et${normalized}`;
}
