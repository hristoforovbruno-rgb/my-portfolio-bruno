import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { findAdminByEmail } from "../store/data-store.js";
import { signAdminToken } from "../utils/jwt.js";
import { loginSchema } from "../validation/auth.validation.js";

export async function loginController(request: Request, response: Response) {
  const parsed = loginSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({ error: "Invalid login payload.", details: parsed.error.flatten() });
    return;
  }

  const email = parsed.data.email.toLowerCase();
  const admin = await findAdminByEmail(email);

  if (!admin) {
    response.status(401).json({ error: "Invalid email or password." });
    return;
  }

  const passwordMatches = await bcrypt.compare(parsed.data.password, admin.passwordHash);

  if (!passwordMatches) {
    response.status(401).json({ error: "Invalid email or password." });
    return;
  }

  const token = signAdminToken({ adminId: admin.id, email: admin.email });

  response.json({
    token,
    admin: {
      id: admin.id,
      email: admin.email,
    },
  });
}
