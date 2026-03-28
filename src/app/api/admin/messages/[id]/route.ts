import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/mongodb";
import Message, { type MessageDocument } from "@/models/Message";

type SerializedMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  repliedAt: string | null;
  createdAt: string;
};

type PatchBody = {
  read?: boolean;
  repliedAt?: string | null;
};

function serializeMessage(message: MessageDocument): SerializedMessage {
  return {
    id: message._id.toString(),
    name: message.name,
    email: message.email,
    message: message.message,
    read: message.read,
    repliedAt: message.repliedAt ? message.repliedAt.toISOString() : null,
    createdAt: message.createdAt.toISOString(),
  };
}

function isValidObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid message id" }, { status: 400 });
  }

  const body = (await request.json()) as PatchBody;
  const update: { read?: boolean; repliedAt?: Date | null } = {};

  if (typeof body.read === "boolean") {
    update.read = body.read;
  }

  if (body.repliedAt !== undefined) {
    update.repliedAt = body.repliedAt ? new Date(body.repliedAt) : null;
  }

  await connectToDatabase();
  const message = await Message.findByIdAndUpdate(id, update, { new: true });

  if (!message) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }

  return NextResponse.json(serializeMessage(message.toObject()));
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid message id" }, { status: 400 });
  }

  await connectToDatabase();
  const deletedMessage = await Message.findByIdAndDelete(id);

  if (!deletedMessage) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
