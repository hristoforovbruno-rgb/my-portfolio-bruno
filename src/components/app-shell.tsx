"use client";

import { usePathname } from "next/navigation";
import { CookieBanner } from "@/components/cookie-banner";
import { DevExtensionErrorFilter } from "@/components/dev-extension-error-filter";
import { PageTransition } from "@/components/page-transition";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VercelAnalytics } from "@/components/vercel-analytics";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      <DevExtensionErrorFilter />
      {isAdminRoute ? (
        <div className="min-h-screen">{children}</div>
      ) : (
        <div className="relative flex min-h-screen min-w-0 flex-col overflow-x-clip">
          <SiteHeader />
          <main className="flex-1 min-w-0 overflow-x-clip">
            <PageTransition>{children}</PageTransition>
          </main>
          <SiteFooter />
          <CookieBanner />
        </div>
      )}
      <VercelAnalytics />
    </>
  );
}
