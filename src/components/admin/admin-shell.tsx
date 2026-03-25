"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAdminSession, getAdminEmail } from "@/lib/admin-session";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/forms", label: "Forms" },
  { href: "/admin/posts", label: "Blog" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/seo", label: "SEO" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/account", label: "Account" },
  { href: "/admin/backups", label: "Backups" },
  { href: "/admin/activity", label: "Activity" },
];

export function AdminShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const email = getAdminEmail();

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-[var(--color-border)] bg-[var(--color-panel)] p-6">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-gold)]">Admin Panel</p>
            <h1 className="theme-text-main mt-3 text-2xl font-semibold">Site Admin</h1>
            <p suppressHydrationWarning className="theme-text-faint mt-2 text-sm">{email || "admin"}</p>
          </div>
          <nav className="grid gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`interactive-button rounded-2xl px-4 py-3 text-sm font-medium ${
                    isActive
                      ? "bg-[var(--accent-surface)] text-[var(--color-gold-light)]"
                      : "theme-ghost theme-text-muted hover:text-[var(--color-gold)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={() => {
              clearAdminSession();
              router.replace("/admin/login");
            }}
            className="interactive-button theme-ghost mt-8 inline-flex rounded-full px-5 py-3 text-sm font-semibold hover:text-[var(--color-gold-light)]"
          >
            Logout
          </button>
        </aside>

        <section className="p-6 lg:p-10">
          <header className="mb-8 flex flex-col gap-3 border-b border-[var(--color-border)] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-gold)]">Admin</p>
              <h2 className="theme-text-main mt-3 text-3xl font-semibold">{title}</h2>
              <p className="theme-text-muted mt-2 max-w-2xl text-sm leading-7">{description}</p>
            </div>
          </header>
          {children}
        </section>
      </div>
    </div>
  );
}
