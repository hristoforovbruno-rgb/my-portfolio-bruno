import type { Request, Response } from "express";
import { getSettings, upsertSettings } from "../store/data-store.js";
import { updateSettingsSchema } from "../validation/settings.validation.js";

export async function getPublicSettingsController(_request: Request, response: Response) {
  const settings = await getSettings();

  if (!settings) {
    response.status(404).json({ error: "Settings not found." });
    return;
  }

  response.json({
    publicEmail: settings.publicEmail,
    contactPageText: settings.contactPageText,
    starterPrice: settings.starterPrice,
    advancedPrice: settings.advancedPrice,
    maintenancePrice: settings.maintenancePrice,
  });
}

export async function getSettingsController(_request: Request, response: Response) {
  const settings = await getSettings();

  if (!settings) {
    response.status(404).json({ error: "Settings not found." });
    return;
  }

  response.json(settings);
}

export async function updateSettingsController(request: Request, response: Response) {
  const parsed = updateSettingsSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({ error: "Invalid settings payload.", details: parsed.error.flatten() });
    return;
  }

  const settings = await upsertSettings(parsed.data);

  response.json(settings);
}
