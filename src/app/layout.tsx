import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { DevExtensionErrorFilter } from "@/components/dev-extension-error-filter";
import { PageTransition } from "@/components/page-transition";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteUrl } from "@/lib/site-content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bruno Hristoforov | Web Developer in Tallinn",
    template: "%s | Bruno Hristoforov",
  },
  description:
    "Bruno Hristoforov builds fast, premium websites for small businesses and local service companies that need more trust, more visibility, and more enquiries.",
  applicationName: "Bruno Hristoforov Website Examples",
  category: "business",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-[var(--color-bg)] text-[var(--color-text)]">
        <DevExtensionErrorFilter />
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
