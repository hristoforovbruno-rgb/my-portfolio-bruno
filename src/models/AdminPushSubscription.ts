import mongoose, { InferSchemaType, Schema, type Model } from "mongoose";

const AdminPushSubscriptionSchema = new Schema(
  {
    endpoint: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    expirationTime: {
      type: Number,
      default: null,
    },
    keys: {
      p256dh: {
        type: String,
        required: true,
      },
      auth: {
        type: String,
        required: true,
      },
    },
    userAgent: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export type AdminPushSubscriptionDocument = InferSchemaType<typeof AdminPushSubscriptionSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const AdminPushSubscription = (mongoose.models.AdminPushSubscription as Model<AdminPushSubscriptionDocument> | undefined) ||
  mongoose.model<AdminPushSubscriptionDocument>("AdminPushSubscription", AdminPushSubscriptionSchema);

export default AdminPushSubscription;
