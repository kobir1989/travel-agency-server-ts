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

//get hotel bookings (protected)
bookingRoutes.get('/hotel/bookings', isAuthenticated, getBookingDetails);

//create new hotel booking (protected)
bookingRoutes.post(
  '/hotel/add-new-booking/',
  isAuthenticated,
  createNewBooking
);

//update hotel booking (protected)
bookingRoutes.put(
  '/hotel/update-booking/:hotelBookingId',
  isAuthenticated,
  createNewBooking
);

//delete hotel booking (protected)
bookingRoutes.delete(
  '/hotel/remove-booking/:hotelBookingId',
  isAuthenticated,
  createNewBooking
);

//get flight bookings (protected)
bookingRoutes.get('/flight/bookings', isAuthenticated, getFlightBooking);

//create new hotel booking (protected)
bookingRoutes.post(
  '/flight/add-new-booking',
  isAuthenticated,
  addNewFlightBooking
);

//update flight booking (protected)
bookingRoutes.put(
  '/flight/update-booking/:flightBookingId',
  isAuthenticated,
  updateFlightBookingDetails
);

//delete flight booking (protected)
bookingRoutes.delete(
  '/flight/cancel-booking/:flightBookingId',
  isAuthenticated,
  removeFlightBooking
);

export default bookingRoutes;
