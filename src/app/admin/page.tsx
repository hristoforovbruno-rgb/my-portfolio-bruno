"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

type AdminMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  repliedAt: string | null;
  createdAt: string;
};

type ReplyResponse = {
  success: boolean;
  repliedAt: string;
};

function formatTimestamp(timestamp: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(timestamp)).replace(",", " \u00b7");
}

function previewMessage(message: string) {
  return message.length > 100 ? `${message.slice(0, 100)}...` : message;
}

export default function AdminPage() {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [busyIds, setBusyIds] = useState<string[]>([]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await fetch("/api/admin/messages", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(response.status === 401 ? "Unauthorized" : "Failed to load messages");
        }

        const data = (await response.json()) as AdminMessage[];
        setMessages(data);
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : "Failed to load messages");
      } finally {
        setIsLoading(false);
      }
    };

    void loadMessages();
  }, []);

  const totalMessages = messages.length;
  const unreadMessages = messages.filter((message) => !message.read).length;

  const setBusy = (id: string, active: boolean) => {
    setBusyIds((current) => (active ? [...new Set([...current, id])] : current.filter((entry) => entry !== id)));
  };

  const handleReadToggle = async (message: AdminMessage) => {
    const previousMessages = messages;
    const nextReadValue = !message.read;

    setError("");
    setMessages((current) => current.map((entry) => (entry.id === message.id ? { ...entry, read: nextReadValue } : entry)));
    setBusy(message.id, true);

    try {
      const response = await fetch(`/api/admin/messages/${message.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: nextReadValue }),
      });

      if (!response.ok) {
        throw new Error("Failed to update message");
      }

      const updatedMessage = (await response.json()) as AdminMessage;
      setMessages((current) => current.map((entry) => (entry.id === message.id ? updatedMessage : entry)));
    } catch (requestError) {
      setMessages(previousMessages);
      setError(requestError instanceof Error ? requestError.message : "Failed to update message");
    } finally {
      setBusy(message.id, false);
    }
  };

  const handleDelete = async (message: AdminMessage) => {
    if (!window.confirm(`Delete the message from ${message.name}?`)) {
      return;
    }

    const previousMessages = messages;

    setError("");
    setMessages((current) => current.filter((entry) => entry.id !== message.id));
    setExpandedId((current) => (current === message.id ? null : current));
    setReplyingId((current) => (current === message.id ? null : current));
    setBusy(message.id, true);

    try {
      const response = await fetch(`/api/admin/messages/${message.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete message");
      }
    } catch (requestError) {
      setMessages(previousMessages);
      setError(requestError instanceof Error ? requestError.message : "Failed to delete message");
    } finally {
      setBusy(message.id, false);
    }
  };

  const handleReply = async (message: AdminMessage) => {
    const replyText = replyDrafts[message.id]?.trim() || "";

    if (!replyText) {
      setError("Reply text cannot be empty");
      return;
    }

    const previousMessages = messages;
    const optimisticRepliedAt = new Date().toISOString();

    setError("");
    setMessages((current) =>
      current.map((entry) => (entry.id === message.id ? { ...entry, repliedAt: optimisticRepliedAt } : entry)),
    );
    setBusy(message.id, true);

    try {
      const response = await fetch("/api/admin/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId: message.id,
          replyText,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send reply");
      }

      const data = (await response.json()) as ReplyResponse;

      setMessages((current) =>
        current.map((entry) => (entry.id === message.id ? { ...entry, repliedAt: data.repliedAt, read: true } : entry)),
      );
      setReplyDrafts((current) => ({ ...current, [message.id]: "" }));
      setReplyingId(null);
    } catch (requestError) {
      setMessages(previousMessages);
      setError(requestError instanceof Error ? requestError.message : "Failed to send reply");
    } finally {
      setBusy(message.id, false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_24%),radial-gradient(circle_at_85%_15%,rgba(212,175,55,0.08),transparent_20%),linear-gradient(180deg,#050505_0%,#090909_45%,#030303_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-black/40 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.42)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-gold-light)]">Admin Panel</p>
            <h1 className="mt-3 font-serif text-3xl text-white sm:text-4xl">Admin - Contact Messages</h1>
          </div>

          <button
            type="button"
            onClick={() => void signOut({ callbackUrl: "/admin/login" })}
            className="rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-[var(--color-gold-soft)] hover:bg-white/8"
          >
            Sign Out
          </button>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <section className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">Total Messages</p>
            <p className="mt-3 text-4xl font-semibold text-white">{totalMessages}</p>
          </section>

          <section className="rounded-[1.75rem] border border-[var(--color-gold-soft)] bg-[rgba(212,175,55,0.08)] p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-light)]">Unread</p>
              <span className="rounded-full bg-[var(--color-gold)] px-3 py-1 text-xs font-semibold text-black">{unreadMessages}</span>
            </div>
            <p className="mt-3 text-4xl font-semibold text-white">{unreadMessages}</p>
          </section>
        </div>

        {error ? <p className="mb-6 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}

        {isLoading ? (
          <div className="grid gap-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="animate-pulse rounded-[1.75rem] border border-white/8 bg-white/[0.04] p-5">
                <div className="h-5 w-40 rounded-full bg-white/10" />
                <div className="mt-3 h-4 w-56 rounded-full bg-white/8" />
                <div className="mt-4 h-4 w-full rounded-full bg-white/8" />
                <div className="mt-2 h-4 w-3/4 rounded-full bg-white/8" />
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/10 bg-black/25 px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--color-gold-soft)] bg-[rgba(212,175,55,0.08)]">
              <div className="h-5 w-5 rounded-full border border-[var(--color-gold-light)]" />
            </div>
            <h2 className="mt-5 font-serif text-2xl text-white">No messages yet</h2>
            <p className="mt-2 max-w-md text-sm leading-7 text-white/55">New contact form submissions will appear here once visitors start reaching out.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {messages.map((message) => {
              const isExpanded = expandedId === message.id;
              const isReplying = replyingId === message.id;
              const isBusy = busyIds.includes(message.id);

              return (
                <article
                  key={message.id}
                  className={`rounded-[1.75rem] border p-5 transition ${
                    message.read
                      ? "border-white/8 bg-white/[0.04]"
                      : "border-[var(--color-gold-soft)] bg-[rgba(212,175,55,0.07)]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedId((current) => (current === message.id ? null : message.id))}
                    className="w-full text-left"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          {!message.read ? <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-gold)]" /> : null}
                          <p className={`truncate text-lg ${message.read ? "font-medium text-white" : "font-semibold text-[var(--color-gold-light)]"}`}>
                            {message.name}
                          </p>
                          {message.repliedAt ? (
                            <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                              Replied
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-2 truncate text-sm text-white/60">{message.email}</p>
                        <p className="mt-3 text-sm leading-7 text-white/72">{previewMessage(message.message)}</p>
                      </div>

                      <p className="shrink-0 text-sm text-white/45">{formatTimestamp(message.createdAt)}</p>
                    </div>
                  </button>

                  {isExpanded ? (
                    <div className="mt-5 border-t border-white/8 pt-5">
                      <pre className="overflow-x-auto rounded-[1.5rem] border border-white/8 bg-black/30 p-4 font-mono text-sm leading-7 whitespace-pre-wrap text-white/82">
                        {message.message}
                      </pre>

                      <div className="mt-4 flex flex-wrap gap-3">
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => void handleReadToggle(message)}
                          className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-[var(--color-gold-soft)] hover:bg-white/8 disabled:cursor-wait disabled:opacity-70"
                        >
                          {message.read ? "Mark as unread" : "Mark as read"}
                        </button>

                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => setReplyingId((current) => (current === message.id ? null : message.id))}
                          className="rounded-full border border-[var(--color-gold-soft)] bg-[rgba(212,175,55,0.08)] px-4 py-2 text-sm font-semibold text-[var(--color-gold-light)] transition hover:bg-[rgba(212,175,55,0.14)] disabled:cursor-wait disabled:opacity-70"
                        >
                          Reply
                        </button>

                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => void handleDelete(message)}
                          className="rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/14 disabled:cursor-wait disabled:opacity-70"
                        >
                          Delete
                        </button>
                      </div>

                      {isReplying ? (
                        <div className="mt-4 grid gap-3">
                          <textarea
                            rows={6}
                            value={replyDrafts[message.id] || ""}
                            onChange={(event) =>
                              setReplyDrafts((current) => ({
                                ...current,
                                [message.id]: event.target.value,
                              }))
                            }
                            placeholder="Write your reply..."
                            className="rounded-[1.5rem] border border-white/10 bg-black/35 px-4 py-3 font-mono text-sm leading-7 text-white outline-none transition focus:border-[var(--color-gold)]"
                          />
                          <div className="flex flex-wrap gap-3">
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => void handleReply(message)}
                              className="rounded-full bg-[var(--color-gold)] px-5 py-2.5 text-sm font-semibold text-black transition hover:brightness-105 disabled:cursor-wait disabled:opacity-80"
                            >
                              Send
                            </button>
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => setReplyingId(null)}
                              className="rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/8 disabled:cursor-wait disabled:opacity-70"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
