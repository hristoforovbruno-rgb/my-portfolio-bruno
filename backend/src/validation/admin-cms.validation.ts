import { z } from "zod";

const localizedStringSchema = z.object({
  en: z.string().min(1),
  et: z.string().min(1),
});

export const bulkMessageSchema = z.object({
  ids: z.array(z.string().min(1)).min(1),
  action: z.enum(["read", "unread", "delete"]),
});

export const updateContentSchema = z.object({
  en: z.object({
    homeHeroEyebrow: z.string().min(1).max(120),
    homeHeroTitle: z.string().min(1).max(200),
    homeHeroDescription: z.string().min(1).max(500),
    homePrimaryCta: z.string().min(1).max(80),
    homeSecondaryCta: z.string().min(1).max(80),
    ctaEyebrow: z.string().min(1).max(80),
    ctaTitle: z.string().min(1).max(220),
    ctaDescription: z.string().min(1).max(500),
    ctaButton: z.string().min(1).max(100),
    footerTitle: z.string().min(1).max(220),
    footerText: z.string().min(1).max(500),
    contactPhone: z.string().min(1).max(80),
    contactLocation: z.string().min(1).max(120),
  }),
  et: z.object({
    homeHeroEyebrow: z.string().min(1).max(120),
    homeHeroTitle: z.string().min(1).max(200),
    homeHeroDescription: z.string().min(1).max(500),
    homePrimaryCta: z.string().min(1).max(80),
    homeSecondaryCta: z.string().min(1).max(80),
    ctaEyebrow: z.string().min(1).max(80),
    ctaTitle: z.string().min(1).max(220),
    ctaDescription: z.string().min(1).max(500),
    ctaButton: z.string().min(1).max(100),
    footerTitle: z.string().min(1).max(220),
    footerText: z.string().min(1).max(500),
    contactPhone: z.string().min(1).max(80),
    contactLocation: z.string().min(1).max(120),
  }),
});

export const updateFormSettingsSchema = z.object({
  enabled: z.boolean(),
  successMessage: localizedStringSchema,
  destinationEmail: z.string().email(),
  autoReplyEnabled: z.boolean(),
  captchaReady: z.boolean(),
});

const sectionSchema = z.object({
  heading: z.string().min(1).max(160),
  body: z.array(z.string().min(1).max(1000)).min(1),
});

export const postSchema = z.object({
  slug: z.string().min(1).max(160),
  category: z.string().min(1).max(80),
  title: z.string().min(1).max(200),
  excerpt: z.string().min(1).max(300),
  description: z.string().min(1).max(400),
  publishedAt: z.string().min(1).max(80),
  readingTime: z.string().min(1).max(40),
  status: z.enum(["draft", "published"]),
  sections: z.array(sectionSchema).min(1),
  coverImage: z.string().max(500),
});

export const servicePageSchema = z.object({
  slug: z.string().min(1).max(160),
  title: z.string().min(1).max(160),
  keyword: z.string().min(1).max(160),
  eyebrow: z.string().min(1).max(80),
  summary: z.string().min(1).max(300),
  intro: z.string().min(1).max(500),
  pain: z.string().min(1).max(400),
  solution: z.string().min(1).max(500),
  outcomes: z.array(z.string().min(1).max(120)).min(1),
  bestFor: z.array(z.string().min(1).max(180)).min(1),
  deliverables: z.array(z.string().min(1).max(180)).min(1),
  process: z.array(z.string().min(1).max(180)).min(1),
  priceNote: z.string().min(1).max(240),
});

export const mediaItemSchema = z.object({
  title: z.string().min(1).max(120),
  url: z.string().url(),
  altText: z.string().min(1).max(200),
  type: z.enum(["image", "logo", "document", "other"]),
});

export const seoPageSchema = z.object({
  id: z.string().optional(),
  path: z.string().min(1).max(200),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(400),
  keywords: z.array(z.string().min(1).max(80)),
  ogImage: z.string().max(500),
  canonicalPath: z.string().min(1).max(200),
});

export const updateAdminEmailSchema = z.object({
  email: z.string().email(),
});

export const updateAdminPasswordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
});
