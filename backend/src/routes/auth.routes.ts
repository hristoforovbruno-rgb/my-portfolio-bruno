import { Router } from "express";
import { loginController } from "../controllers/auth.controller.js";
import { asyncHandler } from "../utils/async-handler.js";

export const authRoutes = Router();

authRoutes.post("/login", asyncHandler(loginController));
