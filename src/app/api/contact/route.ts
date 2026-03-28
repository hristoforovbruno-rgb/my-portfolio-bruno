import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getSiteContent } from "@/lib/site-content";
import Message from "@/models/Message";

const RESEND_API_URL = "https://api.resend.com/emails";

type ContactPayload = {
  name?: string;
  business?: string;
  email?: string;
  message?: string;
  preferredLocale?: "en" | "et";
  locale?: "en" | "et";
};

function detectLanguage(message: string) {
  const normalized = message.toLowerCase();
  const estonianSignals = [
    "tere",
    "aitah",
    "palun",
    "voi",
    "kusimus",
    "soovin",
    "veebileht",
    "hinnapakkumine",
    "projekt",
    "tere!",
    "\u00f5",
    "\u00e4",
    "\u00f6",
    "\u00fc",
  ];

  return estonianSignals.some((signal) => normalized.includes(signal)) ? "et" : "en";
}

function looksLikeSpam(message: string) {
  const normalized = message.toLowerCase();
  const spamSignals = ["http://", "https://", "bit.ly", "telegram", "whatsapp", "casino", "crypto", "seo expert"];
  const matches = spamSignals.filter((signal) => normalized.includes(signal)).length;

  return normalized.trim().length === 0 || matches >= 2;
}

async function sendEmail({
  apiKey,
  from,
  to,
  subject,
  text,
  html,
  replyTo,
}: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}) {
  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      ...(html ? { html } : {}),
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Email send failed: ${response.status} ${details}`);
  }
}

function getForwardedCopy(language: "en" | "et", isLowPriority: boolean) {
  if (language === "et") {
    return {
      subject: `${isLowPriority ? "[MADAL PRIORITEET] " : ""}Uus kontaktivormi s\u00f5num`,
      senderEmail: "Saatja e-post",
      timestamp: "Ajatempel",
      language: "Keel",
      priority: "Prioriteet",
      name: "Nimi",
      business: "Ettev\u00f5te",
      originalMessage: "Algne s\u00f5num",
      lowPriority: "madal prioriteet",
      normal: "tavaline",
      estonian: "Eesti",
      english: "Inglise",
      unknown: "Teadmata",
      notProvided: "Puudub",
      emptyMessage: "(t\u00fchi s\u00f5num)",
    };
  }

  return {
    subject: `${isLowPriority ? "[LOW PRIORITY] " : ""}New contact form message`,
    senderEmail: "Sender email",
    timestamp: "Timestamp",
    language: "Language",
    priority: "Priority",
    name: "Name",
    business: "Business",
    originalMessage: "Original message",
    lowPriority: "low priority",
    normal: "normal",
    estonian: "Estonian",
    english: "English",
    unknown: "Unknown",
    notProvided: "Not provided",
    emptyMessage: "(empty message)",
  };
}

function getAutoReplyCopy(language: "en" | "et") {
  if (language === "et") {
    return {
      subject: "Sain sinu s\u00f5numi k\u00e4tte",
      greeting: "Tere",
      intro: "Ait\u00e4h, et v\u00f5tsid \u00fchendust. Sain sinu s\u00f5numi k\u00e4tte ja vastan tavaliselt 24 tunni jooksul.",
      summaryTitle: "Sinu saadetud s\u00f5num",
      signoff: "Parimate soovidega",
      fallbackName: "s\u00f5ber",
    };
  }

  return {
    subject: "I received your message",
    greeting: "Hi",
    intro: "Thanks for reaching out. I received your message and usually reply within 24 hours.",
    summaryTitle: "Your message",
    signoff: "Best regards",
    fallbackName: "there",
  };
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const name = payload.name?.trim() || "Unknown";
    const business = payload.business?.trim() || "";
    const email = payload.email?.trim() || "";
    const message = payload.message?.trim() || "";
    const preferredLocale = payload.preferredLocale ?? payload.locale;

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    const ownerEmail = process.env.CONTACT_OWNER_EMAIL || getSiteContent("en").contact.email;

    if (!resendApiKey || !fromEmail) {
      return NextResponse.json(
        { error: "Email service is not configured. Set RESEND_API_KEY and CONTACT_FROM_EMAIL in .env.local." },
        { status: 500 },
      );
    }

    const timestamp = new Date().toISOString();
    const language = preferredLocale === "en" || preferredLocale === "et" ? preferredLocale : detectLanguage(message);
    const isLowPriority = looksLikeSpam(message);
    const forwardedCopy = getForwardedCopy(language, isLowPriority);
    const ownerSubject = `${forwardedCopy.subject} - ${name}`;
    const ownerBody = [
      `${forwardedCopy.senderEmail}: ${email}`,
      `${forwardedCopy.timestamp}: ${timestamp}`,
      `${forwardedCopy.language}: ${language === "et" ? forwardedCopy.estonian : forwardedCopy.english}`,
      `${forwardedCopy.priority}: ${isLowPriority ? forwardedCopy.lowPriority : forwardedCopy.normal}`,
      `${forwardedCopy.name}: ${name || forwardedCopy.unknown}`,
      `${forwardedCopy.business}: ${business || forwardedCopy.notProvided}`,
      "",
      `${forwardedCopy.originalMessage}:`,
      message || forwardedCopy.emptyMessage,
    ].join("\n");

    await sendEmail({
      apiKey: resendApiKey,
      from: fromEmail,
      to: ownerEmail,
      subject: ownerSubject,
      text: ownerBody,
      replyTo: email,
    });

    const autoReplyCopy = getAutoReplyCopy(language);
    const displayName = name === "Unknown" ? autoReplyCopy.fallbackName : name;
    const autoReplyText = [
      `${autoReplyCopy.greeting} ${displayName},`,
      "",
      autoReplyCopy.intro,
      "",
      `${autoReplyCopy.summaryTitle}:`,
      message || forwardedCopy.emptyMessage,
      "",
      `${autoReplyCopy.signoff},`,
      "Bruno Hristoforov",
    ].join("\n");

    await sendEmail({
      apiKey: resendApiKey,
      from: fromEmail,
      to: email,
      subject: autoReplyCopy.subject,
      text: autoReplyText,
    });

    await connectToDatabase();
    await Message.create({
      name,
      email,
      message,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact route failed", error);
    const details = error instanceof Error ? error.message : "Failed to send message.";
    return NextResponse.json({ error: details }, { status: 500 });
  }
}
