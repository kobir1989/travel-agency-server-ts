import mongoose from 'mongoose';
import { envConfig } from '../config/envConfig.ts';

export const dbConnector = async () => {
  try {
    if (!envConfig.DB_URI) {
      throw new Error(
        'DB_URI is not defined in the environment configuration.'
      );
    }
    await mongoose.connect(envConfig.DB_URI);
    console.log('Database connected!');
  } catch (error) {
    console.log('Database connection failed!');
    throw error;
  }
};
