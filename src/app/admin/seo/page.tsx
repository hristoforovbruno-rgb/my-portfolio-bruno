"use client";

import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { apiRequest, type CmsSeoPage } from "@/lib/admin-api";

const initialSeo: CmsSeoPage = {
  path: "",
  title: "",
  description: "",
  keywords: [],
  ogImage: "",
  canonicalPath: "",
};

export default function AdminSeoPage() {
  const [items, setItems] = useState<CmsSeoPage[]>([]);
  const [editor, setEditor] = useState<CmsSeoPage>(initialSeo);

  useEffect(() => {
    void apiRequest<CmsSeoPage[]>("/api/cms/seo", { auth: true }).then(setItems);
  }, []);

  async function saveSeo() {
    const payload = {
      ...editor,
      keywords: editor.keywords.filter(Boolean),
    };
    const saved = await apiRequest<CmsSeoPage>("/api/cms/seo", { method: "PUT", body: payload, auth: true });
    setItems((current) => {
      const exists = current.some((item) => item.path === saved.path || item.id === saved.id);
      return exists ? current.map((item) => (item.path === saved.path || item.id === saved.id ? saved : item)) : [...current, saved];
    });
    setEditor(saved);
  }

  return (
    <AdminGuard>
      <AdminShell title="SEO" description="Manage page-level metadata, descriptions, keywords, and canonical paths.">
        <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="theme-surface rounded-[2rem] p-6">
            <button type="button" onClick={() => setEditor(initialSeo)} className="interactive-button mb-4 rounded-full bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-black">New SEO entry</button>
            <div className="grid gap-3">
              {items.map((item) => (
                <button key={item.id || item.path} type="button" onClick={() => setEditor(item)} className="theme-surface-soft rounded-[1.4rem] p-4 text-left">
                  <p className="font-semibold text-[var(--color-gold-light)]">{item.path}</p>
                  <p className="theme-text-faint mt-2 text-xs">{item.title}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="theme-surface rounded-[2rem] p-6">
            <div className="grid gap-4">
              {(["path", "title", "description", "ogImage", "canonicalPath"] as const).map((field) => (
                <label key={field} className="theme-text-muted grid gap-2 text-sm">
                  {field}
                  {field === "description" ? <textarea rows={4} value={editor[field]} onChange={(event) => setEditor((current) => ({ ...current, [field]: event.target.value }))} className="theme-field rounded-[1.4rem] px-4 py-3 outline-none" /> : <input value={editor[field]} onChange={(event) => setEditor((current) => ({ ...current, [field]: event.target.value }))} className="theme-field rounded-2xl px-4 py-3 outline-none" />}
                </label>
              ))}
              <label className="theme-text-muted grid gap-2 text-sm">keywords
                <textarea rows={4} value={editor.keywords.join("\n")} onChange={(event) => setEditor((current) => ({ ...current, keywords: event.target.value.split("\n") }))} className="theme-field rounded-[1.4rem] px-4 py-3 outline-none" />
              </label>
            </div>
            <button type="button" onClick={() => void saveSeo()} className="interactive-button mt-6 rounded-full bg-[var(--color-gold)] px-5 py-3 text-sm font-semibold text-black">Save SEO</button>
          </div>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
