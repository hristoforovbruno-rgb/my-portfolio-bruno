import type { NextFunction, Request, Response } from "express";
import { verifyAdminToken } from "../utils/jwt.js";

export function requireAuth(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    response.status(401).json({ error: "Authentication required." });
    return;
  }

  try {
    verifyAdminToken(token);
    next();
  } catch {
    response.status(401).json({ error: "Invalid or expired token." });
  }
}
