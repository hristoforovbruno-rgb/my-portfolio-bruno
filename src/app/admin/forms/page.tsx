"use client";

import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { apiRequest, type CmsFormSettings } from "@/lib/admin-api";

const initialState: CmsFormSettings = {
  enabled: true,
  successMessage: {
    en: "",
    et: "",
  },
  destinationEmail: "",
  autoReplyEnabled: false,
  captchaReady: false,
};

export default function AdminFormsPage() {
  const [settings, setSettings] = useState<CmsFormSettings>(initialState);
  const [editorLocale, setEditorLocale] = useState<"en" | "et">("en");
  const [status, setStatus] = useState("");

  useEffect(() => {
    void apiRequest<CmsFormSettings>("/api/cms/form-settings", { auth: true }).then(setSettings).catch(() => setStatus("Failed to load form settings"));
  }, []);

  return (
    <AdminGuard>
      <AdminShell title="Forms" description="Control whether the contact form is active and what happens after a submission.">
        <form
          className="theme-surface max-w-3xl rounded-[2rem] p-8"
          onSubmit={async (event) => {
            event.preventDefault();
            const updated = await apiRequest<CmsFormSettings>("/api/cms/form-settings", { method: "PATCH", body: settings, auth: true });
            setSettings(updated);
            setStatus("Form settings saved.");
          }}
        >
          <div className="mb-6 flex gap-3">
            {(["en", "et"] as const).map((locale) => (
              <button key={locale} type="button" onClick={() => setEditorLocale(locale)} className={`interactive-button rounded-full px-4 py-2 text-sm font-semibold ${editorLocale === locale ? "bg-[var(--color-gold)] text-black" : "theme-ghost"}`}>
                {locale.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="grid gap-5">
            <label className="theme-text-muted flex items-center gap-3 text-sm"><input type="checkbox" checked={settings.enabled} onChange={(event) => setSettings((current) => ({ ...current, enabled: event.target.checked }))} /> Enable contact form</label>
            <label className="theme-text-muted flex items-center gap-3 text-sm"><input type="checkbox" checked={settings.autoReplyEnabled} onChange={(event) => setSettings((current) => ({ ...current, autoReplyEnabled: event.target.checked }))} /> Auto-reply ready</label>
            <label className="theme-text-muted flex items-center gap-3 text-sm"><input type="checkbox" checked={settings.captchaReady} onChange={(event) => setSettings((current) => ({ ...current, captchaReady: event.target.checked }))} /> Captcha-ready mode</label>
            <label className="theme-text-muted grid gap-2 text-sm">Destination email<input type="email" value={settings.destinationEmail} onChange={(event) => setSettings((current) => ({ ...current, destinationEmail: event.target.value }))} className="theme-field rounded-2xl px-4 py-3 outline-none" /></label>
            <label className="theme-text-muted grid gap-2 text-sm">Success message<textarea rows={4} value={settings.successMessage[editorLocale]} onChange={(event) => setSettings((current) => ({ ...current, successMessage: { ...current.successMessage, [editorLocale]: event.target.value } }))} className="theme-field rounded-[1.4rem] px-4 py-3 outline-none" /></label>
          </div>
          <button type="submit" className="interactive-button mt-6 rounded-full bg-[var(--color-gold)] px-5 py-3 text-sm font-semibold text-black">Save form settings</button>
          {status ? <p className="theme-text-muted mt-4 text-sm">{status}</p> : null}
        </form>
      </AdminShell>
    </AdminGuard>
  );
}
