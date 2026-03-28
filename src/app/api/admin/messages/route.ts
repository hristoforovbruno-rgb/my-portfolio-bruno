import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/mongodb";
import Message, { type MessageDocument } from "@/models/Message";

type SerializedMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  read: boolean;
  repliedAt: string | null;
  createdAt: string;
};

function serializeMessage(message: MessageDocument): SerializedMessage {
  return {
    id: message._id.toString(),
    name: message.name,
    email: message.email,
    phone: message.phone || "",
    message: message.message,
    read: message.read,
    repliedAt: message.repliedAt ? message.repliedAt.toISOString() : null,
    createdAt: message.createdAt.toISOString(),
  };
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const messages = await Message.find().sort({ createdAt: -1 });

  return NextResponse.json(messages.map((message) => serializeMessage(message.toObject())));
}
