import { Admin } from "../models/Admin.js";
import { ContactMessage } from "../models/ContactMessage.js";
import { SiteSettings } from "../models/SiteSettings.js";

export type StoredAdmin = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
};

export type StoredContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

export type StoredSiteSettings = {
  id: string;
  key: "default";
  publicEmail: string;
  contactPageText: {
    en: string;
    et: string;
  };
  starterPrice: string;
  advancedPrice: string;
  maintenancePrice: string;
  createdAt: string;
  updatedAt: string;
};

type StoreShape = {
  admins: StoredAdmin[];
  messages: StoredContactMessage[];
  settings: StoredSiteSettings | null;
};

function serializeAdmin(document: unknown) {
  if (!document) {
    return null;
  }

  return (document as { toJSON: () => StoredAdmin }).toJSON();
}

function serializeMessage(document: unknown) {
  if (!document) {
    return null;
  }

  return (document as { toJSON: () => StoredContactMessage }).toJSON();
}

function serializeSettings(document: unknown) {
  if (!document) {
    return null;
  }

  return (document as { toJSON: () => StoredSiteSettings }).toJSON();
}

export async function initializeStore() {
  return;
}

export async function getStoreSnapshot(): Promise<StoreShape> {
  const [admins, messages, settings] = await Promise.all([
    Admin.find().sort({ createdAt: 1 }),
    ContactMessage.find().sort({ createdAt: -1 }),
    SiteSettings.findOne({ key: "default" }),
  ]);

  return {
    admins: admins.map((admin) => serializeAdmin(admin)).filter(Boolean) as StoredAdmin[],
    messages: messages.map((message) => serializeMessage(message)).filter(Boolean) as StoredContactMessage[],
    settings: serializeSettings(settings),
  };
}

export async function replaceStoreSnapshot(nextStore: StoreShape) {
  await Promise.all([
    Admin.deleteMany({}),
    ContactMessage.deleteMany({}),
    SiteSettings.deleteMany({}),
  ]);

  if (nextStore.admins.length > 0) {
    await Admin.insertMany(
      nextStore.admins.map((admin) => ({
        email: admin.email.toLowerCase(),
        passwordHash: admin.passwordHash,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
      })),
    );
  }

  if (nextStore.messages.length > 0) {
    await ContactMessage.insertMany(
      nextStore.messages.map((message) => ({
        name: message.name,
        email: message.email.toLowerCase(),
        phone: message.phone,
        message: message.message,
        isRead: message.isRead,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
      })),
    );
  }

  if (nextStore.settings) {
    await SiteSettings.create({
      key: "default",
      publicEmail: nextStore.settings.publicEmail.toLowerCase(),
      contactPageText: nextStore.settings.contactPageText,
      starterPrice: nextStore.settings.starterPrice,
      advancedPrice: nextStore.settings.advancedPrice,
      maintenancePrice: nextStore.settings.maintenancePrice,
      createdAt: nextStore.settings.createdAt,
      updatedAt: nextStore.settings.updatedAt,
    });
  }

  return getStoreSnapshot();
}

export async function findAdminByEmail(email: string) {
  const admin = await Admin.findOne({ email: email.toLowerCase() });
  return serializeAdmin(admin);
}

export async function getPrimaryAdmin() {
  const admin = await Admin.findOne().sort({ createdAt: 1 });
  return serializeAdmin(admin);
}

export async function createAdmin(input: { email: string; passwordHash: string }) {
  const admin = await Admin.create({
    email: input.email.toLowerCase(),
    passwordHash: input.passwordHash,
  });

  return serializeAdmin(admin)!;
}

export async function updatePrimaryAdminEmail(email: string) {
  const admin = await Admin.findOne().sort({ createdAt: 1 });

  if (!admin) {
    return null;
  }

  admin.email = email.toLowerCase();
  await admin.save();
  return serializeAdmin(admin);
}

export async function updatePrimaryAdminPassword(passwordHash: string) {
  const admin = await Admin.findOne().sort({ createdAt: 1 });

  if (!admin) {
    return null;
  }

  admin.passwordHash = passwordHash;
  await admin.save();
  return serializeAdmin(admin);
}

export async function getSettings() {
  const settings = await SiteSettings.findOne({ key: "default" });
  return serializeSettings(settings);
}

export async function upsertSettings(input: {
  publicEmail: string;
  contactPageText: {
    en: string;
    et: string;
  };
  starterPrice: string;
  advancedPrice: string;
  maintenancePrice: string;
}) {
  const settings = await SiteSettings.findOneAndUpdate(
    { key: "default" },
    {
      $set: {
        publicEmail: input.publicEmail.toLowerCase(),
        contactPageText: {
          en: input.contactPageText.en,
          et: input.contactPageText.et,
        },
        starterPrice: input.starterPrice,
        advancedPrice: input.advancedPrice,
        maintenancePrice: input.maintenancePrice,
      },
    },
    { new: true, upsert: true },
  );

  return serializeSettings(settings)!;
}

export async function createMessage(input: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const message = await ContactMessage.create({
    name: input.name,
    email: input.email.toLowerCase(),
    phone: input.phone,
    message: input.message,
  });

  return serializeMessage(message)!;
}

export async function listMessages(input: {
  q?: string;
  status: "all" | "read" | "unread";
  page: number;
  limit: number;
}) {
  const filters: Record<string, unknown> = {};
  const normalizedQuery = input.q?.trim();

  if (input.status === "read") {
    filters.isRead = true;
  } else if (input.status === "unread") {
    filters.isRead = false;
  }

  if (normalizedQuery) {
    filters.$or = [
      { name: { $regex: normalizedQuery, $options: "i" } },
      { email: { $regex: normalizedQuery, $options: "i" } },
      { phone: { $regex: normalizedQuery, $options: "i" } },
      { message: { $regex: normalizedQuery, $options: "i" } },
    ];
  }

  const [items, total] = await Promise.all([
    ContactMessage.find(filters)
      .sort({ createdAt: -1 })
      .skip((input.page - 1) * input.limit)
      .limit(input.limit),
    ContactMessage.countDocuments(filters),
  ]);

  return {
    items: items.map((message) => serializeMessage(message)).filter(Boolean) as StoredContactMessage[],
    total,
  };
}

export async function countMessages(input?: { isRead?: boolean; fromDate?: string }) {
  const filters: Record<string, unknown> = {};

  if (typeof input?.isRead === "boolean") {
    filters.isRead = input.isRead;
  }

  if (input?.fromDate) {
    filters.createdAt = { $gte: new Date(input.fromDate) };
  }

  return ContactMessage.countDocuments(filters);
}

export async function getRecentMessages(limit: number) {
  const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(limit);
  return messages.map((message) => serializeMessage(message)).filter(Boolean) as StoredContactMessage[];
}

export async function updateMessage(id: string, input: { isRead: boolean }) {
  const message = await ContactMessage.findByIdAndUpdate(id, { $set: { isRead: input.isRead } }, { new: true });
  return serializeMessage(message);
}

export async function deleteMessage(id: string) {
  const result = await ContactMessage.deleteOne({ _id: id });
  return result.deletedCount > 0;
}

export async function bulkUpdateMessages(ids: string[], isRead: boolean) {
  const result = await ContactMessage.updateMany({ _id: { $in: ids } }, { $set: { isRead } });
  return result.modifiedCount;
}

export async function bulkDeleteMessages(ids: string[]) {
  const result = await ContactMessage.deleteMany({ _id: { $in: ids } });
  return result.deletedCount;
}

export async function exportMessagesCsv() {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  const header = ["id", "name", "email", "phone", "message", "isRead", "createdAt"];
  const rows = messages.map((messageDocument) => {
    const message = serializeMessage(messageDocument);

    if (!message) {
      return "";
    }

    return [message.id, message.name, message.email, message.phone, message.message, String(message.isRead), message.createdAt]
      .map((value) => `"${String(value).replaceAll("\"", "\"\"")}"`)
      .join(",");
  }).filter(Boolean);

  return [header.join(","), ...rows].join("\n");
}
