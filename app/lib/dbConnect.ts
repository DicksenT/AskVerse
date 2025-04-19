import mongoose, { Mongoose } from 'mongoose';
import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGODB_URI!;
if (!MONGO_URI) throw new Error('Please define MONGODB_URI');

// --- Mongoose Global Connection ---
declare global {
  var mongooseConn: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// 👇 Global caching
const globalCache = globalThis as typeof globalThis & {
  mongooseConn: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
  _mongoClientPromise?: Promise<MongoClient>;
};

globalCache.mongooseConn = globalCache.mongooseConn || {
  conn: null,
  promise: null,
};

// ✅ Mongoose for custom models
export async function dbConnect(): Promise<Mongoose> {
  if (globalCache.mongooseConn.conn) return globalCache.mongooseConn.conn;

  if (!globalCache.mongooseConn.promise) {
    globalCache.mongooseConn.promise = mongoose
      .connect(MONGO_URI, {
        bufferCommands: false,
      })
      .catch((err) => {
        console.error('❌ Mongoose connect error:', err);
        throw err;
      });
  }

  globalCache.mongooseConn.conn = await globalCache.mongooseConn.promise;
  return globalCache.mongooseConn.conn;
}

// ✅ MongoClient for NextAuth
const client = new MongoClient(MONGO_URI, {
  tls: true,
  serverSelectionTimeoutMS: 5000,
});

export const clientPromise =
  globalCache._mongoClientPromise || (globalCache._mongoClientPromise = client.connect());
