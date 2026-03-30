import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getWebPushPublicKey, removeAdminPushSubscription, saveAdminPushSubscription } from "@/lib/push-notifications";

type PushSubscriptionPayload = {
  endpoint?: string;
  expirationTime?: number | null;
  keys?: {
    p256dh?: string;
    auth?: string;
  };
};

async function requireAdminSession() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

export async function GET() {
  const unauthorized = await requireAdminSession();

  if (unauthorized) {
    return unauthorized;
  }

  return NextResponse.json({ publicKey: getWebPushPublicKey() });
}

export async function POST(request: Request) {
  const unauthorized = await requireAdminSession();

  if (unauthorized) {
    return unauthorized;
  }

  try {
    const body = (await request.json()) as {
      subscription?: PushSubscriptionPayload;
      userAgent?: string;
    };

    if (!getWebPushPublicKey()) {
      return NextResponse.json({ error: "Push notifications are not configured." }, { status: 503 });
    }

    await saveAdminPushSubscription(body.subscription || {}, body.userAgent || "");

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save push subscription.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const unauthorized = await requireAdminSession();

  if (unauthorized) {
    return unauthorized;
  }

  const body = (await request.json().catch(() => null)) as { endpoint?: string } | null;
  await removeAdminPushSubscription(body?.endpoint || "");

  return NextResponse.json({ ok: true });
}
