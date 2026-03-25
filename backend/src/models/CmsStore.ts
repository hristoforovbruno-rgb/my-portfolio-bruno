import mongoose from "mongoose";

const localizedStringSchema = new mongoose.Schema(
  {
    en: { type: String, required: true, trim: true },
    et: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const cmsContentSchema = new mongoose.Schema(
  {
    homeHeroEyebrow: { type: String, required: true, trim: true },
    homeHeroTitle: { type: String, required: true, trim: true },
    homeHeroDescription: { type: String, required: true, trim: true },
    homePrimaryCta: { type: String, required: true, trim: true },
    homeSecondaryCta: { type: String, required: true, trim: true },
    ctaEyebrow: { type: String, required: true, trim: true },
    ctaTitle: { type: String, required: true, trim: true },
    ctaDescription: { type: String, required: true, trim: true },
    ctaButton: { type: String, required: true, trim: true },
    footerTitle: { type: String, required: true, trim: true },
    footerText: { type: String, required: true, trim: true },
    contactPhone: { type: String, required: true, trim: true },
    contactLocation: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const postSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true, trim: true },
    body: [{ type: String, required: true, trim: true }],
  },
  { _id: false },
);

const postSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    slug: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    publishedAt: { type: String, required: true, trim: true },
    readingTime: { type: String, required: true, trim: true },
    status: { type: String, enum: ["draft", "published"], required: true },
    sections: { type: [postSectionSchema], required: true, default: [] },
    coverImage: { type: String, required: true, trim: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  { _id: false },
);

const servicePageSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    slug: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    keyword: { type: String, required: true, trim: true },
    eyebrow: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    intro: { type: String, required: true, trim: true },
    pain: { type: String, required: true, trim: true },
    solution: { type: String, required: true, trim: true },
    outcomes: [{ type: String, required: true, trim: true }],
    bestFor: [{ type: String, required: true, trim: true }],
    deliverables: [{ type: String, required: true, trim: true }],
    process: [{ type: String, required: true, trim: true }],
    priceNote: { type: String, required: true, trim: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  { _id: false },
);

const mediaItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    altText: { type: String, required: true, trim: true },
    type: { type: String, enum: ["image", "logo", "document", "other"], required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  { _id: false },
);

const seoPageSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    path: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    keywords: [{ type: String, required: true, trim: true }],
    ogImage: { type: String, required: true, trim: true },
    canonicalPath: { type: String, required: true, trim: true },
    updatedAt: { type: String, required: true },
  },
  { _id: false },
);

const activityLogSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    action: { type: String, required: true, trim: true },
    entityType: { type: String, required: true, trim: true },
    entityId: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    createdAt: { type: String, required: true },
  },
  { _id: false },
);

const cmsStoreSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    content: {
      en: { type: cmsContentSchema, required: true },
      et: { type: cmsContentSchema, required: true },
    },
    formSettings: {
      enabled: { type: Boolean, required: true, default: true },
      successMessage: { type: localizedStringSchema, required: true },
      destinationEmail: { type: String, required: true, trim: true },
      autoReplyEnabled: { type: Boolean, required: true, default: true },
      captchaReady: { type: Boolean, required: true, default: false },
    },
    posts: { type: [postSchema], required: true, default: [] },
    servicePages: { type: [servicePageSchema], required: true, default: [] },
    mediaItems: { type: [mediaItemSchema], required: true, default: [] },
    seoPages: { type: [seoPageSchema], required: true, default: [] },
    activityLogs: { type: [activityLogSchema], required: true, default: [] },
  },
  { timestamps: true },
);

export const CmsStore = mongoose.models.CmsStore || mongoose.model("CmsStore", cmsStoreSchema);
