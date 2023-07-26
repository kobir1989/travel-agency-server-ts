import { RoomDTO } from '../../types/roomTypes.ts';

export const validateRoomDTO = (dto: RoomDTO): object | null => {
  if (
    !dto.roomType ||
    !dto.discount ||
    !dto.oldPrice ||
    !dto.currentPrice ||
    !dto.description ||
    !dto.isAvailable ||
    !dto.roomCapacity ||
    !dto.hotelId ||
    !dto.images
  ) {
    return { success: false, message: 'All the fields are required!' };
  }
  return null;
};
