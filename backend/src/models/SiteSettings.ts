import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    publicEmail: { type: String, required: true, trim: true, lowercase: true },
    contactPageText: {
      en: { type: String, required: true, trim: true },
      et: { type: String, required: true, trim: true },
    },
    starterPrice: { type: String, required: true, trim: true },
    advancedPrice: { type: String, required: true, trim: true },
    maintenancePrice: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

siteSettingsSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_document, returnedValue) => {
    const serialized = returnedValue as Record<string, unknown>;
    serialized.id = String(serialized._id);
    delete serialized._id;
  },
});

export const SiteSettings =
  mongoose.models.SiteSettings || mongoose.model("SiteSettings", siteSettingsSchema);
