import type { Request, Response } from "express";
import { env } from "../config/env.js";
import { getFormSettings, createActivityLog } from "../store/cms-store.js";
import { bulkDeleteMessages, bulkUpdateMessages, exportMessagesCsv } from "../store/data-store.js";
import { notifyNewContact } from "../services/mailer.js";
import { createMessage, deleteMessage, listMessages, updateMessage } from "../store/data-store.js";
import { bulkMessageSchema } from "../validation/admin-cms.validation.js";
import { contactQuerySchema, createContactSchema, updateContactSchema } from "../validation/contact.validation.js";

export async function createContactController(request: Request, response: Response) {
  const parsed = createContactSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({ error: "Invalid contact payload.", details: parsed.error.flatten() });
    return;
  }

  const formSettings = await getFormSettings();

  if (!formSettings.enabled) {
    response.status(503).json({ error: "Contact form is currently disabled." });
    return;
  }

  const message = await createMessage({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || "",
    message: parsed.data.message,
  });

  try {
    await notifyNewContact({
      ...parsed.data,
      destinationEmail: formSettings.destinationEmail || env.CONTACT_NOTIFICATION_EMAIL || "",
      autoReplyEnabled: formSettings.autoReplyEnabled,
    });
  } catch (error) {
    console.error("Contact notification failed", error);
  }

  response.status(201).json({ ok: true, id: message.id, successMessage: formSettings.successMessage });
}

export async function listContactsController(request: Request, response: Response) {
  const parsed = contactQuerySchema.safeParse(request.query);

  if (!parsed.success) {
    response.status(400).json({ error: "Invalid query parameters.", details: parsed.error.flatten() });
    return;
  }

  const { q, status, page, limit } = parsed.data;
  const { items, total } = await listMessages({ q, status, page, limit });

  response.json({
    items,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function updateContactController(request: Request, response: Response) {
  const parsed = updateContactSchema.safeParse(request.body);
  const messageId = Array.isArray(request.params.id) ? request.params.id[0] : request.params.id;

  if (!parsed.success) {
    response.status(400).json({ error: "Invalid update payload.", details: parsed.error.flatten() });
    return;
  }

  const message = await updateMessage(messageId, { isRead: parsed.data.isRead });

  if (!message) {
    response.status(404).json({ error: "Message not found." });
    return;
  }

  response.json(message);
}

export async function deleteContactController(request: Request, response: Response) {
  const messageId = Array.isArray(request.params.id) ? request.params.id[0] : request.params.id;
  const deleted = await deleteMessage(messageId);

  if (!deleted) {
    response.status(404).json({ error: "Message not found." });
    return;
  }

  response.status(204).send();
}

export async function bulkContactActionController(request: Request, response: Response) {
  const parsed = bulkMessageSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({ error: "Invalid bulk message payload.", details: parsed.error.flatten() });
    return;
  }

  const { ids, action } = parsed.data;

  if (action === "delete") {
    const deleted = await bulkDeleteMessages(ids);
    await createActivityLog({
      action: "bulk-delete",
      entityType: "message",
      description: `Deleted ${deleted} messages.`,
    });
    response.json({ ok: true, affected: deleted });
    return;
  }

  const isRead = action === "read";
  const affected = await bulkUpdateMessages(ids, isRead);
  await createActivityLog({
    action: "bulk-update",
    entityType: "message",
    description: `Updated ${affected} messages to ${isRead ? "read" : "unread"}.`,
  });
  response.json({ ok: true, affected });
}

export async function exportContactsController(_request: Request, response: Response) {
  const csv = await exportMessagesCsv();
  response.setHeader("Content-Type", "text/csv; charset=utf-8");
  response.setHeader("Content-Disposition", "attachment; filename=contact-messages.csv");
  response.send(csv);
}
