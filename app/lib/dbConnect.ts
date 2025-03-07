import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error("Please define MONGO_URI in .env.local");
}

//MongoDB Client for NextAuth (Used with MongoDBAdapter)
let client;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(MONGO_URI);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

// Mongoose Connection (Used for Models)
let cached = (global as any).mongoose || { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  cached.promise = mongoose.connect(MONGO_URI, {
    bufferCommands: false,
  });

  cached.conn = await cached.promise;
  return cached.conn;
}

export { clientPromise };
