import { NextResponse } from "next/server";
import { getSiteContent } from "@/lib/site-content";

const RESEND_API_URL = "https://api.resend.com/emails";

type ContactPayload = {
  name?: string;
  business?: string;
  email?: string;
  message?: string;
  preferredLocale?: "en" | "et";
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
  replyTo,
}: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  text: string;
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
      subject: `${isLowPriority ? "[MADAL PRIORITEET] " : ""}Uus kontaktivormi sõnum`,
      senderEmail: "Saatja e-post",
      timestamp: "Ajatempel",
      language: "Keel",
      priority: "Prioriteet",
      name: "Nimi",
      business: "Ettevõte",
      originalMessage: "Algne sõnum",
      lowPriority: "madal prioriteet",
      normal: "tavaline",
      estonian: "Eesti",
      english: "Inglise",
      unknown: "Teadmata",
      notProvided: "Puudub",
      emptyMessage: "(tühi sõnum)",
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

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const name = payload.name?.trim() || "Unknown";
    const business = payload.business?.trim() || "";
    const email = payload.email?.trim() || "";
    const message = payload.message?.trim() || "";
    const preferredLocale = payload.preferredLocale;

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

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact route failed", error);
    const details = error instanceof Error ? error.message : "Failed to send message.";
    return NextResponse.json({ error: details }, { status: 500 });
  }
}
