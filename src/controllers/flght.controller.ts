import { Request, Response } from 'express';
import errorResponse from '../helpers/errorResponse.ts';
import Flight from '../models/flights/flights.model.ts';
import {
  FlightDTO,
  validateFlightDTO,
} from '../utils/DTO-validators/validateFlight.ts';

/****************************************************************************
 * Flights controller.
 * @getFlights
 * @method GET
 * @param {Request} request - The HTTP request object.
 * @param {Response} response - The HTTP response object.
 * @returns {Promise<Response>}
 ***************************************************************************/
export const getFligths = async (req: Request, res: Response) => {
  try {
    const flights = await Flight.find();
    return res.status(200).json({ success: true, flights });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'GET-FLIGHT');
  }
};

/****************************************************************************
 * Add new flight controller.
 * @addNewFlight
 * @method POST
 * @param {Request} request - The HTTP request object.
 * @param {Response} response - The HTTP response object.
 * @returns {Promise<Response>}
 ***************************************************************************/
export const addNewFlight = async (req: Request, res: Response) => {
  try {
    const dto: FlightDTO = req.body;
    //validate incoming request DTO
    const addFlightError = validateFlightDTO(dto);
    if (addFlightError) {
      return res.status(400).json(addFlightError);
    }
    //Find duplicate flight
    const findDuplicate = await Flight.findOne({
      flightNumber: dto.flightNumber,
    });
    //send error response if duplicate flight exists.
    if (findDuplicate) {
      return res
        .status(400)
        .json({ success: false, message: 'Flight already exists!' });
    }
    //save new flight to DB
    const flight = await Flight.create(dto);
    return res.status(201).json({ success: true, flight });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'ADD-NEW-FLIGHT');
  }
};

/****************************************************************************
 * update flight controller.
 * @updateFlight
 * @method PUT
 * @param {Request} request - The HTTP request object.
 * @param {Response} response - The HTTP response object.
 * @returns {Promise<Response>}
 ***************************************************************************/
export const updateFlight = async (res: Response, req: Request) => {
  try {
    const { userId, flightId } = req.params;
    //check user id exists
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: 'Unauthorized user!' });
    }
    //check flight id exists
    if (!flightId) {
      return res.status(400).json;
    }
    //validte incoming requrest flight DTO
    const dto: FlightDTO = req.body;
    const updateFlightError = validateFlightDTO(dto);
    if (updateFlightError) {
      return res.status(400).json(updateFlightError);
    }

    //update flight
    const flight = await Flight.findByIdAndUpdate(
      { _id: flightId },
      { dto },
      { runValidators: true }
    );
    //send the updated flight
    return res.status(201).json({ success: true, flight });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'UPDATE-FLIGHT');
  }
};

/****************************************************************************
 * delete flight controller.
 * @updateFlight
 * @method DELETE
 * @param {Request} request - The HTTP request object.
 * @param {Response} response - The HTTP response object.
 * @returns {Promise<Response>}
 ***************************************************************************/
export const removeFlight = async (req: Request, res: Response) => {
  try {
    //check flight id exists or not
    const { flightId } = req.params;
    if (!flightId) {
      return res
        .status(400)
        .json({ success: false, message: 'Flight id is required!' });
    }

    //remove flight form DB
    const removedFlight = await Flight.findByIdAndRemove({ _id: flightId });

    //send response with removed Flight data
    return res.status(200).json({ success: true, removedFlight });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'REMOVE-FLIGHT');
  }
};
