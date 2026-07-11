import mongoose from 'mongoose';

// STEP 1: Database connection connect karne ke liye helper file
// Yahan hum Mongoose ka istemal kar ke MongoDB se connect karenge.
// Next.js serverless environment me chalta hai, isliye hum connection ko cache
// karenge taaki har request par naya connection open na ho.

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
  Mongoose connection cache ko global object par store karenge.
  Taaki development mode me hot-reload hone par purana connection reuse ho sake.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  // Agar pehle se connected hai to cached connection return karo
  if (cached.conn) {
    return cached.conn;
  }

  // Agar connection in-progress nahi hai to naya promise banao
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('Connecting to MongoDB...');
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      console.log('Successfully connected to MongoDB!');
      return mongooseInstance;
    }).catch((err) => {
      console.error('Error connecting to MongoDB:', err);
      cached.promise = null; // Agar error ho to reset karein taaki dobara try ho sake
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
