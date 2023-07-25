export interface FlightDTO {
  airlinesName: string;
  arrivalAirportName: string;
  departureAirportName: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  departureDate: string;
  arrivalDate: string;
  duration: string;
  baggage: string;
  seatAvailability: string[];
}

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
