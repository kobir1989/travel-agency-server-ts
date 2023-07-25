export interface HotelBookingDTO {
  userId: string;
  hotelId: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  totalNights: number;
  totalPrice: number;
  numberOfGuests: number;
}

export const validateHotelBookingDTO = (
  dto: HotelBookingDTO
): object | null => {
  if (
    !dto.userId ||
    !dto.hotelId ||
    !dto.roomId ||
    !dto.checkInDate ||
    !dto.totalNights ||
    !dto.checkOutDate ||
    !dto.totalPrice ||
    !dto.numberOfGuests
  ) {
    return { success: false, message: 'All the fields are mandatory!' };
  }

  return null;
};