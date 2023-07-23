import HotelsList from '../models/hotels/hotelList.ts';
import { Request, Response } from 'express';
import errorResponse from '../helpers/errorResponse.ts';
import { HotelsListTypes } from '../models/hotels/hotelList.ts';

//add new hotel
export const addNewHotel = async (req: Request, res: Response) => {
  try {
    const {
      name,
      country,
      city,
      ratings,
      availableRoom,
      images,
      description,
    }: HotelsListTypes = req.body;
    //validate req.body
    if (
      !name ||
      !country ||
      !city ||
      !ratings ||
      !availableRoom ||
      !images ||
      !description
    ) {
      //return error response if any fields are missing
      return res.status(400).json('All the fields are mendatory');
    }

    //add new hotel to database
    const newHotel = await HotelsList.create({
      name,
      country,
      city,
      ratings,
      availableRoom,
      images,
      description,
    });

    //response with status 201 and hotel object
    res.status(201).json(newHotel);
  } catch (error) {
    console.log(error);
    errorResponse(
      res,
      {
        statusCode: 500,
        message: 'Something went wrong',
      },
      'CREATE-NEW-HOTEL'
    );
  }
};

//get hotels (paginated)
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
      currentPage: page,
      totalPages,
      totalCount,
      hotels,
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error caught:', error);
    errorResponse(
      res,
      {
        statusCode: 500,
        message: 'Something went wrong',
      },
      'GET HOTELS'
    );
  }
};

//update hotel
export const updateHotel = async (req: Request, res: Response) => {
  try {
    const { hotelId } = req.params;
    if (!hotelId) {
      return res.status(400).json('Hotel id is required!');
    }
    const {
      name,
      country,
      city,
      ratings,
      availableRoom,
      images,
      description,
    }: HotelsListTypes = req.body;
    //validate req.body
    if (
      !name ||
      !country ||
      !city ||
      !ratings ||
      !availableRoom ||
      !images ||
      !description
    ) {
      //return error response if any fields are missing
      return res.status(400).json('All the fields are mendatory');
    }
    //Find by hotel id and update
    const updatedHotel = await HotelsList.findByIdAndUpdate(
      { _id: hotelId },
      { name, country, city, ratings, availableRoom, images, description },
      { runValidators: true, new: true }
    );
    //return response with the updated data
    return res.status(201).json(updatedHotel);
  } catch (error) {
    errorResponse(
      res,
      {
        statusCode: 500,
        message: 'Something went wrong',
      },
      'UPDATE_HOTEL'
    );
  }
};

//Remove hotel from database
export const removeHotel = async (req: Request, res: Response) => {
  try {
    const { hotelId } = req.params;
    if (!hotelId) {
      return res.status(400).json('Hotel id is required!');
    }
    //find hotel bu id and remove
    const removedHotel = await HotelsList.findByIdAndRemove({ _id: hotelId });
    //send response with removed data
    return res.status(200).json(removedHotel);
  } catch (error) {
    errorResponse(
      res,
      {
        statusCode: 500,
        message: 'Something went wrong',
      },
      'DELETE-HOTELS'
    );
  }
};
