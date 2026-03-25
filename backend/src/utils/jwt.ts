import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function signAdminToken(payload: { adminId: string; email: string }) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] });
}

export function verifyAdminToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as { adminId: string; email: string };
}
