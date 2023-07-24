import { Request, Response } from 'express';
import errorResponse from '../helpers/errorResponse.ts';
import RoomsModal from '../models/hotels/Rooms.ts';
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
    const rooms = await RoomsModal.find({ hotelId: hotelId });

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
    const newRoom = await RoomsModal.create({
      roomType: dto.roomType,
      discount: dto.discount,
      oldPrice: dto.oldPrice,
      currentPrice: dto.currentPrice,
      description: dto.description,
      isAvailable: dto.isAvailable,
      roomCapacity: dto.roomCapacity,
      hotelId: dto.hotelId,
      images: dto.images,
    });

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
    const updatedRoom = await RoomsModal.findByIdAndUpdate(
      {
        _id: roomId,
      },
      {
        roomType: dto.roomType,
        discount: dto.discount,
        oldPrice: dto.oldPrice,
        currentPrice: dto.currentPrice,
        description: dto.description,
        isAvailable: dto.isAvailable,
        roomCapacity: dto.roomCapacity,
        hotelId: dto.hotelId,
        images: dto.images,
      },
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
    const removedRoom = await RoomsModal.findByIdAndRemove({ _id: roomId });
    return res.status(200).json({ success: true, removedRoom });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'REMOVE-ROOMS');
  }
};
