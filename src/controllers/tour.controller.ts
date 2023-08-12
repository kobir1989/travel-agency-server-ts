import Tour, { TourTypes } from '../models/tours/tours.model.ts';
import { Request, Response } from 'express';
import errorResponse from '../helpers/errorResponse.ts';
import { validateTourDTO } from '../utils/DTO-validators/validateTour.ts';
import { TourDTO } from '../types/tourTypes.ts';

/************************************************************
 * add new Tour Controller
 * @addNewTour
 * @method POST
 * @param {Request}
 * @param {Request}
 * @return {Promise<Response>}
 ************************************************************/

export const addNewTour = async (req: Request, res: Response) => {
  try {
    // // check if the user role is Admin
    // if (req.user && req.user.role !== 'ADMIN') {
    //   return res
    //     .status(401)
    //     .json({ success: false, message: 'Access denied!' });
    // }

    const dto: TourDTO = req.body;
    //Validate add new tour incoming request DTO
    const addNewTourError = validateTourDTO(dto);
    if (addNewTourError) {
      return res.status(422).json(addNewTourError);
    }

    //add new Tour to database
    const newTour = await Tour.create(dto);

    //response with status 201 and tour object
    res.status(201).json({ success: true, newTour });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'ADD-NEW-TOUR');
  }
};

/************************************************************
 * get tour controller (paginated)
 * @getTours
 * @param {Request}
 * @method GET
 * @param {Request}
 * @return {Promise<Response>}
 ************************************************************/
export const getTours = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Calculate the number of documents to skip based on the current page and limit
    const skip = (page - 1) * limit;

    // Fetch the total count of documents in the collection
    const totalCount = await Tour.countDocuments();

    // Fetch hotels based on pagination
    const tours: TourTypes[] = await Tour.find().skip(skip).limit(limit);

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalCount / limit);

    // Return the paginated response
    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages,
      totalCount,
      tours,
    });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'GET-TOURS');
  }
};
