"use client";

import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { apiRequest, type CmsMediaItem } from "@/lib/admin-api";

const initialItem: CmsMediaItem = {
  id: "",
  title: "",
  url: "",
  altText: "",
  type: "image",
};

export default function AdminMediaPage() {
  const [items, setItems] = useState<CmsMediaItem[]>([]);
  const [editor, setEditor] = useState<CmsMediaItem>(initialItem);

  useEffect(() => {
    void apiRequest<CmsMediaItem[]>("/api/cms/media", { auth: true }).then(setItems);
  }, []);

  async function saveItem() {
    const saved = editor.id
      ? await apiRequest<CmsMediaItem>(`/api/cms/media/${editor.id}`, { method: "PUT", body: editor, auth: true })
      : await apiRequest<CmsMediaItem>("/api/cms/media", { method: "POST", body: editor, auth: true });
    setItems((current) => editor.id ? current.map((item) => (item.id === saved.id ? saved : item)) : [saved, ...current]);
    setEditor(saved);
  }

  return (
    <AdminGuard>
      <AdminShell title="Media" description="Keep a simple media library of image and asset URLs for reuse across pages.">
        <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="theme-surface rounded-[2rem] p-6">
            <button type="button" onClick={() => setEditor(initialItem)} className="interactive-button mb-4 rounded-full bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-black">New media item</button>
            <div className="grid gap-3">
              {items.map((item) => (
                <button key={item.id} type="button" onClick={() => setEditor(item)} className="theme-surface-soft rounded-[1.4rem] p-4 text-left">
                  <p className="font-semibold text-[var(--color-gold-light)]">{item.title}</p>
                  <p className="theme-text-faint mt-2 text-xs">{item.url}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="theme-surface rounded-[2rem] p-6">
            <div className="grid gap-4">
              <label className="theme-text-muted grid gap-2 text-sm">Title<input value={editor.title} onChange={(event) => setEditor((current) => ({ ...current, title: event.target.value }))} className="theme-field rounded-2xl px-4 py-3 outline-none" /></label>
              <label className="theme-text-muted grid gap-2 text-sm">URL<input value={editor.url} onChange={(event) => setEditor((current) => ({ ...current, url: event.target.value }))} className="theme-field rounded-2xl px-4 py-3 outline-none" /></label>
              <label className="theme-text-muted grid gap-2 text-sm">Alt text<input value={editor.altText} onChange={(event) => setEditor((current) => ({ ...current, altText: event.target.value }))} className="theme-field rounded-2xl px-4 py-3 outline-none" /></label>
              <label className="theme-text-muted grid gap-2 text-sm">Type<select value={editor.type} onChange={(event) => setEditor((current) => ({ ...current, type: event.target.value as CmsMediaItem["type"] }))} className="theme-field rounded-2xl px-4 py-3 outline-none"><option value="image">image</option><option value="logo">logo</option><option value="document">document</option><option value="other">other</option></select></label>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={() => void saveItem()} className="interactive-button rounded-full bg-[var(--color-gold)] px-5 py-3 text-sm font-semibold text-black">Save media</button>
              {editor.id ? <button type="button" onClick={async () => {
                await apiRequest(`/api/cms/media/${editor.id}`, { method: "DELETE", auth: true });
                setItems((current) => current.filter((item) => item.id !== editor.id));
                setEditor(initialItem);
              }} className="interactive-button theme-ghost rounded-full px-5 py-3 text-sm font-semibold hover:text-red-300">Delete</button> : null}
            </div>
          </div>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
