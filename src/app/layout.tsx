import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { AppShell } from "@/components/app-shell";
import { LanguageProvider } from "@/lib/language";
import { ThemeProvider } from "@/lib/theme";
import { businessName, buildContactSchema, defaultDescription, defaultOgImage, siteName, siteUrl } from "@/lib/site-content";
import { getRequestLocale } from "@/lib/server-locale";
import "./globals.css";

const siteFont = localFont({
  src: "../../node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf",
  display: "swap",
  variable: "--font-site-generated",
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
  "@id": `${siteUrl}#person`,
  name: siteName,
  jobTitle: "Freelance Web Developer",
  url: siteUrl,
  email: "hristoforovbruno@gmail.com",
  telephone: "+372 5863 0442",
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
  "@id": `${siteUrl}#professional-service`,
  name: businessName,
  url: siteUrl,
  image: defaultOgImage.url,
  areaServed: ["EE", "Worldwide"],
  availableLanguage: ["English", "Estonian", "Russian"],
  priceRange: "\u00A3\u00A3",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tallinn",
    addressCountry: "EE",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}#website`,
  url: siteUrl,
  name: siteName,
  description: defaultDescription,
  inLanguage: ["en", "et"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6eddc" },
    { media: "(prefers-color-scheme: dark)", color: "#060606" },
  ],
  colorScheme: "dark light",
};

// Server-rendered root metadata for global SEO, Open Graph, verification, and hreflang defaults.
export async function generateMetadata(): Promise<Metadata> {
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "Bruno Hristoforov \u2014 Web Developer",
      template: "%s | Bruno Hristoforov \u2014 Web Developer",
    },
    description: defaultDescription,
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
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    referrer: "origin-when-cross-origin",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: googleVerification ? { google: googleVerification } : undefined,
    openGraph: {
      title: "Bruno Hristoforov \u2014 Web Developer",
      description: defaultDescription,
      url: siteUrl,
      siteName,
      locale: "en_US",
      alternateLocale: ["et_EE"],
      type: "website",
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: "Bruno Hristoforov \u2014 Web Developer",
      description: defaultDescription,
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
  const contactSchema = buildContactSchema(locale);

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      </head>
      <body className="min-h-full overflow-x-clip text-[var(--color-text)]">
        <ThemeProvider>
          <LanguageProvider>
            <AppShell>{children}</AppShell>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
