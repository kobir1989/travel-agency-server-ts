import { Router } from 'express';
import {
  createNewBooking,
  getBookingDetails,
} from '../controllers/hotelBookings.controller.ts';
import {
  addNewFlightBooking,
  getFlightBooking,
  removeFlightBooking,
  updateFlightBookingDetails,
} from '../controllers/flightBooking.controller.ts';
import { isAuthenticated } from '../middlewares/isAuthenticated.ts';
const bookingRoutes = Router();

//hotel bookings
bookingRoutes.get('/hotel/bookings', isAuthenticated, getBookingDetails); //Protected
bookingRoutes.post('/hotel/add-new-booking/', createNewBooking); //Protected
bookingRoutes.put('/hotel/update-booking/:hotelBookingId', createNewBooking); //Protected
bookingRoutes.delete('/hotel/remove-booking/:hotelBookingId', createNewBooking); //Protected

//flight bookings
bookingRoutes.get('/flight/bookings', getFlightBooking); //Protected
bookingRoutes.post('/flight/add-new-booking', addNewFlightBooking); //Protected
bookingRoutes.put(
  '/flight/update-booking/:flightBookingId',
  updateFlightBookingDetails
); //Protected
bookingRoutes.delete(
  '/flight/cancel-booking/:flightBookingId',
  removeFlightBooking
); //Protected

export default bookingRoutes;
