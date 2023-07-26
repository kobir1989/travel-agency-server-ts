import { FlightDTO } from '../../types/flightTypes.ts';

export const validateFlightDTO = (dto?: FlightDTO): object | null => {
  if (
    !dto?.airlinesName ||
    !dto?.arrivalAirportName ||
    !dto?.departureAirportName ||
    !dto?.flightNumber ||
    !dto?.departure ||
    !dto?.arrival ||
    !dto?.departureDate ||
    !dto?.duration ||
    !dto?.baggage ||
    !dto?.seatAvailability
  ) {
    return { success: false, message: 'All the fields are mendatory' };
  }

  return null;
};
