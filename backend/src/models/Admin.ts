import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true },
);

adminSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_document, returnedValue) => {
    const serialized = returnedValue as Record<string, unknown>;
    serialized.id = String(serialized._id);
    delete serialized._id;
  },
});

export const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
