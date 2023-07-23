import { Router } from 'express';
import {
  createNewBooking,
  getBookingDetails,
} from '../controllers/hotelBookingsControllers.ts';
const bookingRoutes = Router();

bookingRoutes.get('/bookings/:userId', getBookingDetails);
bookingRoutes.post('/create-new-booking', createNewBooking);

export default bookingRoutes;
