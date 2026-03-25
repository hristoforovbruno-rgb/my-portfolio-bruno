import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: "" },
    message: { type: String, required: true, trim: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true },
);

contactMessageSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_document, returnedValue) => {
    const serialized = returnedValue as Record<string, unknown>;
    serialized.id = String(serialized._id);
    delete serialized._id;
  },
});

export const ContactMessage =
  mongoose.models.ContactMessage || mongoose.model("ContactMessage", contactMessageSchema);
