import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { LanguageProvider } from "@/lib/language";
import { siteUrl } from "@/lib/site-content";
import { ThemeProvider } from "@/lib/theme";
import "./globals.css";

const themeInitScript = `
  (() => {
    try {
      const storedTheme = window.localStorage.getItem("portfolio-theme");
      const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
      const theme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : systemTheme;
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch {
      document.documentElement.dataset.theme = "dark";
      document.documentElement.style.colorScheme = "dark";
    }
  })();
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bruno Hristoforov | Web Developer in Tallinn, Estonia",
    template: "%s | Bruno Hristoforov",
  },
  description:
    "Bruno Hristoforov builds fast, premium websites for small businesses in Tallinn and across Estonia that need more trust, more visibility, and more enquiries.",
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
    <html lang="en" className="h-full scroll-smooth antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
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
