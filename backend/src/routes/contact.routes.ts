import { Router } from "express";
import {
  bulkContactActionController,
  createContactController,
  deleteContactController,
  exportContactsController,
  listContactsController,
  updateContactController,
} from "../controllers/contact.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { contactRateLimit } from "../middleware/rate-limit.js";
import { asyncHandler } from "../utils/async-handler.js";

export const contactRoutes = Router();

contactRoutes.post("/", contactRateLimit, asyncHandler(createContactController));
contactRoutes.get("/", requireAuth, asyncHandler(listContactsController));
contactRoutes.get("/export", requireAuth, asyncHandler(exportContactsController));
contactRoutes.post("/bulk", requireAuth, asyncHandler(bulkContactActionController));
contactRoutes.patch("/:id", requireAuth, asyncHandler(updateContactController));
contactRoutes.delete("/:id", requireAuth, asyncHandler(deleteContactController));
