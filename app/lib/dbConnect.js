import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
// assign global.mongoose to cached
let cached = global.mongoose;


//conn(active connection), promise(function to connect to mongoose) 
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    //if there's already a conn/connection return
  if (cached.conn) {
    return cached.conn;
  }

  //if there's no promise we create/assign one using mongoose connect
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;