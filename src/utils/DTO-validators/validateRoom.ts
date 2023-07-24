export interface RoomDTO {
  roomType: string;
  discount: number;
  oldPrice: number;
  currentPrice: number;
  description: string;
  isAvailable: boolean;
  roomCapacity: number;
  hotelId: string;
  images: string[];
}

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
