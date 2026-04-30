import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export const connectDB = async () => {
  let memoryServer;
  let mongoUri = (process.env.MONGO_URI || process.env.MONGO_URL || '')
    .toString()
    .trim()
    .replace(/\s+/g, '');

  if (!mongoUri) {
    mongoUri = 'mongodb://127.0.0.1:27017/food-app';
  }

  if (!/^mongodb(\+srv)?:\/\//i.test(mongoUri)) {
    mongoUri = mongoUri.replace(/^[a-zA-Z0-9+-]+:\/\//g, 'mongodb://');
  }

  try {
    await mongoose.connect(mongoUri);
    console.log(`✓ Connected to MongoDB: ${mongoUri}`);
  } catch (error) {
    console.error('⚠ Primary MongoDB connection failed. Trying in-memory MongoDB...');
    console.error(`Error: ${error.message}`);

    try {
      memoryServer = await MongoMemoryServer.create({
        instance: { dbName: 'food-app-dev' }
      });
      const memoryUri = memoryServer.getUri();
      await mongoose.connect(memoryUri);
      console.log(`✓ Connected to in-memory MongoDB fallback: ${memoryUri}`);
    } catch (memoryError) {
      console.error('✗ In-memory MongoDB fallback failed.');
      console.error(`Error: ${memoryError.message}`);
      process.exit(1);
    }
  }
};
