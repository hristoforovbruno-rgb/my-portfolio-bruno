"use client";

import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { apiRequest, type CmsContent, type LocalizedCmsContent } from "@/lib/admin-api";

const emptyContent: CmsContent = {
  homeHeroEyebrow: "",
  homeHeroTitle: "",
  homeHeroDescription: "",
  homePrimaryCta: "",
  homeSecondaryCta: "",
  ctaEyebrow: "",
  ctaTitle: "",
  ctaDescription: "",
  ctaButton: "",
  footerTitle: "",
  footerText: "",
  contactPhone: "",
  contactLocation: "",
};

const initialState: LocalizedCmsContent = {
  en: { ...emptyContent },
  et: { ...emptyContent },
};

export default function AdminContentPage() {
  const [content, setContent] = useState<LocalizedCmsContent>(initialState);
  const [editorLocale, setEditorLocale] = useState<"en" | "et">("en");
  const [status, setStatus] = useState("");

  useEffect(() => {
    void apiRequest<LocalizedCmsContent>("/api/cms/content", { auth: true }).then(setContent).catch(() => setStatus("Failed to load content"));
  }, []);

  const localizedContent = content[editorLocale];

  return (
    <AdminGuard>
      <AdminShell title="Content" description="Edit homepage, CTA, footer, and contact details shown across the site.">
        <form
          className="theme-surface rounded-[2rem] p-8"
          onSubmit={async (event) => {
            event.preventDefault();
            const updated = await apiRequest<LocalizedCmsContent>("/api/cms/content", { method: "PATCH", body: content, auth: true });
            setContent(updated);
            setStatus("Content saved.");
          }}
        >
          <div className="mb-6 flex gap-3">
            {(["en", "et"] as const).map((locale) => (
              <button key={locale} type="button" onClick={() => setEditorLocale(locale)} className={`interactive-button rounded-full px-4 py-2 text-sm font-semibold ${editorLocale === locale ? "bg-[var(--color-gold)] text-black" : "theme-ghost"}`}>
                {locale.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {Object.entries(localizedContent).map(([key, value]) => (
              <label key={key} className={`theme-text-muted grid gap-2 text-sm ${key.toLowerCase().includes("description") || key.toLowerCase().includes("title") || key.toLowerCase().includes("text") ? "md:col-span-2" : ""}`}>
                {key}
                {String(value).length > 80 ? (
                  <textarea rows={4} value={value} onChange={(event) => setContent((current) => ({ ...current, [editorLocale]: { ...current[editorLocale], [key]: event.target.value } }))} className="theme-field rounded-[1.4rem] px-4 py-3 outline-none" />
                ) : (
                  <input value={value} onChange={(event) => setContent((current) => ({ ...current, [editorLocale]: { ...current[editorLocale], [key]: event.target.value } }))} className="theme-field rounded-2xl px-4 py-3 outline-none" />
                )}
              </label>
            ))}
          </div>
          <button type="submit" className="interactive-button mt-6 rounded-full bg-[var(--color-gold)] px-5 py-3 text-sm font-semibold text-black">Save content</button>
          {status ? <p className="theme-text-muted mt-4 text-sm">{status}</p> : null}
        </form>
      </AdminShell>
    </AdminGuard>
  );
}
