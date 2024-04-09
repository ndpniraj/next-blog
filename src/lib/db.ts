import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

const cached: {
  connection?: typeof mongoose;
  connectionPromise?: Promise<typeof mongoose>;
} = {};

const dbConnect = async () => {
  if (!MONGO_URI) throw new Error("Database uri { MONGO_URI } is missing!");

  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.connectionPromise) {
    cached.connectionPromise = mongoose.connect(MONGO_URI);
  }

  try {
    cached.connection = await cached.connectionPromise;
  } catch (error) {
    cached.connectionPromise = undefined;
    throw error;
  }

  return cached.connection;
};

export default dbConnect;
