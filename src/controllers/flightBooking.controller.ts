import errorResponse from '../helpers/errorResponse.ts';
import FlightBooking from '../models/flights/flightBooking.model.ts';
import { Request, Response } from 'express';
import { validateFlightBookingDTO } from '../utils/DTO-validators/validateFlightBooking.ts';
import Flight from '../models/flights/flights.model.ts';
import { FlightBookingDTO } from '../types/bookingTypes.ts';

/****************************************************************************
 * get flight booking controller.
 * @getFlightBooking
 * @method GET
 * @param {Request} request - The HTTP request object.
 * @param {Response} response - The HTTP response object.
 * @returns {Promise<Response>}
 ***************************************************************************/

export const getFlightBooking = async (req: Request, res: Response) => {
  try {
    const { flightBookingId } = req.params;
    //check flight booking id exists or not
    if (!flightBookingId) {
      return res
        .status(400)
        .json({ success: false, message: 'Flight Booking Id is required!' });
    }
    //find flight booking by booking id
    const flightbooking = await FlightBooking.findById({
      _id: flightBookingId,
    });
    //send response with flightbooking data
    return res.status(200).json({ success: true, flightbooking });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'GET-FLIGHT-BOOKING');
  }
};

/****************************************************************************
 * add new flight booking controller.
 * @addNewFlightBooking
 * @method POST
 * @param {Request} request - The HTTP request object.
 * @param {Response} response - The HTTP response object.
 * @returns {Promise<Response>}
 ***************************************************************************/

export const addNewFlightBooking = async (req: Request, res: Response) => {
  try {
    const dto: FlightBookingDTO = req.body;
    //validte incoming request DTO
    const flightBookingError = validateFlightBookingDTO(dto);
    if (flightBookingError) {
      return res.status(400).json(flightBookingError);
    }

    //check if flight id exist
    const checkFlightId = await Flight.findById({ _id: dto.flightId });
    if (!checkFlightId) {
      return res
        .status(404)
        .json({ success: false, message: 'Flight does exists!' });
    }

    //save new Flight booking to DB
    const flightBookingDetails = await FlightBooking.create({ dto });

    //send response with new flight booking data
    return res.status(201).json({ success: true, flightBookingDetails });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'ADD-NEW-FLIGHT-BOOKING');
  }
};

/****************************************************************************
 * update flight booking controller.
 * @updateFlightBookingDetails
 * @method PUT
 * @param {Request} request - The HTTP request object.
 * @param {Response} response - The HTTP response object.
 * @returns {Promise<Response>}
 ***************************************************************************/

export const updateFlightBookingDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const { flightBookingId } = req.params;
    //check flight booking id exists or not
    if (!flightBookingId) {
      return res
        .status(400)
        .json({ success: false, message: 'Flight booking id is required' });
    }
    const dto: FlightBookingDTO = req.body;
    //validate incoming request DTO
    const flightBookingError = validateFlightBookingDTO(dto);
    if (flightBookingError) {
      return res.status(400).json(flightBookingError);
    }
    //update flight booking by id
    const updatedFlightBooking = await FlightBooking.findByIdAndUpdate(
      { _id: flightBookingId },
      { dto },
      { runValidators: true }
    );
    //send response with updated flight booking
    return res.status(200).json({ success: true, updatedFlightBooking });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'UPDATE-FLIGHT-BOOKING');
  }
};

/****************************************************************************
 * remove flight booking controller.
 * @removeFlightBooking
 * @method DELETE
 * @param {Request} request - The HTTP request object.
 * @param {Response} response - The HTTP response object.
 * @returns {Promise<Response>}
 ***************************************************************************/
export const removeFlightBooking = async (req: Request, res: Response) => {
  try {
    const { flightBookingId } = req.params;
    //check flight booking id exist or not
    if (!flightBookingId) {
      return res
        .status(400)
        .json({ success: false, message: 'Flight booking id is required' });
    }
    //find flight booking by id and remove from DB
    const removedFlightBooking = await FlightBooking.findByIdAndRemove({
      _id: flightBookingId,
    });
    //Send response with removed flight booking
    return res.status(200).json({ success: true, removedFlightBooking });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'REMOVE-FLIGHT-CONTROLLER');
  }
};
