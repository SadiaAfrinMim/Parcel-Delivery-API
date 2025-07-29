import mongoose from 'mongoose';

import config from './config';

export async function connectDB() {
  try {
    await mongoose.connect(config.database_url);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}
