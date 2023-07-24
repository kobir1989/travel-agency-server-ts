import { Request, Response } from 'express';
import HotelBookingModel from '../models/hotels/hotelBookings.ts';
import errorResponse from '../helpers/errorResponse.ts';
import {
  BookingDTO,
  validateBookingDTO,
} from '../utils/DTO-validators/validateBooking.ts';

/*********************************************************************
 * get bookings details controller
 * @getBookingDetails
 * @method GET
 * @param {Request} request - The HTTP request object.
 * @param {Response} response - The HTTP response object.
 * @returns {Promise<Response>} The booking details if successful or an error response.
 *********************************************************************/
export const getBookingDetails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    //check if user id exists
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: 'User id are mendatory!' });
    }

    //find booking based on user id
    const booking = await HotelBookingModel.find({ userId });

    //send response with booking data
    return res.status(200).json({ success: true, booking });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'GET_BOOKING-DETAILS');
  }
};

/****************************************************************************
 * Create new booking controller.
 * @createNewBooking
 * @method POST
 * @param {Request} request - The HTTP request object.
 * @param {Response} response - The HTTP response object.
 * @returns {Promise<Response>} The booking details if successful or an error response.
 ***************************************************************************/
export const createNewBooking = async (req: Request, res: Response) => {
  try {
    const dto: BookingDTO = req.body;
    //Validate incomming request DTO
    const bookingError = validateBookingDTO(dto);
    if (bookingError) {
      return res.status(400).json(bookingError);
    }

    //save booking details to database
    const bookingDeatails = await HotelBookingModel.create({
      userId: dto.hotelId,
      hotelId: dto.hotelId,
      roomId: dto.roomId,
      checkInDate: dto.checkInDate,
      checkOutDate: dto.checkOutDate,
      totalNights: dto.totalNights,
      totalPrice: dto.totalPrice,
      numberOfGuests: dto.numberOfGuests,
    });
    //send response
    return res.status(201).json({ success: true, bookingDeatails });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'CREATE-NEW_BOOKING');
  }
};
