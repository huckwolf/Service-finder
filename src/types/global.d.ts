import type mongoose from "mongoose";

// Define a type for the cached mongoose connection.
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Extend the global namespace to include the mongoose cache.
// For learning, we can also define other global variables here if needed in the future.
declare global {
  var mongooseCache: MongooseCache | undefined;
}

export {};
