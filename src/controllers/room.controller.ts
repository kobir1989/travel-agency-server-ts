import { Request, Response } from 'express';
import errorResponse from '../helpers/errorResponse.ts';
import Rooms from '../models/hotels/rooms.model.ts';
import {
  RoomDTO,
  validateRoomDTO,
} from '../utils/DTO-validators/validateRoom.ts';

/************************************************************
 * get Rooms controller
 * @getRooms
 * @method GET
 * @param {Request}
 * @param {Request}
 * @return {Promise<Response>}
 ************************************************************/
export const getRooms = async (req: Request, res: Response) => {
  try {
    const { hotelId } = req.params;
    //find all the rooms that metch with hootel id
    const rooms = await Rooms.find({ hotelId: hotelId });

    res.status(200).json({ success: true, rooms });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'GET-ROOMS');
  }
};

/************************************************************
 * add new Room controller
 * @addNewRoom
 * @method POST
 * @param {Request}
 * @param {Request}
 * @return {Promise<Response>}
 ************************************************************/
export const addNewRoom = async (req: Request, res: Response) => {
  try {
    const dto: RoomDTO = req.body;
    //Validate incoming request DTO
    const addRoomError = validateRoomDTO(dto);
    if (!addRoomError) {
      return res.status(400).json(addRoomError);
    }

    // add new room to database
    const newRoom = await Rooms.create({ dto });

    return res.status(201).json({ success: true, newRoom });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'ADD-ROOMS');
  }
};

/************************************************************
 * update Room controller
 * @updateRoom
 * @method PUT
 * @param {Request}
 * @param {Request}
 * @return {Promise<Response>}
 ************************************************************/
export const updateRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    if (!roomId) {
      return res
        .status(400)
        .json({ success: false, message: 'Room id is Requied!' });
    }
    const dto: RoomDTO = req.body;
    //Validate incoming request DTO
    const updateRoomError = validateRoomDTO(dto);
    if (!updateRoomError) {
      return res.status(400).json(updateRoomError);
    }
    // Update existing room with new incoming DTO
    const updatedRoom = await Rooms.findByIdAndUpdate(
      {
        _id: roomId,
      },
      { dto },
      { runValidators: true, new: true }
    );
    return res.status(200).json({ success: true, updatedRoom });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'UPDATE-ROOMS');
  }
};

/************************************************************
 * Remove Room controller
 * @removeRoom
 * @method DELETE
 * @param {Request}
 * @param {Request}
 * @return {Promise<Response>}
 ************************************************************/
export const removeRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    //if room id is not present in the req.body return error response
    if (!roomId) {
      return res
        .status(400)
        .json({ success: false, message: 'Room id is Requied!' });
    }
    const removedRoom = await Rooms.findByIdAndRemove({ _id: roomId });
    return res.status(200).json({ success: true, removedRoom });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'REMOVE-ROOMS');
  }
};
