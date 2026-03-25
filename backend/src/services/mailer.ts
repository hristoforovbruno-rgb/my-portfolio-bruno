import { env } from "../config/env.js";

const RESEND_API_URL = "https://api.resend.com/emails";

async function sendEmail(input: {
  to: string[];
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Website Contact <${env.RESEND_FROM_EMAIL}>`,
      to: input.to,
      subject: input.subject,
      text: input.text,
      reply_to: input.replyTo,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Failed to send email: ${body}`);
  }
}

export async function notifyNewContact({
  name,
  email,
  phone,
  message,
  locale,
  destinationEmail,
  autoReplyEnabled,
}: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  locale: "en" | "et";
  destinationEmail: string;
  autoReplyEnabled: boolean;
}) {
  if (!env.RESEND_API_KEY || !destinationEmail) {
    return;
  }

  await sendEmail({
    to: [destinationEmail],
    subject: `New website contact from ${name}`,
    text: `You received a new website message.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\n\nMessage:\n${message}`,
    replyTo: email,
  });

  if (!autoReplyEnabled) {
    return;
  }

  const autoReplyText =
    locale === "et"
      ? "Aitah sinu sonumi eest. Sain selle katte ja vastan sulle 24 tunni jooksul.\n\nParimate soovidega,\nBruno"
      : "Thanks for your message. I received it and I will respond within 24 hours.\n\nBest regards,\nBruno";

  await sendEmail({
    to: [email],
    subject: locale === "et" ? "Sain sinu sonumi katte" : "I received your message",
    text: autoReplyText,
  });
}
