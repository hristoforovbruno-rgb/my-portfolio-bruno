import webpush from "web-push";
import { connectToDatabase } from "@/lib/mongodb";
import AdminPushSubscription from "@/models/AdminPushSubscription";

type StoredPushSubscription = {
  endpoint: string;
  expirationTime?: number | null;
  keys?: {
    p256dh?: string;
    auth?: string;
  };
};

let vapidConfigured = false;

function getPushConfig() {
  const publicKey = process.env.WEB_PUSH_PUBLIC_KEY?.trim() || "";
  const privateKey = process.env.WEB_PUSH_PRIVATE_KEY?.trim() || "";
  const contactEmail = process.env.CONTACT_OWNER_EMAIL?.trim() || process.env.ADMIN_EMAIL?.trim() || "contact@brunodev.ee";

  return {
    publicKey,
    privateKey,
    contactEmail,
    enabled: Boolean(publicKey && privateKey),
  };
}

function ensureWebPushConfigured() {
  const config = getPushConfig();

  if (!config.enabled || vapidConfigured) {
    return config;
  }

  webpush.setVapidDetails(`mailto:${config.contactEmail}`, config.publicKey, config.privateKey);
  vapidConfigured = true;

  return config;
}

export function getWebPushPublicKey() {
  const config = getPushConfig();
  return config.enabled ? config.publicKey : null;
}

export async function saveAdminPushSubscription(subscription: StoredPushSubscription, userAgent = "") {
  if (!subscription.endpoint || !subscription.keys?.p256dh || !subscription.keys?.auth) {
    throw new Error("Invalid push subscription.");
  }

  await connectToDatabase();

  await AdminPushSubscription.findOneAndUpdate(
    { endpoint: subscription.endpoint },
    {
      endpoint: subscription.endpoint,
      expirationTime: subscription.expirationTime ?? null,
      keys: {
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      },
      userAgent,
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    },
  );
}

export async function removeAdminPushSubscription(endpoint: string) {
  if (!endpoint) {
    return;
  }

  await connectToDatabase();
  await AdminPushSubscription.deleteOne({ endpoint });
}

export async function sendAdminContactPushNotification({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const config = ensureWebPushConfigured();

  if (!config.enabled) {
    return;
  }

  await connectToDatabase();
  const subscriptions = await AdminPushSubscription.find();

  if (!subscriptions.length) {
    return;
  }

  const payload = JSON.stringify({
    title: "New contact message",
    body: `${name} (${email}) sent: ${message.slice(0, 120)}${message.length > 120 ? "..." : ""}`,
    url: "/admin/messages",
  });

  await Promise.all(
    subscriptions.map(async (subscription) => {
      if (!subscription.keys?.p256dh || !subscription.keys?.auth) {
        await AdminPushSubscription.deleteOne({ endpoint: subscription.endpoint });
        return;
      }

      try {
        await webpush.sendNotification(
          {
            endpoint: subscription.endpoint,
            expirationTime: subscription.expirationTime ?? null,
            keys: {
              p256dh: subscription.keys.p256dh,
              auth: subscription.keys.auth,
            },
          },
          payload,
        );
      } catch (error) {
        const statusCode = typeof error === "object" && error !== null && "statusCode" in error
          ? Number((error as { statusCode?: number }).statusCode)
          : 0;

        if (statusCode === 404 || statusCode === 410) {
          await AdminPushSubscription.deleteOne({ endpoint: subscription.endpoint });
          return;
        }

        console.warn("Push notification failed", error);
      }
    }),
  );
}
