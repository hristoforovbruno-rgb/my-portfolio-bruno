import { Router } from "express";
import {
  createMediaItemController,
  createPostController,
  createServicePageController,
  deleteMediaItemController,
  deletePostController,
  deleteServicePageController,
  exportBackupsController,
  getAccountController,
  getContentController,
  getFormSettingsController,
  getPublicCmsController,
  importBackupsController,
  listActivityLogsController,
  listMediaItemsController,
  listPostsController,
  listSeoPagesController,
  listServicePagesController,
  resetBackupsController,
  updateAdminEmailController,
  updateAdminPasswordController,
  updateContentController,
  updateFormSettingsController,
  updateMediaItemController,
  updatePostController,
  updateServicePageController,
  upsertSeoPageController,
} from "../controllers/cms.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/async-handler.js";

export const cmsRoutes = Router();

cmsRoutes.get("/public", asyncHandler(getPublicCmsController));

cmsRoutes.get("/content", requireAuth, asyncHandler(getContentController));
cmsRoutes.patch("/content", requireAuth, asyncHandler(updateContentController));

cmsRoutes.get("/form-settings", requireAuth, asyncHandler(getFormSettingsController));
cmsRoutes.patch("/form-settings", requireAuth, asyncHandler(updateFormSettingsController));

cmsRoutes.get("/posts", requireAuth, asyncHandler(listPostsController));
cmsRoutes.post("/posts", requireAuth, asyncHandler(createPostController));
cmsRoutes.put("/posts/:id", requireAuth, asyncHandler(updatePostController));
cmsRoutes.delete("/posts/:id", requireAuth, asyncHandler(deletePostController));

cmsRoutes.get("/service-pages", requireAuth, asyncHandler(listServicePagesController));
cmsRoutes.post("/service-pages", requireAuth, asyncHandler(createServicePageController));
cmsRoutes.put("/service-pages/:id", requireAuth, asyncHandler(updateServicePageController));
cmsRoutes.delete("/service-pages/:id", requireAuth, asyncHandler(deleteServicePageController));

cmsRoutes.get("/media", requireAuth, asyncHandler(listMediaItemsController));
cmsRoutes.post("/media", requireAuth, asyncHandler(createMediaItemController));
cmsRoutes.put("/media/:id", requireAuth, asyncHandler(updateMediaItemController));
cmsRoutes.delete("/media/:id", requireAuth, asyncHandler(deleteMediaItemController));

cmsRoutes.get("/seo", requireAuth, asyncHandler(listSeoPagesController));
cmsRoutes.put("/seo", requireAuth, asyncHandler(upsertSeoPageController));

cmsRoutes.get("/activity", requireAuth, asyncHandler(listActivityLogsController));

cmsRoutes.get("/account", requireAuth, asyncHandler(getAccountController));
cmsRoutes.patch("/account/email", requireAuth, asyncHandler(updateAdminEmailController));
cmsRoutes.patch("/account/password", requireAuth, asyncHandler(updateAdminPasswordController));

cmsRoutes.get("/backups/export", requireAuth, asyncHandler(exportBackupsController));
cmsRoutes.post("/backups/import", requireAuth, asyncHandler(importBackupsController));
cmsRoutes.post("/backups/reset", requireAuth, asyncHandler(resetBackupsController));
