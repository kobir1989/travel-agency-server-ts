import { envConfig } from './config/envConfig.ts';

import express, { Express } from 'express';
import cors from 'cors';
import { dbConnector } from './dbConnector/dbConnector.ts';

const app: Express = express();

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

app.listen(envConfig.PORT, async () => {
  try {
    console.log(`Server Running on Port:${envConfig.PORT}`);
    await dbConnector();
  } catch (error) {
    console.log('Server error');
  }
});
