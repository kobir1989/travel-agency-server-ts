import HotelsList from '../models/hotels/hotelList.model.ts';
import { Request, Response } from 'express';
import errorResponse from '../helpers/errorResponse.ts';
import { HotelsListTypes } from '../models/hotels/hotelList.model.ts';
import { validateHotelDTO } from '../utils/DTO-validators/validateHotel.ts';
import { HotelDTO } from '../types/hotelTypes.ts';

/************************************************************
 * add new hotel Controller
 * @addNewHotel
 * @method POST
 * @param {Request}
 * @param {Request}
 * @return {Promise<Response>}
 ************************************************************/
export const addNewHotel = async (req: Request, res: Response) => {
  try {
    // check if the user role is Admin
    if (req.user && req.user.role !== 'ADMIN') {
      return res
        .status(401)
        .json({ success: false, message: 'Access denied!' });
    }

    const dto: HotelDTO = req.body;
    //Validate add new hotel incoming request DTO
    const addNewHotelError = validateHotelDTO(dto);
    if (addNewHotelError) {
      return res.status(422).json(addNewHotelError);
    }

    //add new hotel to database
    const newHotel = await HotelsList.create(dto);

    //response with status 201 and hotel object
    res.status(201).json({ success: true, newHotel });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'ADD-NEW-HOTEL');
  }
};

/************************************************************
 * get hotels controller (paginated)
 * @getHotels
 * @param {Request}
 * @method GET
 * @param {Request}
 * @return {Promise<Response>}
 ************************************************************/
export const getHotels = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Calculate the number of documents to skip based on the current page and limit
    const skip = (page - 1) * limit;

    // Fetch the total count of documents in the collection
    const totalCount = await HotelsList.countDocuments();

    // Fetch hotels based on pagination
    const hotels: HotelsListTypes[] = await HotelsList.find()
      .skip(skip)
      .limit(limit);

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalCount / limit);

    // Return the paginated response
    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages,
      totalCount,
      hotels,
    });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'GET-HOTEL');
  }
};

/************************************************************
 * update hotel Controller
 * @updateHotel
 * @method PUT
 * @param {Request}
 * @param {Request}
 * @return {Promise<Response>}
 ************************************************************/
export const updateHotel = async (req: Request, res: Response) => {
  try {
    //check if the user role is Admin
    if (req.user && req.user.role !== 'ADMIN') {
      return res
        .status(401)
        .json({ success: false, message: 'Access denied!' });
    }

    const { hotelId } = req.params;
    //check if hotel id exists
    if (!hotelId) {
      return res
        .status(400)
        .json({ success: false, message: 'Hotel id is required!' });
    }

    const dto: HotelDTO = req.body;
    //validate incoming request DTO
    const updateHotelError = validateHotelDTO(dto);
    if (!updateHotelError) {
      return res.status(400).json(updateHotelError);
    }

    //Find by hotel id and update
    const updatedHotel = await HotelsList.findByIdAndUpdate(
      { _id: hotelId },
      {
        dto,
      },
      { runValidators: true, new: true }
    );
    //return response with the updated data
    return res.status(201).json({ success: true, updatedHotel });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'UPDATE-HOTEL');
  }
};

/************************************************************
 * Remove hotel Controller
 * @updateHotel
 * @method DELETE
 * @param {Request}
 * @param {Request}
 * @return {Promise<Response>}
 ************************************************************/
export const removeHotel = async (req: Request, res: Response) => {
  try {
    //check if the user role is Admin
    if (req.user && req.user.role !== 'ADMIN') {
      return res
        .status(401)
        .json({ success: false, message: 'Access denied!' });
    }

    const { hotelId } = req.params;
    if (!hotelId) {
      return res
        .status(400)
        .json({ success: false, message: 'Hotel id is required!' });
    }
    //find hotel bu id and remove
    const removedHotel = await HotelsList.findByIdAndRemove({ _id: hotelId });
    //send response with removed data
    return res.status(200).json({ success: true, removedHotel });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'REMOVE-HOTEL');
  }
};
