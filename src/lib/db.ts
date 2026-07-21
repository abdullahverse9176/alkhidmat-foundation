import mongoose from 'mongoose';
import { Service, Project } from '@/models/Service';
import { servicesData } from '@/data/mockData';
import { cleanWaterProjects } from '@/data/cleanWaterData';

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
  cached = (global as any).mongoose = { conn: null, promise: null, seeded: false };
}

export async function seedDatabase() {
  try {
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      console.log('Seeding default services...');
      const seedServices = servicesData.map((s) => ({
        title: s.title,
        slug: s.slug,
        description: s.description,
        longDescription: s.longDescription,
        iconName: s.iconName,
        image: s.image.startsWith('/') 
          ? 'https://images.unsplash.com/photo-1469571486040-7530613856e1?auto=format&fit=crop&q=80&w=600' 
          : s.image,
        features: s.features || [],
        stats: s.stats || [],
      }));
      await Service.insertMany(seedServices);
      console.log('Successfully seeded default services!');
    }

    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      console.log('Seeding default projects...');
      const seedProjects = cleanWaterProjects.map(({ id, ...p }: any) => ({
        ...p,
        serviceSlug: 'clean-water-initiative'
      }));
      await Project.insertMany(seedProjects);
      console.log('Successfully seeded default projects!');
    }
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
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

  // Run seeding if not already done in this runtime instance
  if (!cached.seeded) {
    await seedDatabase();
    cached.seeded = true;
  }

  return cached.conn;
}

