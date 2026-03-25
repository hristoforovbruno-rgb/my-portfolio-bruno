import { Router } from "express";
import { getDashboardStatsController } from "../controllers/dashboard.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/async-handler.js";

export const dashboardRoutes = Router();

dashboardRoutes.get("/stats", requireAuth, asyncHandler(getDashboardStatsController));
