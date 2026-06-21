import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Global caching prevents multiple connections during hot reloads
let cached = global.mongooseCache;

async function dbConnect() {
  if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
  }

  if (cached?.conn) return cached.conn;
  if (!cached?.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!).then((m) => m);
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
