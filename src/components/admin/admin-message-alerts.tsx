"use client";

import { useEffect, useRef, useState } from "react";
import { BellIcon } from "@/components/icons";

type AdminAlertMessage = {
  id: string;
  name: string;
  email: string;
  read: boolean;
  createdAt: string;
};

const POLL_INTERVAL_MS = 20000;
const TITLE_PREFIX = "Admin";

function formatTime(timestamp: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(timestamp));
}

export function AdminMessageAlerts() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastMessage, setLastMessage] = useState<AdminAlertMessage | null>(null);
  const [freshCount, setFreshCount] = useState(0);
  const [permission, setPermission] = useState<NotificationPermission>(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      return Notification.permission;
    }

    return "default";
  });
  const latestSeenIdRef = useRef<string | null>(null);
  const initializedRef = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const originalTitleRef = useRef<string>("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    originalTitleRef.current = document.title;

    return () => {
      document.title = originalTitleRef.current || document.title;
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const baseTitle = originalTitleRef.current || TITLE_PREFIX;
    document.title = unreadCount > 0 ? `(${unreadCount}) ${baseTitle}` : baseTitle;
  }, [unreadCount]);

  async function playAlertSound() {
    if (typeof window === "undefined") {
      return;
    }

    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) {
      return;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextClass();
    }

    const context = audioContextRef.current;
    await context.resume();

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1174, context.currentTime + 0.18);
    gainNode.gain.setValueAtTime(0.0001, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.18, context.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.4);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.42);
  }

  async function showBrowserNotification(message: AdminAlertMessage, count: number) {
    if (typeof window === "undefined" || !("Notification" in window) || Notification.permission !== "granted") {
      return;
    }

    const notification = new Notification(count > 1 ? `${count} new contact messages` : "New contact message", {
      body: `${message.name} just sent a new message.`,
      tag: "admin-contact-message",
    });

    window.setTimeout(() => notification.close(), 7000);
  }

  useEffect(() => {
    let cancelled = false;

    const loadMessages = async () => {
      try {
        const response = await fetch("/api/admin/messages", { cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as AdminAlertMessage[];

        if (cancelled) {
          return;
        }

        setUnreadCount(data.filter((message) => !message.read).length);
        setLastMessage(data[0] ?? null);

        if (!initializedRef.current) {
          latestSeenIdRef.current = data[0]?.id ?? null;
          initializedRef.current = true;
          return;
        }

        const newMessages: AdminAlertMessage[] = [];

        for (const message of data) {
          if (message.id === latestSeenIdRef.current) {
            break;
          }
          newMessages.push(message);
        }

        if (newMessages.length > 0) {
          latestSeenIdRef.current = data[0]?.id ?? latestSeenIdRef.current;
          setFreshCount(newMessages.length);

          try {
            await playAlertSound();
          } catch {
            // Audio can be blocked until the admin interacts with the page.
          }

          await showBrowserNotification(newMessages[0], newMessages.length);
          return;
        }

        latestSeenIdRef.current = data[0]?.id ?? latestSeenIdRef.current;
      } catch {
        // Ignore polling errors here so the admin UI stays calm.
      }
    };

    void loadMessages();
    const intervalId = window.setInterval(() => {
      void loadMessages();
    }, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  const enableBrowserAlerts = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return;
    }

    const nextPermission = await Notification.requestPermission();
    setPermission(nextPermission);

    try {
      await playAlertSound();
    } catch {
      // Some browsers may still block audio; the polling badge remains available.
    }
  };

  return (
    <div className="rounded-[1.5rem] border border-[var(--color-gold-soft)] bg-[rgba(212,175,55,0.07)] p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-gold-soft)] bg-[rgba(212,175,55,0.12)] text-[var(--color-gold-light)]">
            <BellIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">Contact alerts</p>
            <p className="theme-text-main mt-2 text-base sm:text-lg">
              {freshCount > 0 ? `${freshCount} new contact ${freshCount === 1 ? "message has" : "messages have"} arrived.` : "Admin alerts are watching for new contact form messages."}
            </p>
            <p className="theme-text-muted mt-2 text-sm leading-7 sm:text-base">
              {lastMessage
                ? `Latest message from ${lastMessage.name} at ${formatTime(lastMessage.createdAt)}. ${unreadCount} unread total.`
                : "No contact messages have arrived yet."}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setFreshCount(0);
              void playAlertSound();
            }}
            className="interactive-button theme-ghost rounded-full px-4 py-2 text-sm font-semibold"
          >
            Test sound
          </button>
          <button
            type="button"
            onClick={() => void enableBrowserAlerts()}
            className="interactive-button rounded-full bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-black"
          >
            {permission === "granted" ? "Browser alerts on" : permission === "denied" ? "Browser alerts blocked" : "Enable browser alerts"}
          </button>
        </div>
      </div>
    </div>
  );
}
