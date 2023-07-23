import { Request, Response } from 'express';
import errorResponse from '../helpers/errorResponse.ts';
import RoomsModal, { RoomsTypes } from '../models/hotels/Rooms.ts';

//get all the rooms related to hotels
export const getRooms = async (req: Request, res: Response) => {
  try {
    const { hotelId } = req.params;
    //find all the rooms that metch with hootel id
    const rooms = await RoomsModal.find({ hotelId: hotelId });

    res.status(200).json(rooms);
  } catch (error) {
    errorResponse(
      res,
      {
        statusCode: 500,
        message: 'Something went wrong',
      },
      'GET-ROOMS'
    );
  }
};

//add new room
export const addNewRoom = async (req: Request, res: Response) => {
  try {
    const {
      roomType,
      discount,
      oldPrice,
      currentPrice,
      description,
      isAvailable,
      roomCapacity,
      hotelId,
      images,
    }: RoomsTypes = req.body;
    //check if all the required fields are presnt in the req.body
    if (
      !roomType ||
      !currentPrice ||
      !description ||
      !isAvailable ||
      !roomCapacity ||
      !hotelId ||
      !images
    ) {
      return res.status(400).json('All the fields are required!');
    }
    // add new room to database
    const newRoom = await RoomsModal.create({
      roomType,
      discount,
      oldPrice,
      currentPrice,
      description,
      isAvailable,
      roomCapacity,
      hotelId,
      images,
    });
    return res.status(201).json(newRoom);
  } catch (error) {
    errorResponse(
      res,
      {
        statusCode: 500,
        message: 'Something went wrong',
      },
      'ADD-ROOMS'
    );
  }
};

//update existing room
export const updateRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    if (!roomId) {
      return res.status(400).json('Room id is Requied!');
    }
    const {
      roomType,
      discount,
      oldPrice,
      currentPrice,
      description,
      isAvailable,
      roomCapacity,
      hotelId,
      images,
    }: RoomsTypes = req.body;
    //check if all the required fields are present in the req.body
    if (
      !roomType ||
      !currentPrice ||
      !description ||
      !isAvailable ||
      !roomCapacity ||
      !hotelId ||
      !images
    ) {
      return res.status(400).json('All the fields are required!');
    }
    // add new room to database
    const updatedRoom = await RoomsModal.findByIdAndUpdate(
      {
        _id: roomId,
      },
      {
        roomType,
        discount,
        oldPrice,
        currentPrice,
        description,
        isAvailable,
        roomCapacity,
        hotelId,
        images,
      },
      { runValidators: true, new: true }
    );
    return res.status(200).json(updatedRoom);
  } catch (error) {
    errorResponse(
      res,
      {
        statusCode: 500,
        message: 'Something went wrong',
      },
      'ADD-ROOMS'
    );
  }
};

//remove Room
export const removeRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    //if room id is not present in the req.body return error response
    if (!roomId) {
      return res.status(400).json('Room id is Requied!');
    }
    const removedRoom = await RoomsModal.findByIdAndRemove({ _id: roomId });
    return res.status(200).json(removedRoom);
  } catch (erro) {
    errorResponse(
      res,
      {
        statusCode: 500,
        message: 'Something went wrong',
      },
      'ADD-ROOMS'
    );
  }
};
