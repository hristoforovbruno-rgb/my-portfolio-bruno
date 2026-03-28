import mongoose, { InferSchemaType, Schema, type Model } from "mongoose";

const MessageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    repliedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export type MessageDocument = InferSchemaType<typeof MessageSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const Message = (mongoose.models.Message as Model<MessageDocument> | undefined) ||
  mongoose.model<MessageDocument>("Message", MessageSchema);

export default Message;
