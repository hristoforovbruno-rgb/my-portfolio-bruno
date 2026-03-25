import mongoose from "mongoose";
import { env } from "./env.js";

let connectionPromise: Promise<typeof mongoose> | null = null;

export async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (!env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set. Add it to your environment variables before starting the backend.");
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
  }

  try {
    return await connectionPromise;
  } catch (error) {
    console.error("MongoDB connection failed", error);
    connectionPromise = null;
    throw error;
  }
}
