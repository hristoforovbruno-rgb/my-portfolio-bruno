import { randomUUID } from "node:crypto";
import { CmsStore } from "../models/CmsStore.js";

export type CmsContent = {
  homeHeroEyebrow: string;
  homeHeroTitle: string;
  homeHeroDescription: string;
  homePrimaryCta: string;
  homeSecondaryCta: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
  footerTitle: string;
  footerText: string;
  contactPhone: string;
  contactLocation: string;
};

export type CmsLocalizedContent = {
  en: CmsContent;
  et: CmsContent;
};

export type CmsFormSettings = {
  enabled: boolean;
  successMessage: {
    en: string;
    et: string;
  };
  destinationEmail: string;
  autoReplyEnabled: boolean;
  captchaReady: boolean;
};

export type CmsBlogPost = {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  status: "draft" | "published";
  sections: Array<{ heading: string; body: string[] }>;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
};

export type CmsServicePage = {
  id: string;
  slug: string;
  title: string;
  keyword: string;
  eyebrow: string;
  summary: string;
  intro: string;
  pain: string;
  solution: string;
  outcomes: string[];
  bestFor: string[];
  deliverables: string[];
  process: string[];
  priceNote: string;
  createdAt: string;
  updatedAt: string;
};

export type CmsMediaItem = {
  id: string;
  title: string;
  url: string;
  altText: string;
  type: "image" | "logo" | "document" | "other";
  createdAt: string;
  updatedAt: string;
};

export type CmsSeoPage = {
  id: string;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonicalPath: string;
  updatedAt: string;
};

export type CmsActivityLog = {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  description: string;
  createdAt: string;
};

type CmsStoreShape = {
  content: CmsLocalizedContent;
  formSettings: CmsFormSettings;
  posts: CmsBlogPost[];
  servicePages: CmsServicePage[];
  mediaItems: CmsMediaItem[];
  seoPages: CmsSeoPage[];
  activityLogs: CmsActivityLog[];
};

function nowIso() {
  return new Date().toISOString();
}

function defaultContent(): CmsContent {
  return {
    homeHeroEyebrow: "Web Developer Tallinn",
    homeHeroTitle: "Fast business websites that look serious and convert.",
    homeHeroDescription:
      "I build websites for local businesses that need sharper trust, clearer messaging, and a stronger path to enquiries.",
    homePrimaryCta: "Get a Free Audit",
    homeSecondaryCta: "See Examples",
    ctaEyebrow: "Urgency",
    ctaTitle: "Every week you delay, more buyers leave your website and pay someone else.",
    ctaDescription: "Get a free website audit and see where your current site looks weak, slow, or unclear.",
    ctaButton: "Get a Free Website Audit",
    footerTitle: "Fast, persuasive websites for businesses that cannot afford to look slow or outdated.",
    footerText: "Built for local companies that need a better first impression, clearer trust, and more enquiries.",
    contactPhone: "+372 5863 0442",
    contactLocation: "Tallinn, Estonia",
  };
}

function defaultLocalizedContent(): CmsLocalizedContent {
  return {
    en: defaultContent(),
    et: {
      homeHeroEyebrow: "Veebiarendaja Tallinn",
      homeHeroTitle: "Kiired ariveebid, mis mojuvad tosiselt ja toovad rohkem paringuid.",
      homeHeroDescription:
        "Ehitan veebilehti kohalikele ettevotetele, kes vajavad rohkem usaldust, selgemat sonumit ja tugevamat teed paringuteni.",
      homePrimaryCta: "Kusi tasuta auditit",
      homeSecondaryCta: "Vaata naiteid",
      ctaEyebrow: "Kiireloomulisus",
      ctaTitle: "Iga nadal, mil viivitad, lahkub sinu veebilt rohkem ostjaid ja maksab kellelegi teisele.",
      ctaDescription: "Kusi tasuta veebiauditit ja vaata, kus sinu praegune leht mojub norgalt, aeglaselt voi ebaselgelt.",
      ctaButton: "Kusi tasuta veebiauditit",
      footerTitle: "Kiired ja veenvad veebilehed ettevotetele, kes ei saa endale lubada aeglast voi aegunud kuvandit.",
      footerText: "Loodud kohalikele ettevotetele, kes vajavad paremat esmamuljet, rohkem usaldust ja rohkem paringuid.",
      contactPhone: "+372 5863 0442",
      contactLocation: "Tallinn, Eesti",
    },
  };
}

function defaultFormSettings(): CmsFormSettings {
  return {
    enabled: true,
    successMessage: {
      en: "Thanks. Your message was sent and I will reply as soon as possible.",
      et: "Aitah. Sinu sonum on saadetud ja vastan esimesel voimalusel.",
    },
    destinationEmail: "hristoforovbruno@gmail.com",
    autoReplyEnabled: true,
    captchaReady: false,
  };
}

function normalizeLocalizedMessage(
  input: CmsFormSettings["successMessage"] | string | null | undefined,
  fallback: CmsFormSettings["successMessage"],
) {
  if (typeof input === "string") {
    return {
      en: input || fallback.en,
      et: fallback.et,
    };
  }

  return {
    en: input?.en || fallback.en,
    et: input?.et || fallback.et,
  };
}

function defaultPosts(): CmsBlogPost[] {
  const timestamp = nowIso();

  return [
    {
      id: randomUUID(),
      slug: "how-much-does-a-small-business-website-cost-in-estonia",
      category: "Pricing",
      title: "How much does a small business website cost in Estonia?",
      excerpt: "The real answer depends on scope, copy, SEO depth, and whether the site is built to sell or just exist.",
      description: "A practical breakdown of what drives small business website pricing in Estonia.",
      publishedAt: "March 22, 2026",
      readingTime: "4 min read",
      status: "published",
      sections: [
        {
          heading: "Most websites are priced by complexity.",
          body: [
            "A simple local business site costs far less than a site with multiple service pages, stronger messaging work, and deeper SEO structure.",
          ],
        },
      ],
      coverImage: "",
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    {
      id: randomUUID(),
      slug: "why-local-business-websites-lose-leads",
      category: "Conversion",
      title: "Why local business websites lose leads even when traffic is fine",
      excerpt: "Traffic alone does not help when trust signals, structure, and calls to action are weak.",
      description: "The most common reasons local business websites lose enquiries despite getting visitors.",
      publishedAt: "March 22, 2026",
      readingTime: "3 min read",
      status: "published",
      sections: [
        {
          heading: "The problem is often trust, not traffic.",
          body: ["Visitors still leave when the business looks outdated, unclear, or hard to contact."],
        },
      ],
      coverImage: "",
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  ];
}

function defaultServicePages(): CmsServicePage[] {
  const timestamp = nowIso();

  return [
    {
      id: randomUUID(),
      slug: "website-development",
      title: "Website Development",
      keyword: "fast business websites Estonia",
      eyebrow: "Service Detail",
      summary: "Fast business websites built to look credible, load quickly, and make action obvious.",
      intro: "This is for businesses that need a serious online presence instead of another generic brochure site.",
      pain: "Your current website loads slowly, looks outdated, and leaks potential customers every day.",
      solution: "I build modern websites that load fast, feel premium, and make it easier for people to trust you and take action.",
      outcomes: ["Faster first impression", "Stronger trust", "More calls and enquiries"],
      bestFor: ["Local businesses launching a new website", "Businesses with slow or outdated websites"],
      deliverables: ["Clear page structure", "Mobile-first frontend", "Baseline SEO setup"],
      process: ["Audit the site needs", "Map the structure", "Build the frontend", "Launch and QA"],
      priceNote: "Typical fit: Starter Website or Advanced Website depending on scope.",
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    {
      id: randomUUID(),
      slug: "seo-optimization",
      title: "SEO Optimization",
      keyword: "SEO websites Tallinn",
      eyebrow: "Service Detail",
      summary: "Sharper structure and local intent targeting that help the right buyers find you.",
      intro: "This is for businesses that already have a website but are not getting found enough by local buyers.",
      pain: "A beautiful website means nothing if your ideal customers never see it.",
      solution: "I improve page messaging, structure, and search visibility so your business gets found by people ready to buy.",
      outcomes: ["More local visibility", "Better quality traffic", "Higher-value leads"],
      bestFor: ["Businesses with weak local visibility", "Sites with weak targeting"],
      deliverables: ["On-page SEO cleanup", "Metadata improvements", "Internal linking recommendations"],
      process: ["Review current targeting", "Match offers to search intent", "Refine content and structure"],
      priceNote: "Typical fit: Advanced Website or Monthly Maintenance.",
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  ];
}

function defaultSeoPages(): CmsSeoPage[] {
  const timestamp = nowIso();

  return [
    {
      id: randomUUID(),
      path: "/",
      title: "Web Developer Tallinn Estonia | Fast Business Websites for Local Companies",
      description: "Fast, persuasive websites for businesses in Tallinn and across Estonia.",
      keywords: ["web developer Tallinn", "website developer Estonia", "small business website Estonia"],
      ogImage: "",
      canonicalPath: "/",
      updatedAt: timestamp,
    },
    {
      id: randomUUID(),
      path: "/services",
      title: "Web Development Services Tallinn Estonia | SEO, Redesigns, Maintenance",
      description: "Website development, SEO optimization, redesigns, and maintenance plans for businesses in Estonia.",
      keywords: ["SEO websites Tallinn", "website redesign Tallinn", "website maintenance Estonia"],
      ogImage: "",
      canonicalPath: "/services",
      updatedAt: timestamp,
    },
    {
      id: randomUUID(),
      path: "/pricing",
      title: "Website Pricing Estonia | Clear Packages for Local Businesses",
      description: "Website pricing for local businesses that need stronger trust and better enquiries.",
      keywords: ["website pricing Estonia", "small business website cost Tallinn"],
      ogImage: "",
      canonicalPath: "/pricing",
      updatedAt: timestamp,
    },
    {
      id: randomUUID(),
      path: "/insights",
      title: "Website Insights Estonia | Pricing, SEO, and Conversion Advice",
      description: "Short website insights for Estonia small businesses on pricing, SEO, conversion, and lead generation.",
      keywords: ["website tips Estonia", "local SEO insights Estonia"],
      ogImage: "",
      canonicalPath: "/insights",
      updatedAt: timestamp,
    },
  ];
}

function defaultStore(): CmsStoreShape {
  return {
    content: defaultLocalizedContent(),
    formSettings: defaultFormSettings(),
    posts: defaultPosts(),
    servicePages: defaultServicePages(),
    mediaItems: [],
    seoPages: defaultSeoPages(),
    activityLogs: [],
  };
}

function normalizeStore(input: Partial<CmsStoreShape> | null | undefined): CmsStoreShape {
  const defaults = defaultStore();
  const raw = input || {};

  return {
    content: {
      en: {
        ...defaults.content.en,
        ...((raw.content as CmsLocalizedContent | undefined)?.en || (raw.content as Partial<CmsContent> | undefined) || {}),
      },
      et: {
        ...defaults.content.et,
        ...((raw.content as CmsLocalizedContent | undefined)?.et || {}),
      },
    },
    formSettings: {
      ...defaults.formSettings,
      ...(raw.formSettings || {}),
      successMessage: normalizeLocalizedMessage(
        (raw.formSettings as Partial<CmsFormSettings> | { successMessage?: string } | undefined)?.successMessage,
        defaults.formSettings.successMessage,
      ),
    },
    posts: Array.isArray(raw.posts) && raw.posts.length > 0 ? raw.posts : defaults.posts,
    servicePages:
      Array.isArray(raw.servicePages) && raw.servicePages.length > 0 ? raw.servicePages : defaults.servicePages,
    mediaItems: Array.isArray(raw.mediaItems) ? raw.mediaItems : defaults.mediaItems,
    seoPages: Array.isArray(raw.seoPages) && raw.seoPages.length > 0 ? raw.seoPages : defaults.seoPages,
    activityLogs: Array.isArray(raw.activityLogs) ? raw.activityLogs : defaults.activityLogs,
  };
}

async function getStoreDocument() {
  let store = await CmsStore.findOne({ key: "default" });

  if (!store) {
    store = await CmsStore.create({
      key: "default",
      ...defaultStore(),
    });
  }

  return store;
}

async function readStore(): Promise<CmsStoreShape> {
  const store = await getStoreDocument();
  return normalizeStore(store.toObject());
}

async function writeStore(nextStore: CmsStoreShape) {
  const store = await getStoreDocument();
  store.set({
    content: nextStore.content,
    formSettings: nextStore.formSettings,
    posts: nextStore.posts,
    servicePages: nextStore.servicePages,
    mediaItems: nextStore.mediaItems,
    seoPages: nextStore.seoPages,
    activityLogs: nextStore.activityLogs,
  });
  await store.save();
  return normalizeStore(store.toObject());
}

function addActivityLog(
  store: CmsStoreShape,
  input: { action: string; entityType: string; entityId?: string; description: string },
) {
  store.activityLogs.unshift({
    id: randomUUID(),
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId || "",
    description: input.description,
    createdAt: nowIso(),
  });

  store.activityLogs = store.activityLogs.slice(0, 200);
}

export async function initializeCmsStore() {
  await getStoreDocument();
}

export async function listActivityLogs() {
  const store = await readStore();
  return store.activityLogs;
}

export async function getRecentActivity(limit: number) {
  const store = await readStore();
  return store.activityLogs.slice(0, limit);
}

export async function createActivityLog(input: {
  action: string;
  entityType: string;
  entityId?: string;
  description: string;
}) {
  const store = await readStore();
  addActivityLog(store, input);
  await writeStore(store);
}

export async function getContent() {
  const store = await readStore();
  return store.content;
}

export async function updateContent(input: Partial<CmsLocalizedContent>) {
  const store = await readStore();
  store.content = {
    en: { ...store.content.en, ...(input.en || {}) },
    et: { ...store.content.et, ...(input.et || {}) },
  };
  addActivityLog(store, {
    action: "update",
    entityType: "content",
    description: "Updated shared site content.",
  });
  await writeStore(store);
  return store.content;
}

export async function getFormSettings() {
  const store = await readStore();
  return store.formSettings;
}

export async function updateFormSettings(input: Partial<CmsFormSettings>) {
  const store = await readStore();
  store.formSettings = {
    ...store.formSettings,
    ...input,
    successMessage: normalizeLocalizedMessage(input.successMessage, store.formSettings.successMessage),
  };
  addActivityLog(store, {
    action: "update",
    entityType: "form",
    description: "Updated form settings.",
  });
  await writeStore(store);
  return store.formSettings;
}

export async function listPosts(input?: { includeDrafts?: boolean }) {
  const store = await readStore();
  return [...store.posts]
    .filter((post) => input?.includeDrafts || post.status === "published")
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

export async function getPostBySlug(slug: string) {
  const store = await readStore();
  return store.posts.find((post) => post.slug === slug) ?? null;
}

export async function createPost(input: Omit<CmsBlogPost, "id" | "createdAt" | "updatedAt">) {
  const store = await readStore();
  const timestamp = nowIso();
  const post: CmsBlogPost = {
    ...input,
    id: randomUUID(),
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  store.posts.unshift(post);
  addActivityLog(store, {
    action: "create",
    entityType: "post",
    entityId: post.id,
    description: `Created post ${post.title}.`,
  });
  await writeStore(store);
  return post;
}

export async function updatePost(id: string, input: Partial<Omit<CmsBlogPost, "id" | "createdAt" | "updatedAt">>) {
  const store = await readStore();
  const post = store.posts.find((entry) => entry.id === id);

  if (!post) {
    return null;
  }

  Object.assign(post, input, { updatedAt: nowIso() });
  addActivityLog(store, {
    action: "update",
    entityType: "post",
    entityId: post.id,
    description: `Updated post ${post.title}.`,
  });
  await writeStore(store);
  return post;
}

export async function deletePost(id: string) {
  const store = await readStore();
  const post = store.posts.find((entry) => entry.id === id);

  if (!post) {
    return false;
  }

  store.posts = store.posts.filter((entry) => entry.id !== id);
  addActivityLog(store, {
    action: "delete",
    entityType: "post",
    entityId: id,
    description: `Deleted post ${post.title}.`,
  });
  await writeStore(store);
  return true;
}

export async function listServicePages() {
  const store = await readStore();
  return [...store.servicePages].sort((left, right) => left.title.localeCompare(right.title));
}

export async function getServicePageBySlug(slug: string) {
  const store = await readStore();
  return store.servicePages.find((page) => page.slug === slug) ?? null;
}

export async function createServicePage(input: Omit<CmsServicePage, "id" | "createdAt" | "updatedAt">) {
  const store = await readStore();
  const timestamp = nowIso();
  const servicePage: CmsServicePage = {
    ...input,
    id: randomUUID(),
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  store.servicePages.push(servicePage);
  addActivityLog(store, {
    action: "create",
    entityType: "service",
    entityId: servicePage.id,
    description: `Created service page ${servicePage.title}.`,
  });
  await writeStore(store);
  return servicePage;
}

export async function updateServicePage(
  id: string,
  input: Partial<Omit<CmsServicePage, "id" | "createdAt" | "updatedAt">>,
) {
  const store = await readStore();
  const servicePage = store.servicePages.find((entry) => entry.id === id);

  if (!servicePage) {
    return null;
  }

  Object.assign(servicePage, input, { updatedAt: nowIso() });
  addActivityLog(store, {
    action: "update",
    entityType: "service",
    entityId: servicePage.id,
    description: `Updated service page ${servicePage.title}.`,
  });
  await writeStore(store);
  return servicePage;
}

export async function deleteServicePage(id: string) {
  const store = await readStore();
  const servicePage = store.servicePages.find((entry) => entry.id === id);

  if (!servicePage) {
    return false;
  }

  store.servicePages = store.servicePages.filter((entry) => entry.id !== id);
  addActivityLog(store, {
    action: "delete",
    entityType: "service",
    entityId: id,
    description: `Deleted service page ${servicePage.title}.`,
  });
  await writeStore(store);
  return true;
}

export async function listMediaItems() {
  const store = await readStore();
  return [...store.mediaItems].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

export async function createMediaItem(input: Omit<CmsMediaItem, "id" | "createdAt" | "updatedAt">) {
  const store = await readStore();
  const timestamp = nowIso();
  const mediaItem: CmsMediaItem = {
    ...input,
    id: randomUUID(),
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  store.mediaItems.unshift(mediaItem);
  addActivityLog(store, {
    action: "create",
    entityType: "media",
    entityId: mediaItem.id,
    description: `Added media item ${mediaItem.title}.`,
  });
  await writeStore(store);
  return mediaItem;
}

export async function updateMediaItem(id: string, input: Partial<Omit<CmsMediaItem, "id" | "createdAt" | "updatedAt">>) {
  const store = await readStore();
  const mediaItem = store.mediaItems.find((entry) => entry.id === id);

  if (!mediaItem) {
    return null;
  }

  Object.assign(mediaItem, input, { updatedAt: nowIso() });
  addActivityLog(store, {
    action: "update",
    entityType: "media",
    entityId: mediaItem.id,
    description: `Updated media item ${mediaItem.title}.`,
  });
  await writeStore(store);
  return mediaItem;
}

export async function deleteMediaItem(id: string) {
  const store = await readStore();
  const mediaItem = store.mediaItems.find((entry) => entry.id === id);

  if (!mediaItem) {
    return false;
  }

  store.mediaItems = store.mediaItems.filter((entry) => entry.id !== id);
  addActivityLog(store, {
    action: "delete",
    entityType: "media",
    entityId: id,
    description: `Deleted media item ${mediaItem.title}.`,
  });
  await writeStore(store);
  return true;
}

export async function listSeoPages() {
  const store = await readStore();
  return [...store.seoPages].sort((left, right) => left.path.localeCompare(right.path));
}

export async function getSeoPageByPath(pagePath: string) {
  const store = await readStore();
  return store.seoPages.find((entry) => entry.path === pagePath) ?? null;
}

export async function upsertSeoPage(input: Omit<CmsSeoPage, "id" | "updatedAt"> & { id?: string }) {
  const store = await readStore();
  const timestamp = nowIso();
  const existing = store.seoPages.find((entry) => entry.id === input.id || entry.path === input.path);

  if (existing) {
    existing.path = input.path;
    existing.title = input.title;
    existing.description = input.description;
    existing.keywords = input.keywords;
    existing.ogImage = input.ogImage;
    existing.canonicalPath = input.canonicalPath;
    existing.updatedAt = timestamp;
    addActivityLog(store, {
      action: "update",
      entityType: "seo",
      entityId: existing.id,
      description: `Updated SEO settings for ${existing.path}.`,
    });
    await writeStore(store);
    return existing;
  }

  const seoPage: CmsSeoPage = {
    ...input,
    id: randomUUID(),
    updatedAt: timestamp,
  };

  store.seoPages.push(seoPage);
  addActivityLog(store, {
    action: "create",
    entityType: "seo",
    entityId: seoPage.id,
    description: `Created SEO settings for ${seoPage.path}.`,
  });
  await writeStore(store);
  return seoPage;
}

export async function resetCmsStore() {
  const nextStore = defaultStore();
  addActivityLog(nextStore, {
    action: "reset",
    entityType: "backup",
    description: "Reset CMS store to defaults.",
  });
  await writeStore(nextStore);
  return nextStore;
}

export async function getCmsSnapshot() {
  return readStore();
}

export async function replaceCmsSnapshot(nextStore: Partial<CmsStoreShape>) {
  const currentStore = await readStore();
  const mergedStore = normalizeStore({
    ...currentStore,
    ...nextStore,
  });
  addActivityLog(mergedStore, {
    action: "import",
    entityType: "backup",
    description: "Imported CMS backup data.",
  });
  await writeStore(mergedStore);
  return mergedStore;
}

export async function getPublicCmsData() {
  const store = await readStore();

  return {
    content: store.content,
    formSettings: store.formSettings,
    posts: store.posts.filter((post) => post.status === "published"),
    servicePages: store.servicePages,
    mediaItems: store.mediaItems,
  };
}
