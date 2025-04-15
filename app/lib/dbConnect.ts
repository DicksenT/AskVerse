import mongoose, { Mongoose } from "mongoose";
import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGODB_URI!;
if (!MONGO_URI) throw new Error("Please define MONGODB_URI");

// Proper global type declaration
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

// MongoClient for NextAuth
let client: MongoClient;
const clientPromise: Promise<MongoClient> =
  global._mongoClientPromise ||
  (global._mongoClientPromise = new MongoClient(MONGO_URI, {
    tls: true,
    serverSelectionTimeoutMS: 5000,
  }).connect());

// Mongoose for models
const cached = global.mongoose || { conn: null, promise: null };

export async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
      tls: true,
    });
  }

  cached.conn = await cached.promise;
  global.mongoose = cached;
  return cached.conn;
}

export { clientPromise };
