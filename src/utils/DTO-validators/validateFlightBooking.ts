import { FlightBookingDTO } from '../../types/bookingTypes.ts';

export const validateFlightBookingDTO = (
  dto: FlightBookingDTO
): object | null => {
  if (
    !dto.userId ||
    !dto.flightId ||
    !dto.paymentId ||
    !dto.paymentType ||
    !dto.numberOfPassangers ||
    !dto.totalPrice ||
    !dto.flightStatus
  ) {
    return { success: false, message: 'All the fields are mandatory!' };
  }
  if (dto.totalPrice <= 0) {
    return { success: false, message: 'Incorrect Price!' };
  }
  if (dto.numberOfPassangers <= 0) {
    return {
      success: false,
      message: 'Number of passanger must be one or more',
    };
  }
  return null;
};
