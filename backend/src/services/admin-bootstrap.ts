import bcrypt from "bcryptjs";
import { env } from "../config/env.js";
import { createAdmin, getPrimaryAdmin, getSettings, upsertSettings } from "../store/data-store.js";

export async function ensureAdminUser() {
  const email = env.ADMIN_EMAIL.toLowerCase();
  const existingAdmin = await getPrimaryAdmin();

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(env.ADMIN_PASSWORD, 12);
    await createAdmin({ email, passwordHash });
  }

  const existingSettings = await getSettings();

  if (!existingSettings) {
    await upsertSettings({
      publicEmail: env.CONTACT_NOTIFICATION_EMAIL || env.ADMIN_EMAIL,
      contactPageText: {
        en: "Best for businesses that need a faster website, clearer trust signals, and a stronger path to enquiries.",
        et: "Sobib ettevõtetele, kes vajavad kiiremat veebilehte, selgemaid usaldussignaale ja tugevamat teed päringuteni.",
      },
      starterPrice: "from EUR 900",
      advancedPrice: "from EUR 1,800",
      maintenancePrice: "from EUR 120/mo",
    });
    return;
  }

  if (!existingSettings.starterPrice || !existingSettings.advancedPrice || !existingSettings.maintenancePrice) {
    await upsertSettings({
      publicEmail: existingSettings.publicEmail,
      contactPageText: existingSettings.contactPageText,
      starterPrice: existingSettings.starterPrice || "from EUR 900",
      advancedPrice: existingSettings.advancedPrice || "from EUR 1,800",
      maintenancePrice: existingSettings.maintenancePrice || "from EUR 120/mo",
    });
  }
}
