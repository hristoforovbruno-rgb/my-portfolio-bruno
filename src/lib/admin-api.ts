"use client";

import { getAdminToken } from "@/lib/admin-session";
import { getApiBaseUrl } from "@/lib/api-base-url";

const API_BASE_URL = getApiBaseUrl();

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  auth?: boolean;
};

export async function apiRequest<T>(path: string, options: RequestOptions = {}) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (options.auth) {
    const token = getAdminToken();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      throw new Error(data?.error || "Request failed");
    }

    throw new Error(`Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export type AdminDashboardStats = {
  totalMessages: number;
  unreadMessages: number;
  messagesThisWeek: number;
  messagesThisMonth: number;
  recentMessages: AdminMessage[];
  recentActivity: AdminActivityLog[];
};

export type AdminMessage = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export type MessagesResponse = {
  items: AdminMessage[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type AdminSettings = {
  id?: string;
  publicEmail: string;
  contactPageText: {
    en: string;
    et: string;
  };
  starterPrice: string;
  advancedPrice: string;
  maintenancePrice: string;
};

export type AdminActivityLog = {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  description: string;
  createdAt: string;
};

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

export type LocalizedCmsContent = {
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
};

export type CmsMediaItem = {
  id: string;
  title: string;
  url: string;
  altText: string;
  type: "image" | "logo" | "document" | "other";
};

export type CmsSeoPage = {
  id?: string;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonicalPath: string;
};

export type CmsPublicData = {
  content: LocalizedCmsContent;
  formSettings: CmsFormSettings;
  posts: CmsBlogPost[];
  servicePages: CmsServicePage[];
  mediaItems: CmsMediaItem[];
};
