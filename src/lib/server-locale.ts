import { headers } from "next/headers";
import { defaultLocale, type Locale } from "@/lib/site-content";

const REQUEST_LOCALE_HEADER = "x-site-locale";

export async function getRequestLocale(): Promise<Locale> {
  const headerStore = await headers();
  const headerLocale = headerStore.get(REQUEST_LOCALE_HEADER);

  return headerLocale === "et" ? "et" : defaultLocale;
}

export { REQUEST_LOCALE_HEADER };
