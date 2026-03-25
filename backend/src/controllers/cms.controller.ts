import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import {
  createMediaItem,
  createPost,
  createServicePage,
  getCmsSnapshot,
  getContent,
  getFormSettings,
  getPostBySlug,
  getPublicCmsData,
  getSeoPageByPath,
  getServicePageBySlug,
  initializeCmsStore,
  listActivityLogs,
  listMediaItems,
  listPosts,
  listSeoPages,
  listServicePages,
  replaceCmsSnapshot,
  resetCmsStore,
  upsertSeoPage,
  updateContent,
  updateFormSettings,
  updateMediaItem,
  updatePost,
  updateServicePage,
  deleteMediaItem,
  deletePost,
  deleteServicePage,
} from "../store/cms-store.js";
import {
  getPrimaryAdmin,
  getStoreSnapshot,
  replaceStoreSnapshot,
  updatePrimaryAdminEmail,
  updatePrimaryAdminPassword,
} from "../store/data-store.js";
import {
  mediaItemSchema,
  postSchema,
  seoPageSchema,
  servicePageSchema,
  updateAdminEmailSchema,
  updateAdminPasswordSchema,
  updateContentSchema,
  updateFormSettingsSchema,
} from "../validation/admin-cms.validation.js";

function getParamId(request: Request) {
  return Array.isArray(request.params.id) ? request.params.id[0] : request.params.id;
}

function nowIso() {
  return new Date().toISOString();
}

export async function getPublicCmsController(_request: Request, response: Response) {
  const cmsData = await getPublicCmsData();
  response.json(cmsData);
}

export async function getContentController(_request: Request, response: Response) {
  response.json(await getContent());
}

export async function updateContentController(request: Request, response: Response) {
  const parsed = updateContentSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({ error: "Invalid content payload.", details: parsed.error.flatten() });
    return;
  }

  response.json(await updateContent(parsed.data));
}

export async function getFormSettingsController(_request: Request, response: Response) {
  response.json(await getFormSettings());
}

export async function updateFormSettingsController(request: Request, response: Response) {
  const parsed = updateFormSettingsSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({ error: "Invalid form settings payload.", details: parsed.error.flatten() });
    return;
  }

  response.json(await updateFormSettings(parsed.data));
}

export async function listPostsController(_request: Request, response: Response) {
  response.json(await listPosts({ includeDrafts: true }));
}

export async function createPostController(request: Request, response: Response) {
  const parsed = postSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({ error: "Invalid post payload.", details: parsed.error.flatten() });
    return;
  }

  response.status(201).json(await createPost(parsed.data));
}

export async function updatePostController(request: Request, response: Response) {
  const parsed = postSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({ error: "Invalid post payload.", details: parsed.error.flatten() });
    return;
  }

  const post = await updatePost(getParamId(request), parsed.data);

  if (!post) {
    response.status(404).json({ error: "Post not found." });
    return;
  }

  response.json(post);
}

export async function deletePostController(request: Request, response: Response) {
  const deleted = await deletePost(getParamId(request));

  if (!deleted) {
    response.status(404).json({ error: "Post not found." });
    return;
  }

  response.status(204).send();
}

export async function listServicePagesController(_request: Request, response: Response) {
  response.json(await listServicePages());
}

export async function createServicePageController(request: Request, response: Response) {
  const parsed = servicePageSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({ error: "Invalid service page payload.", details: parsed.error.flatten() });
    return;
  }

  response.status(201).json(await createServicePage(parsed.data));
}

export async function updateServicePageController(request: Request, response: Response) {
  const parsed = servicePageSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({ error: "Invalid service page payload.", details: parsed.error.flatten() });
    return;
  }

  const servicePage = await updateServicePage(getParamId(request), parsed.data);

  if (!servicePage) {
    response.status(404).json({ error: "Service page not found." });
    return;
  }

  response.json(servicePage);
}

export async function deleteServicePageController(request: Request, response: Response) {
  const deleted = await deleteServicePage(getParamId(request));

  if (!deleted) {
    response.status(404).json({ error: "Service page not found." });
    return;
  }

  response.status(204).send();
}

export async function listMediaItemsController(_request: Request, response: Response) {
  response.json(await listMediaItems());
}

export async function createMediaItemController(request: Request, response: Response) {
  const parsed = mediaItemSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({ error: "Invalid media payload.", details: parsed.error.flatten() });
    return;
  }

  response.status(201).json(await createMediaItem(parsed.data));
}

export async function updateMediaItemController(request: Request, response: Response) {
  const parsed = mediaItemSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({ error: "Invalid media payload.", details: parsed.error.flatten() });
    return;
  }

  const mediaItem = await updateMediaItem(getParamId(request), parsed.data);

  if (!mediaItem) {
    response.status(404).json({ error: "Media item not found." });
    return;
  }

  response.json(mediaItem);
}

export async function deleteMediaItemController(request: Request, response: Response) {
  const deleted = await deleteMediaItem(getParamId(request));

  if (!deleted) {
    response.status(404).json({ error: "Media item not found." });
    return;
  }

  response.status(204).send();
}

export async function listSeoPagesController(_request: Request, response: Response) {
  response.json(await listSeoPages());
}

export async function upsertSeoPageController(request: Request, response: Response) {
  const parsed = seoPageSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({ error: "Invalid SEO payload.", details: parsed.error.flatten() });
    return;
  }

  response.json(await upsertSeoPage(parsed.data));
}

export async function listActivityLogsController(_request: Request, response: Response) {
  response.json(await listActivityLogs());
}

export async function getAccountController(_request: Request, response: Response) {
  const admin = await getPrimaryAdmin();

  if (!admin) {
    response.status(404).json({ error: "Admin account not found." });
    return;
  }

  response.json({
    email: admin.email,
    updatedAt: admin.updatedAt,
  });
}

export async function updateAdminEmailController(request: Request, response: Response) {
  const parsed = updateAdminEmailSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({ error: "Invalid email payload.", details: parsed.error.flatten() });
    return;
  }

  const admin = await updatePrimaryAdminEmail(parsed.data.email);

  if (!admin) {
    response.status(404).json({ error: "Admin account not found." });
    return;
  }

  response.json({ email: admin.email, updatedAt: admin.updatedAt });
}

export async function updateAdminPasswordController(request: Request, response: Response) {
  const parsed = updateAdminPasswordSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({ error: "Invalid password payload.", details: parsed.error.flatten() });
    return;
  }

  const admin = await getPrimaryAdmin();

  if (!admin) {
    response.status(404).json({ error: "Admin account not found." });
    return;
  }

  const passwordMatches = await bcrypt.compare(parsed.data.currentPassword, admin.passwordHash);

  if (!passwordMatches) {
    response.status(401).json({ error: "Current password is incorrect." });
    return;
  }

  const passwordHash = await bcrypt.hash(parsed.data.newPassword, 12);
  const updatedAdmin = await updatePrimaryAdminPassword(passwordHash);
  response.json({ ok: true, updatedAt: updatedAdmin?.updatedAt || admin.updatedAt });
}

export async function exportBackupsController(_request: Request, response: Response) {
  response.json({
    generatedAt: nowIso(),
    main: await getStoreSnapshot(),
    cms: await getCmsSnapshot(),
  });
}

export async function resetBackupsController(_request: Request, response: Response) {
  const currentMain = await getStoreSnapshot();
  await replaceStoreSnapshot({
    admins: currentMain.admins,
    messages: [],
    settings: currentMain.settings,
  });
  await resetCmsStore();
  response.json({ ok: true });
}

export async function importBackupsController(request: Request, response: Response) {
  const payload = request.body as {
    main?: Awaited<ReturnType<typeof getStoreSnapshot>>;
    cms?: Awaited<ReturnType<typeof getCmsSnapshot>>;
  };

  if (!payload || typeof payload !== "object" || !payload.main || !payload.cms) {
    response.status(400).json({ error: "Invalid backup payload." });
    return;
  }

  const currentMain = await getStoreSnapshot();

  await replaceStoreSnapshot({
    admins: currentMain.admins,
    messages: Array.isArray(payload.main.messages) ? payload.main.messages : [],
    settings: payload.main.settings || currentMain.settings,
  });
  await replaceCmsSnapshot(payload.cms);

  response.json({ ok: true });
}

export async function getServerSeoOverride(pathname: string) {
  return getSeoPageByPath(pathname);
}

export async function getPublicCmsPostBySlug(slug: string) {
  return getPostBySlug(slug);
}

export async function getPublicCmsServiceBySlug(slug: string) {
  return getServicePageBySlug(slug);
}

void initializeCmsStore();
