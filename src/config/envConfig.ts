import { configDotenv } from 'dotenv';
configDotenv();

export const envConfig = {
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT,
  SALT_ROUND: process.env.SALT_ROUND,
  ACCESS_SECRET: process.env.ACCESS_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
};
