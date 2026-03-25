"use client";

import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { apiRequest, type AdminActivityLog } from "@/lib/admin-api";

export default function AdminActivityPage() {
  const [items, setItems] = useState<AdminActivityLog[]>([]);

  useEffect(() => {
    void apiRequest<AdminActivityLog[]>("/api/cms/activity", { auth: true }).then(setItems);
  }, []);

  return (
    <AdminGuard>
      <AdminShell title="Activity" description="Review recent admin actions and content updates.">
        <div className="grid gap-4">
          {items.map((item) => (
            <article key={item.id} className="theme-surface rounded-[1.6rem] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">{item.entityType} · {item.action}</p>
              <p className="theme-text-muted mt-3 text-sm leading-7">{item.description}</p>
              <p className="theme-text-faint mt-2 text-xs">{new Date(item.createdAt).toLocaleString()}</p>
            </article>
          ))}
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
