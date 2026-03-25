import { Router } from "express";
import {
  getPublicSettingsController,
  getSettingsController,
  updateSettingsController,
} from "../controllers/settings.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/async-handler.js";

export const settingsRoutes = Router();

settingsRoutes.get("/public", asyncHandler(getPublicSettingsController));
settingsRoutes.get("/", requireAuth, asyncHandler(getSettingsController));
settingsRoutes.patch("/", requireAuth, asyncHandler(updateSettingsController));
