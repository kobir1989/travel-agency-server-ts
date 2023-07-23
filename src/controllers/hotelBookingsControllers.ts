import { Request, Response } from 'express';
import HotelBookingModel, {
  HotelBookingTypes,
} from '../models/hotels/hotelBookings.ts';
import errorResponse from '../helpers/errorResponse.ts';

//get bookings details based on user id
export const getBookingDetails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json('User id are mendatory!');
    }
    const booking = await HotelBookingModel.find({ userId });
    return res.status(200).json(booking);
  } catch (error) {
    errorResponse(
      res,
      {
        statusCode: 500,
        message: 'Something went wrong',
      },
      'GET-BOOKINGS-DETAILS'
    );
  }
};

//create new booking
export const createNewBooking = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      hotelId,
      roomId,
      checkInDate,
      checkOutDate,
      totalNights,
      totalPrice,
      numberOfGuests,
    }: HotelBookingTypes = req.body;
    //check if all the required fields are present in the req.body
    if (
      !userId ||
      !hotelId ||
      !roomId ||
      !checkInDate ||
      !checkOutDate ||
      !totalNights ||
      !totalPrice ||
      !numberOfGuests
    ) {
      return res.status(400).json('All the fields are mendatory');
    }
    //save booking details to database
    const bookingDeatails = await HotelBookingModel.create({
      userId,
      hotelId,
      roomId,
      checkInDate,
      checkOutDate,
      totalNights,
      totalPrice,
      numberOfGuests,
    });
    return res.status(201).json(bookingDeatails);
  } catch (error) {
    console.log(error);
    errorResponse(
      res,
      {
        statusCode: 500,
        message: 'Something went wrong',
      },
      'GET-BOOKINGS-DETAILS'
    );
  }
};
