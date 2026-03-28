import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/mongodb";
import { getSiteContent } from "@/lib/site-content";
import Message from "@/models/Message";

const RESEND_API_URL = "https://api.resend.com/emails";
const OWNER_NAME = "Bruno Hristoforov";

type ReplyBody = {
  messageId?: string;
  replyText?: string;
};

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
      html: `
        <div style="font-family: Georgia, serif; color: #f5f1e6; background: #090909; padding: 32px;">
          <div style="max-width: 640px; margin: 0 auto; border: 1px solid rgba(212, 175, 55, 0.24); border-radius: 24px; padding: 32px; background: linear-gradient(180deg, #171717, #0d0d0d);">
            <p style="margin: 0 0 16px; color: #f0d985; font-size: 12px; letter-spacing: 0.24em; text-transform: uppercase;">Reply from ${OWNER_NAME}</p>
            <div style="font-family: 'Courier New', monospace; white-space: pre-wrap; line-height: 1.7; color: #f5f1e6;">${replyText
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/\n/g, "<br />")}</div>
            <p style="margin: 24px 0 0; color: rgba(245, 241, 230, 0.74);">Best regards,<br />${OWNER_NAME}</p>
          </div>
        </div>
      `,
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

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const ownerEmail = process.env.CONTACT_OWNER_EMAIL || getSiteContent("en").contact.email;

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
