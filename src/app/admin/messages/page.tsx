"use client";

import { useEffect, useMemo, useState } from "react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { getApiBaseUrl } from "@/lib/api-base-url";
import { type AdminMessage, type MessagesResponse, apiRequest } from "@/lib/admin-api";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | "read" | "unread">("all");
  const [selectedMessage, setSelectedMessage] = useState<AdminMessage | null>(null);
  const [error, setError] = useState("");

  const searchParams = useMemo(() => {
    const params = new URLSearchParams({ status, limit: "50" });

    if (query.trim()) {
      params.set("q", query.trim());
    }

    return params.toString();
  }, [query, status]);

  useEffect(() => {
    void apiRequest<MessagesResponse>(`/api/contact?${searchParams}`, { auth: true })
      .then((result) => setMessages(result.items))
      .catch((requestError) => setError(requestError instanceof Error ? requestError.message : "Failed to load messages"));
  }, [searchParams]);

  async function updateMessage(id: string, isRead: boolean) {
    const updated = await apiRequest<AdminMessage>(`/api/contact/${id}`, {
      method: "PATCH",
      body: { isRead },
      auth: true,
    });

    setMessages((current) => current.map((message) => (message.id === id ? updated : message)));
    setSelectedMessage((current) => (current?.id === id ? updated : current));
  }

  async function deleteMessage(id: string) {
    await apiRequest(`/api/contact/${id}`, { method: "DELETE", auth: true });
    setMessages((current) => current.filter((message) => message.id !== id));
    setSelectedMessage((current) => (current?.id === id ? null : current));
    setSelectedIds((current) => current.filter((entry) => entry !== id));
  }

  async function bulkAction(action: "read" | "unread" | "delete") {
    if (!selectedIds.length) {
      return;
    }

    await apiRequest<{ ok: true; affected: number }>("/api/contact/bulk", {
      method: "POST",
      body: { ids: selectedIds, action },
      auth: true,
    });

    if (action === "delete") {
      setMessages((current) => current.filter((message) => !selectedIds.includes(message.id)));
      setSelectedMessage((current) => (current && selectedIds.includes(current.id) ? null : current));
    } else {
      const isRead = action === "read";
      setMessages((current) => current.map((message) => (
        selectedIds.includes(message.id) ? { ...message, isRead } : message
      )));
      setSelectedMessage((current) => (current && selectedIds.includes(current.id) ? { ...current, isRead } : current));
    }

    setSelectedIds([]);
  }

  async function exportCsv() {
    const response = await fetch(`${getApiBaseUrl()}/api/contact/export`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("admin_token") || ""}`,
      },
    });

    const csv = await response.text();
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "contact-messages.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AdminGuard>
      <AdminShell title="Messages" description="Search, review, mark, and delete contact form submissions.">
        <div className="mb-6 grid gap-4 md:grid-cols-[1fr_180px]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, email, or message"
            className="theme-field rounded-2xl px-4 py-3 outline-none"
          />
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as "all" | "read" | "unread")}
            className="theme-field rounded-2xl px-4 py-3 outline-none"
          >
            <option value="all">All messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
        <div className="mb-6 flex flex-wrap gap-3">
          <button type="button" onClick={() => void bulkAction("read")} className="interactive-button theme-ghost rounded-full px-4 py-2 text-sm font-semibold">
            Mark selected as read
          </button>
          <button type="button" onClick={() => void bulkAction("unread")} className="interactive-button theme-ghost rounded-full px-4 py-2 text-sm font-semibold">
            Mark selected as unread
          </button>
          <button type="button" onClick={() => void bulkAction("delete")} className="interactive-button theme-ghost rounded-full px-4 py-2 text-sm font-semibold hover:text-red-300">
            Delete selected
          </button>
          <button type="button" onClick={() => void exportCsv()} className="interactive-button rounded-full bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-black">
            Export CSV
          </button>
        </div>

        {error ? <p className="text-sm text-red-300">{error}</p> : null}

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="theme-surface overflow-hidden rounded-[2rem]">
            <div className="grid grid-cols-[auto_1.1fr_1fr_1.4fr_auto] gap-3 border-b border-[var(--color-border)] px-5 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
              <span>Select</span>
              <span>Name</span>
              <span>Email</span>
              <span>Message</span>
              <span>Status</span>
            </div>
            <div className="divide-y divide-[var(--color-border)]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="grid grid-cols-[auto_1.1fr_1fr_1.4fr_auto] gap-3 px-5 py-4 transition hover:bg-[var(--accent-surface)]"
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(message.id)}
                    onChange={(event) => setSelectedIds((current) => (
                      event.target.checked ? [...current, message.id] : current.filter((entry) => entry !== message.id)
                    ))}
                    className="mt-1"
                  />
                  <button type="button" onClick={() => setSelectedMessage(message)} className="text-left">
                  <span className="theme-text-main font-semibold">{message.name}</span>
                  </button>
                  <button type="button" onClick={() => setSelectedMessage(message)} className="text-left">
                  <span className="theme-text-muted truncate">{message.email}</span>
                  </button>
                  <button type="button" onClick={() => setSelectedMessage(message)} className="text-left">
                  <span className="theme-text-soft truncate">{message.message}</span>
                  </button>
                  <span className={message.isRead ? "theme-text-faint" : "text-[var(--color-gold-light)]"}>
                    {message.isRead ? "Read" : "Unread"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="theme-surface rounded-[2rem] p-6">
            {selectedMessage ? (
              <>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="theme-text-main text-2xl font-semibold">{selectedMessage.name}</p>
                    <p className="theme-text-muted mt-2 text-sm">{selectedMessage.email}</p>
                    <p className="theme-text-faint mt-1 text-sm">
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span className="rounded-full border border-[var(--color-gold-soft)] bg-[var(--accent-surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-gold-light)]">
                    {selectedMessage.isRead ? "Read" : "Unread"}
                  </span>
                </div>
                {selectedMessage.phone ? <p className="theme-text-muted mt-4 text-sm">Phone: {selectedMessage.phone}</p> : null}
                <p className="theme-text-muted mt-6 text-base leading-8">{selectedMessage.message}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => updateMessage(selectedMessage.id, !selectedMessage.isRead)}
                    className="interactive-button rounded-full bg-[var(--color-gold)] px-5 py-3 text-sm font-semibold text-black"
                  >
                    Mark as {selectedMessage.isRead ? "unread" : "read"}
                  </button>
                  <button
                    type="button"
                    onClick={() => void deleteMessage(selectedMessage.id)}
                    className="interactive-button theme-ghost rounded-full px-5 py-3 text-sm font-semibold hover:text-red-300"
                  >
                    Delete message
                  </button>
                </div>
              </>
            ) : (
              <p className="theme-text-muted text-sm">Select a message to view the full content.</p>
            )}
          </div>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
