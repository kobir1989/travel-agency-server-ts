import { configDotenv } from 'dotenv';
configDotenv();

export const envConfig = {
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT,
};
