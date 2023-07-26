//flight booking incoming request data types
export interface FlightBookingDTO {
  userId: string;
  flightId: string;
  paymentId: string;
  paymentType: string;
  numberOfPassangers: number;
  totalPrice: number;
  flightStatus: string;
}

//hotel booking incoming request data types
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
