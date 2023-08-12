import { envConfig } from './config/envConfig.ts';

import express, { Express } from 'express';
import cors from 'cors';
import { dbConnector } from './dbConnector/dbConnector.ts';
import hotelRoutes from './routes/hotels.route.ts';
import roomRoutes from './routes/rooms.route.ts';
import bookingRoutes from './routes/bookings.route.ts';
import authRoutes from './routes/auth.route.ts';
import flightRoutes from './routes/flight.route.ts';
import tourRoutes from './routes/toursRoute.ts';

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
app.use('/api/v1/', flightRoutes);
app.use('/api/v1', tourRoutes);

//listener
app.listen(envConfig.PORT, async () => {
  try {
    console.log(`Server Running on Port:${envConfig.PORT}`);
    await dbConnector();
  } catch (error) {
    console.log('Server error');
  }
});
