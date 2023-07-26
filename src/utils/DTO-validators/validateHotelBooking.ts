import { HotelBookingDTO } from '../../types/bookingTypes.ts';

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
