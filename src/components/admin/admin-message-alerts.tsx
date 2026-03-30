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

type PushState = "idle" | "subscribed" | "unsupported" | "missing-config" | "blocked";

const POLL_INTERVAL_MS = 8000;
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

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let index = 0; index < rawData.length; index += 1) {
    outputArray[index] = rawData.charCodeAt(index);
  }

  return outputArray;
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
  const [pushState, setPushState] = useState<PushState>("idle");
  const [pushStatusText, setPushStatusText] = useState("Enable push alerts for closed-browser and phone notifications.");
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

    const masterGain = context.createGain();
    masterGain.gain.setValueAtTime(0.0001, context.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.22, context.currentTime + 0.03);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 1.1);
    masterGain.connect(context.destination);

    const noteStarts = [0, 0.18];
    const noteFrequencies = [1046.5, 1318.5];

    noteFrequencies.forEach((frequency, index) => {
      const startAt = context.currentTime + noteStarts[index];
      const endAt = startAt + 0.62;
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(frequency, startAt);
      oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.996, endAt);

      gainNode.gain.setValueAtTime(0.0001, startAt);
      gainNode.gain.exponentialRampToValueAtTime(0.16, startAt + 0.03);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, endAt);

      oscillator.connect(gainNode);
      gainNode.connect(masterGain);
      oscillator.start(startAt);
      oscillator.stop(endAt);
    });
  }

  async function showBrowserNotification(message: AdminAlertMessage, count: number) {
    if (typeof window === "undefined" || !("Notification" in window) || Notification.permission !== "granted") {
      return;
    }

    const notification = new Notification(count > 1 ? `${count} new contact messages` : "New contact message", {
      body: `${message.name} just sent a new message.`,
      tag: "admin-contact-message-inline",
    });

    window.setTimeout(() => notification.close(), 7000);
  }

  async function syncExistingPushSubscription() {
    if (typeof window === "undefined" || !("serviceWorker" in navigator) || !("PushManager" in window)) {
      setPushState("unsupported");
      setPushStatusText("This browser does not support push notifications.");
      return;
    }

    const keyResponse = await fetch("/api/admin/push", { cache: "no-store" });

    if (!keyResponse.ok) {
      return;
    }

    const keyData = (await keyResponse.json()) as { publicKey?: string | null };

    if (!keyData.publicKey) {
      setPushState("missing-config");
      setPushStatusText("Push notifications are not configured on the server yet.");
      return;
    }

    const registration = await navigator.serviceWorker.register("/admin-push-sw.js");
    const existingSubscription = await registration.pushManager.getSubscription();

    if (existingSubscription) {
      setPushState("subscribed");
      setPushStatusText("Push alerts are active, including when the browser is closed and on supported phones.");
      return;
    }

    setPushStatusText("Enable push alerts for closed-browser and phone notifications.");
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void syncExistingPushSubscription();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

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
          window.dispatchEvent(new CustomEvent("admin-messages-updated"));

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

  const enablePushAlerts = async () => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) {
      setPushState("unsupported");
      setPushStatusText("This browser does not support push notifications.");
      return;
    }

    const nextPermission = await Notification.requestPermission();
    setPermission(nextPermission);

    if (nextPermission !== "granted") {
      setPushState("blocked");
      setPushStatusText("Browser notifications are blocked. Allow notifications to receive closed-browser alerts.");
      return;
    }

    const keyResponse = await fetch("/api/admin/push", { cache: "no-store" });

    if (!keyResponse.ok) {
      setPushStatusText("Could not load push notification settings.");
      return;
    }

    const keyData = (await keyResponse.json()) as { publicKey?: string | null };

    if (!keyData.publicKey) {
      setPushState("missing-config");
      setPushStatusText("Push notifications are not configured on the server yet.");
      return;
    }

    const registration = await navigator.serviceWorker.register("/admin-push-sw.js");
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(keyData.publicKey),
      });
    }

    const saveResponse = await fetch("/api/admin/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subscription: subscription.toJSON(),
        userAgent: navigator.userAgent,
      }),
    });

    if (!saveResponse.ok) {
      setPushStatusText("Push subscription could not be saved.");
      return;
    }

    setPushState("subscribed");
    setPushStatusText("Push alerts are active, including when the browser is closed and on supported phones.");

    try {
      await playAlertSound();
    } catch {
      // Sound is only a nice confirmation here.
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
              {freshCount > 0 ? `${freshCount} new contact ${freshCount === 1 ? "message has" : "messages have"} arrived.` : "Admin alerts are watching and auto-refreshing for new contact form messages."}
            </p>
            <p className="theme-text-muted mt-2 text-sm leading-7 sm:text-base">
              {lastMessage
                ? `Latest message from ${lastMessage.name} at ${formatTime(lastMessage.createdAt)}. ${unreadCount} unread total.`
                : "No contact messages have arrived yet."}
            </p>
            <p className="theme-text-faint mt-2 text-sm leading-7">
              {pushStatusText}
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
            onClick={() => void enablePushAlerts()}
            className="interactive-button rounded-full bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-black"
          >
            {pushState === "subscribed"
              ? "Push alerts on"
              : pushState === "missing-config"
                ? "Push not configured"
                : permission === "denied" || pushState === "blocked"
                  ? "Notifications blocked"
                  : pushState === "unsupported"
                    ? "Push unsupported"
                    : "Enable push alerts"}
          </button>
        </div>
      </div>
    </div>
  );
}
