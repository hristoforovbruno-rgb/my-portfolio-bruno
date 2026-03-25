"use client";

import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { type AdminDashboardStats, apiRequest } from "@/lib/admin-api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    void apiRequest<AdminDashboardStats>("/api/dashboard/stats", { auth: true })
      .then(setStats)
      .catch((requestError) => setError(requestError instanceof Error ? requestError.message : "Failed to load dashboard"));
  }, []);

  return (
    <AdminGuard>
      <AdminShell title="Dashboard" description="See message volume and recent contact activity at a glance.">
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <article className="theme-surface interactive-card rounded-[1.8rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">Total Messages</p>
            <p className="theme-text-main mt-4 text-4xl font-semibold">{stats?.totalMessages ?? "--"}</p>
          </article>
          <article className="theme-surface interactive-card rounded-[1.8rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">Unread</p>
            <p className="theme-text-main mt-4 text-4xl font-semibold">{stats?.unreadMessages ?? "--"}</p>
          </article>
          <article className="theme-highlight-surface interactive-card rounded-[1.8rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">Recent Messages</p>
            <p className="theme-text-main mt-4 text-4xl font-semibold">{stats?.recentMessages.length ?? "--"}</p>
          </article>
          <article className="theme-surface interactive-card rounded-[1.8rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">This Week</p>
            <p className="theme-text-main mt-4 text-4xl font-semibold">{stats?.messagesThisWeek ?? "--"}</p>
          </article>
          <article className="theme-surface interactive-card rounded-[1.8rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">This Month</p>
            <p className="theme-text-main mt-4 text-4xl font-semibold">{stats?.messagesThisMonth ?? "--"}</p>
          </article>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="theme-surface rounded-[2rem] p-6">
          <h3 className="theme-text-main text-2xl font-semibold">Latest submissions</h3>
          <div className="mt-5 grid gap-4">
            {stats?.recentMessages.map((message) => (
              <div key={message.id} className="theme-surface-soft rounded-[1.4rem] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-semibold text-[var(--color-gold-light)]">{message.name}</p>
                  <p className="theme-text-faint text-sm">{new Date(message.createdAt).toLocaleString()}</p>
                </div>
                <p className="theme-text-muted mt-2 text-sm">{message.email}</p>
                <p className="theme-text-soft mt-3 text-sm leading-7">{message.message.slice(0, 160)}</p>
              </div>
            ))}
          </div>
          </div>

          <div className="theme-surface rounded-[2rem] p-6">
            <h3 className="theme-text-main text-2xl font-semibold">Recent activity</h3>
            <div className="mt-5 grid gap-4">
              {stats?.recentActivity.map((item) => (
                <div key={item.id} className="theme-surface-soft rounded-[1.4rem] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
                    {item.entityType}
                  </p>
                  <p className="theme-text-muted mt-3 text-sm leading-7">{item.description}</p>
                  <p className="theme-text-faint mt-2 text-xs">{new Date(item.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
