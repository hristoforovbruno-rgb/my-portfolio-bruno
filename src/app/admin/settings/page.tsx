"use client";

import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { type AdminSettings, apiRequest } from "@/lib/admin-api";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSettings>({
    publicEmail: "",
    contactPageText: {
      en: "",
      et: "",
    },
    starterPrice: "",
    advancedPrice: "",
    maintenancePrice: "",
  });
  const [editorLocale, setEditorLocale] = useState<"en" | "et">("en");
  const [status, setStatus] = useState("");

  useEffect(() => {
    void apiRequest<AdminSettings>("/api/settings", { auth: true })
      .then((result) => setSettings({
        publicEmail: result.publicEmail || "",
        contactPageText: {
          en: result.contactPageText?.en || "",
          et: result.contactPageText?.et || "",
        },
        starterPrice: result.starterPrice || "",
        advancedPrice: result.advancedPrice || "",
        maintenancePrice: result.maintenancePrice || "",
      }))
      .catch((error) => setStatus(error instanceof Error ? error.message : "Failed to load settings"));
  }, []);

  return (
    <AdminGuard>
      <AdminShell title="Settings" description="Update the public contact details, support text, and pricing shown on the website.">
        <form
          className="theme-surface max-w-3xl rounded-[2rem] p-8"
          onSubmit={async (event) => {
            event.preventDefault();
            setStatus("");

            try {
              const updated = await apiRequest<AdminSettings>("/api/settings", {
                method: "PATCH",
                body: settings,
                auth: true,
              });

              setSettings({
                publicEmail: updated.publicEmail || "",
                contactPageText: {
                  en: updated.contactPageText?.en || "",
                  et: updated.contactPageText?.et || "",
                },
                starterPrice: updated.starterPrice || "",
                advancedPrice: updated.advancedPrice || "",
                maintenancePrice: updated.maintenancePrice || "",
              });
              setStatus("Settings saved.");
            } catch (error) {
              setStatus(error instanceof Error ? error.message : "Failed to save settings");
            }
          }}
        >
          <div className="grid gap-5">
            <div className="flex gap-3">
              {(["en", "et"] as const).map((locale) => (
                <button key={locale} type="button" onClick={() => setEditorLocale(locale)} className={`interactive-button rounded-full px-4 py-2 text-sm font-semibold ${editorLocale === locale ? "bg-[var(--color-gold)] text-black" : "theme-ghost"}`}>
                  {locale.toUpperCase()}
                </button>
              ))}
            </div>
            <label className="theme-text-muted grid gap-2 text-sm">
              Public email
              <input
                type="email"
                value={settings.publicEmail}
                onChange={(event) => setSettings((current) => ({ ...current, publicEmail: event.target.value }))}
                className="theme-field rounded-2xl px-4 py-3 outline-none"
              />
            </label>
            <label className="theme-text-muted grid gap-2 text-sm">
              Contact page text
              <textarea
                rows={5}
                value={settings.contactPageText[editorLocale]}
                onChange={(event) => setSettings((current) => ({ ...current, contactPageText: { ...current.contactPageText, [editorLocale]: event.target.value } }))}
                className="theme-field rounded-[1.5rem] px-4 py-3 outline-none"
              />
            </label>
            <div className="grid gap-5 md:grid-cols-3">
              <label className="theme-text-muted grid gap-2 text-sm">
                Starter price
                <input
                  value={settings.starterPrice}
                  onChange={(event) => setSettings((current) => ({ ...current, starterPrice: event.target.value }))}
                  className="theme-field rounded-2xl px-4 py-3 outline-none"
                />
              </label>
              <label className="theme-text-muted grid gap-2 text-sm">
                Advanced price
                <input
                  value={settings.advancedPrice}
                  onChange={(event) => setSettings((current) => ({ ...current, advancedPrice: event.target.value }))}
                  className="theme-field rounded-2xl px-4 py-3 outline-none"
                />
              </label>
              <label className="theme-text-muted grid gap-2 text-sm">
                Maintenance price
                <input
                  value={settings.maintenancePrice}
                  onChange={(event) => setSettings((current) => ({ ...current, maintenancePrice: event.target.value }))}
                  className="theme-field rounded-2xl px-4 py-3 outline-none"
                />
              </label>
            </div>
            <button type="submit" className="interactive-button w-fit rounded-full bg-[var(--color-gold)] px-5 py-3 text-sm font-semibold text-black">
              Save settings
            </button>
            {status ? <p className="theme-text-muted text-sm">{status}</p> : null}
          </div>
        </form>
      </AdminShell>
    </AdminGuard>
  );
}
