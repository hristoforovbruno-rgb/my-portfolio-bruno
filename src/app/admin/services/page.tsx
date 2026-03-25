"use client";

import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { apiRequest, type CmsServicePage } from "@/lib/admin-api";

const initialService: CmsServicePage = {
  id: "",
  slug: "",
  title: "",
  keyword: "",
  eyebrow: "",
  summary: "",
  intro: "",
  pain: "",
  solution: "",
  outcomes: [""],
  bestFor: [""],
  deliverables: [""],
  process: [""],
  priceNote: "",
};

export default function AdminServicesPage() {
  const [items, setItems] = useState<CmsServicePage[]>([]);
  const [editor, setEditor] = useState<CmsServicePage>(initialService);

  useEffect(() => {
    void apiRequest<CmsServicePage[]>("/api/cms/service-pages", { auth: true }).then(setItems);
  }, []);

  async function saveItem() {
    const payload = {
      ...editor,
      outcomes: editor.outcomes.filter(Boolean),
      bestFor: editor.bestFor.filter(Boolean),
      deliverables: editor.deliverables.filter(Boolean),
      process: editor.process.filter(Boolean),
    };
    const saved = editor.id
      ? await apiRequest<CmsServicePage>(`/api/cms/service-pages/${editor.id}`, { method: "PUT", body: payload, auth: true })
      : await apiRequest<CmsServicePage>("/api/cms/service-pages", { method: "POST", body: payload, auth: true });
    setItems((current) => editor.id ? current.map((item) => (item.id === saved.id ? saved : item)) : [...current, saved]);
    setEditor(saved);
  }

  return (
    <AdminGuard>
      <AdminShell title="Services" description="Manage service pages, summaries, pain points, deliverables, and process steps.">
        <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="theme-surface rounded-[2rem] p-6">
            <button type="button" onClick={() => setEditor(initialService)} className="interactive-button mb-4 rounded-full bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-black">New service</button>
            <div className="grid gap-3">
              {items.map((item) => (
                <button key={item.id} type="button" onClick={() => setEditor(item)} className="theme-surface-soft rounded-[1.4rem] p-4 text-left">
                  <p className="font-semibold text-[var(--color-gold-light)]">{item.title}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="theme-surface rounded-[2rem] p-6">
            <div className="grid gap-4">
              {(["slug", "title", "keyword", "eyebrow", "summary", "intro", "pain", "solution", "priceNote"] as const).map((field) => (
                <label key={field} className="theme-text-muted grid gap-2 text-sm">
                  {field}
                  {["summary", "intro", "pain", "solution"].includes(field) ? (
                    <textarea rows={4} value={editor[field]} onChange={(event) => setEditor((current) => ({ ...current, [field]: event.target.value }))} className="theme-field rounded-[1.4rem] px-4 py-3 outline-none" />
                  ) : (
                    <input value={editor[field]} onChange={(event) => setEditor((current) => ({ ...current, [field]: event.target.value }))} className="theme-field rounded-2xl px-4 py-3 outline-none" />
                  )}
                </label>
              ))}
              {(["outcomes", "bestFor", "deliverables", "process"] as const).map((field) => (
                <label key={field} className="theme-text-muted grid gap-2 text-sm">
                  {field}
                  <textarea rows={4} value={editor[field].join("\n")} onChange={(event) => setEditor((current) => ({ ...current, [field]: event.target.value.split("\n") }))} className="theme-field rounded-[1.4rem] px-4 py-3 outline-none" />
                </label>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={() => void saveItem()} className="interactive-button rounded-full bg-[var(--color-gold)] px-5 py-3 text-sm font-semibold text-black">Save service</button>
              {editor.id ? <button type="button" onClick={async () => {
                await apiRequest(`/api/cms/service-pages/${editor.id}`, { method: "DELETE", auth: true });
                setItems((current) => current.filter((item) => item.id !== editor.id));
                setEditor(initialService);
              }} className="interactive-button theme-ghost rounded-full px-5 py-3 text-sm font-semibold hover:text-red-300">Delete</button> : null}
            </div>
          </div>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
