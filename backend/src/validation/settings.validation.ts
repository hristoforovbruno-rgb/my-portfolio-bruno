import { z } from "zod";

export const updateSettingsSchema = z.object({
  publicEmail: z.string().email(),
  contactPageText: z.object({
    en: z.string().min(10).max(2000),
    et: z.string().min(10).max(2000),
  }),
  starterPrice: z.string().min(1).max(80),
  advancedPrice: z.string().min(1).max(80),
  maintenancePrice: z.string().min(1).max(80),
});
