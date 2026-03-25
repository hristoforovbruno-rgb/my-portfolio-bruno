import { z } from "zod";

export const createContactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional().or(z.literal("")),
  message: z.string().min(10).max(5000),
  locale: z.enum(["en", "et"]).optional().default("en"),
});

export const updateContactSchema = z.object({
  isRead: z.boolean(),
});

export const contactQuerySchema = z.object({
  q: z.string().optional(),
  status: z.enum(["all", "read", "unread"]).default("all"),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});
