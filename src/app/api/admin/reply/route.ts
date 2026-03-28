import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { renderCustomerEmailTemplate } from "@/lib/customer-email-template";
import { connectToDatabase } from "@/lib/mongodb";
import { getSiteContent } from "@/lib/site-content";
import Message from "@/models/Message";

const RESEND_API_URL = "https://api.resend.com/emails";
const OWNER_NAME = "Bruno Hristoforov";

type ReplyBody = {
  messageId?: string;
  replyText?: string;
};

function getReplyEmailConfig() {
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim() || process.env.RESEND_FROM_EMAIL?.trim();
  const ownerEmail = process.env.CONTACT_OWNER_EMAIL?.trim() || process.env.CONTACT_NOTIFICATION_EMAIL?.trim() || getSiteContent("en").contact.email;

  return {
    resendApiKey,
    fromEmail,
    ownerEmail,
  };
}

async function sendReplyEmail({
  apiKey,
  from,
  to,
  subject,
  replyText,
}: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  replyText: string;
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
      html: renderCustomerEmailTemplate({
        eyebrow: `Reply from ${OWNER_NAME}`,
        title: "Thanks for reaching out",
        intro: "Here is my reply to your message.",
        body: replyText,
        ctaLabel: "Visit website",
        ctaHref: "https://brunodev.ee",
        signature: `Best regards,\n${OWNER_NAME}`,
        footerText: "You are receiving this because you contacted Bruno Hristoforov through the website contact form.",
      }),
      text: replyText,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Email send failed: ${response.status} ${details}`);
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { messageId, replyText } = (await request.json()) as ReplyBody;

  if (!messageId || !replyText?.trim()) {
    return NextResponse.json({ error: "messageId and replyText are required" }, { status: 400 });
  }

  const { resendApiKey, fromEmail, ownerEmail } = getReplyEmailConfig();

  if (!resendApiKey || !fromEmail) {
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  await connectToDatabase();

  const existingMessage = await Message.findById(messageId);

  if (!existingMessage) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }

  await sendReplyEmail({
    apiKey: resendApiKey,
    from: fromEmail,
    to: existingMessage.email,
    subject: `Re: Your message to ${OWNER_NAME}`,
    replyText: replyText.trim(),
  });

  const repliedAt = new Date();

  await Message.findByIdAndUpdate(messageId, {
    repliedAt,
  });

  return NextResponse.json({
    success: true,
    repliedAt: repliedAt.toISOString(),
    ownerEmail,
  });
}
