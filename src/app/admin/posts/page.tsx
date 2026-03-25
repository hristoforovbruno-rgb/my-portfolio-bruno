"use client";

import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { apiRequest, type CmsBlogPost } from "@/lib/admin-api";

const initialPost: CmsBlogPost = {
  id: "",
  slug: "",
  category: "",
  title: "",
  excerpt: "",
  description: "",
  publishedAt: "",
  readingTime: "",
  status: "draft",
  sections: [{ heading: "", body: [""] }],
  coverImage: "",
};

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<CmsBlogPost[]>([]);
  const [editor, setEditor] = useState<CmsBlogPost>(initialPost);

  useEffect(() => {
    void apiRequest<CmsBlogPost[]>("/api/cms/posts", { auth: true }).then(setPosts);
  }, []);

  async function savePost() {
    const payload = { ...editor, sections: editor.sections.map((section) => ({ ...section, body: section.body.filter(Boolean) })) };
    const saved = editor.id
      ? await apiRequest<CmsBlogPost>(`/api/cms/posts/${editor.id}`, { method: "PUT", body: payload, auth: true })
      : await apiRequest<CmsBlogPost>("/api/cms/posts", { method: "POST", body: payload, auth: true });

    setPosts((current) => {
      const next = editor.id ? current.map((post) => (post.id === saved.id ? saved : post)) : [saved, ...current];
      return next;
    });
    setEditor(saved);
  }

  return (
    <AdminGuard>
      <AdminShell title="Blog" description="Create, publish, update, and remove insight posts.">
        <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="theme-surface rounded-[2rem] p-6">
            <button type="button" onClick={() => setEditor(initialPost)} className="interactive-button mb-4 rounded-full bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-black">New post</button>
            <div className="grid gap-3">
              {posts.map((post) => (
                <button key={post.id} type="button" onClick={() => setEditor(post)} className="theme-surface-soft rounded-[1.4rem] p-4 text-left">
                  <p className="font-semibold text-[var(--color-gold-light)]">{post.title}</p>
                  <p className="theme-text-faint mt-2 text-xs uppercase">{post.status}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="theme-surface rounded-[2rem] p-6">
            <div className="grid gap-4">
              {(["slug", "category", "title", "excerpt", "description", "publishedAt", "readingTime", "coverImage"] as const).map((field) => (
                <label key={field} className="theme-text-muted grid gap-2 text-sm">
                  {field}
                  <input value={editor[field]} onChange={(event) => setEditor((current) => ({ ...current, [field]: event.target.value }))} className="theme-field rounded-2xl px-4 py-3 outline-none" />
                </label>
              ))}
              <label className="theme-text-muted grid gap-2 text-sm">status
                <select value={editor.status} onChange={(event) => setEditor((current) => ({ ...current, status: event.target.value as CmsBlogPost["status"] }))} className="theme-field rounded-2xl px-4 py-3 outline-none">
                  <option value="draft">draft</option>
                  <option value="published">published</option>
                </select>
              </label>
              <label className="theme-text-muted grid gap-2 text-sm">section heading
                <input value={editor.sections[0]?.heading || ""} onChange={(event) => setEditor((current) => ({ ...current, sections: [{ heading: event.target.value, body: current.sections[0]?.body || [""] }] }))} className="theme-field rounded-2xl px-4 py-3 outline-none" />
              </label>
              <label className="theme-text-muted grid gap-2 text-sm">section body
                <textarea rows={6} value={(editor.sections[0]?.body || []).join("\n")} onChange={(event) => setEditor((current) => ({ ...current, sections: [{ heading: current.sections[0]?.heading || "", body: event.target.value.split("\n").filter(Boolean) }] }))} className="theme-field rounded-[1.4rem] px-4 py-3 outline-none" />
              </label>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={() => void savePost()} className="interactive-button rounded-full bg-[var(--color-gold)] px-5 py-3 text-sm font-semibold text-black">Save post</button>
              {editor.id ? <button type="button" onClick={async () => {
                await apiRequest(`/api/cms/posts/${editor.id}`, { method: "DELETE", auth: true });
                setPosts((current) => current.filter((post) => post.id !== editor.id));
                setEditor(initialPost);
              }} className="interactive-button theme-ghost rounded-full px-5 py-3 text-sm font-semibold hover:text-red-300">Delete</button> : null}
            </div>
          </div>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
