import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { LanguageProvider } from "@/lib/language";
import { ThemeProvider } from "@/lib/theme";
import { defaultOgImage, siteUrl } from "@/lib/site-content";
import { getRequestLocale } from "@/lib/server-locale";
import "./globals.css";

const siteFont = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-site-generated",
  weight: ["500", "600", "700"],
});

const fallbackFont = localFont({
  src: "../../node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf",
  display: "swap",
  variable: "--font-site-fallback",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

const themeInitScript = `
  (() => {
    try {
      const storedTheme = window.localStorage.getItem("portfolio-theme");
      const storedOverride = window.localStorage.getItem("portfolio-theme-override");
      const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
      const theme = storedOverride === "light" || storedOverride === "dark" ? storedOverride : systemTheme;
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
      if (storedTheme === "light" || storedTheme === "dark") {
        window.localStorage.removeItem("portfolio-theme");
      }
    } catch {
      document.documentElement.dataset.theme = "dark";
      document.documentElement.style.colorScheme = "dark";
    }
  })();
`;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bruno Hristoforov",
  jobTitle: "Freelance Web Developer",
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tallinn",
    addressCountry: "EE",
  },
  sameAs: ["https://github.com/hristoforovbruno-rgb"],
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Bruno Hristoforov Web Development",
  url: siteUrl,
  areaServed: ["EE", "Worldwide"],
  availableLanguage: ["English", "Estonian", "Russian"],
  priceRange: "\u00A3\u00A3",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tallinn",
    addressCountry: "EE",
  },
};

// Server-rendered root metadata for global SEO, Open Graph, verification, and hreflang defaults.
export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "Bruno Hristoforov \u2014 Web Developer",
      template: "%s | Bruno Hristoforov \u2014 Web Developer",
    },
    description:
      "Bruno Hristoforov \u2014 freelance web developer based in Tallinn, Estonia. I build fast, modern websites for businesses worldwide.",
    keywords: [
      "veebiarendus",
      "koduleht",
      "veebilahenused",
      "freelance web developer Tallinn",
      "\u0432\u0435\u0431-\u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a \u0422\u0430\u043b\u043b\u0438\u043d",
      "website design Estonia",
      "Bruno Hristoforov",
    ],
    applicationName: "Bruno Hristoforov Website",
    category: "business",
    alternates: {
      canonical: siteUrl,
      languages: {
        en: siteUrl,
        et: `${siteUrl}/et`,
        "x-default": siteUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    verification: {
      google: "REPLACE_ME",
    },
    openGraph: {
      title: "Bruno Hristoforov \u2014 Web Developer",
      description:
        "Bruno Hristoforov \u2014 freelance web developer based in Tallinn, Estonia. I build fast, modern websites for businesses worldwide.",
      url: siteUrl,
      siteName: "Bruno Hristoforov",
      locale: "en_US",
      alternateLocale: ["et_EE"],
      type: "website",
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: "Bruno Hristoforov \u2014 Web Developer",
      description:
        "Bruno Hristoforov \u2014 freelance web developer based in Tallinn, Estonia. I build fast, modern websites for businesses worldwide.",
      images: [defaultOgImage.url],
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
      apple: "/favicon.svg",
    },
    manifest: "/manifest.webmanifest",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();

  return (
    <html
      lang={locale}
      className={`${siteFont.variable} ${fallbackFont.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Server-rendered hreflang links for the English root and Estonian locale route. */}
        <link rel="alternate" hrefLang="en" href={siteUrl} />
        <link rel="alternate" hrefLang="et" href={`${siteUrl}/et`} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        {/* Server-rendered Person schema that identifies Bruno Hristoforov as the site owner. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        {/* Server-rendered ProfessionalService schema that describes the web development offering. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
        />
      </head>
      <body className="min-h-full text-[var(--color-text)]">
        <ThemeProvider>
          <LanguageProvider>
            <AppShell>{children}</AppShell>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
