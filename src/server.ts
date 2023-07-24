import { envConfig } from './config/envConfig.ts';

import express, { Express } from 'express';
import cors from 'cors';
import { dbConnector } from './dbConnector/dbConnector.ts';
import hotelRoutes from './routes/hotelsRoutes.ts';
import roomRoutes from './routes/roomsRoutes.ts';
import bookingRoutes from './routes/bookingsRoutes.ts';
import authRoutes from './routes/authRoutes.ts';

const app: Express = express();
//cors
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

//routes
app.use('/api/v1', hotelRoutes);
app.use('/api/v1', roomRoutes);
app.use('/api/v1', bookingRoutes);
app.use('/api/v1', authRoutes);

//listener
app.listen(envConfig.PORT, async () => {
  try {
    console.log(`Server Running on Port:${envConfig.PORT}`);
    await dbConnector();
  } catch (error) {
    console.log('Server error');
  }
});
