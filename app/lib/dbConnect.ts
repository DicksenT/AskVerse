import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGODB_URI!;
if (!MONGO_URI) throw new Error("Please define MONGODB_URI");

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
  var mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
}

// MongoClient for NextAuth
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(MONGO_URI, { tls: true, serverSelectionTimeoutMS: 5000 });
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

// Mongoose for models
const cached = (global as any).mongoose || { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
      tls: true
    });
  }

  cached.conn = await cached.promise;
  global.mongoose = cached;
  return cached.conn;
}

export { clientPromise };
