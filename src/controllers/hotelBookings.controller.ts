import { Request, Response } from 'express';
import HotelBooking from '../models/hotels/hotelBookings.model.ts';
import errorResponse from '../helpers/errorResponse.ts';
import { validateHotelBookingDTO } from '../utils/DTO-validators/validateHotelBooking.ts';
import { HotelBookingDTO } from '../types/bookingTypes.ts';

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
    const booking = await HotelBooking.find({ userId });

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
    const dto: HotelBookingDTO = req.body;
    //Validate incomming request DTO
    const bookingError = validateHotelBookingDTO(dto);
    if (bookingError) {
      return res.status(400).json(bookingError);
    }

    //save booking details to database
    const bookingDeatails = await HotelBooking.create(dto);
    //send response
    return res.status(201).json({ success: true, bookingDeatails });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'CREATE-NEW_BOOKING');
  }
};

/****************************************************************************
 * update Hotel booking controller.
 * @updateHotelBookingDetails
 * @method PUT
 * @param {Request} request - The HTTP request object.
 * @param {Response} response - The HTTP response object.
 * @returns {Promise<Response>} updated booking details if successful or an error response.
 ***************************************************************************/
export const updateHotelBookingDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const { hotelBookingId } = req.params;
    //check hotel booking id exist or not
    if (!hotelBookingId) {
      return res
        .status(400)
        .json({ success: false, message: 'Hotel booking id is required' });
    }

    const dto: HotelBookingDTO = req.body;
    //validate incoming request DTO
    const hotelBookingUpdateError = validateHotelBookingDTO(dto);
    if (hotelBookingUpdateError) {
      return res.status(400).json(hotelBookingUpdateError);
    }

    //update existing hotel booking by incoming id
    const updatedHotelBooking = await HotelBooking.findByIdAndUpdate(
      { _id: hotelBookingId },
      { dto },
      { runValidators: true }
    );

    //send response with the updated hotel booking details
    return res.status(200).json({ success: true, updatedHotelBooking });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'UPDATE-HOTEL-BOOKING-DETAILS');
  }
};

/****************************************************************************
 * Remove Hotel booking controller.
 * @removeHotelBooking
 * @method DELETE
 * @param {Request} request - The HTTP request object.
 * @param {Response} response - The HTTP response object.
 * @returns {Promise<Response>} updated booking details if successful or an error response.
 ***************************************************************************/
export const removeHotelBooking = async (req: Request, res: Response) => {
  try {
    const { hotelBookingId } = req.params;
    //check hotel booking id exists in the req.body
    if (!hotelBookingId) {
      return res
        .status(400)
        .json({ success: false, message: 'Hotel booking id is required' });
    }

    //remove hotel bookig form DB
    const removdHotelBooking = await HotelBooking.findByIdAndRemove({
      _id: hotelBookingId,
    });

    //send response with removed hotel booking details data
    return res.status(200).json({ success: true, removdHotelBooking });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'REMOVE-HOTEL-BOOKING');
  }
};
