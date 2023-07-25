import { Document, Schema, model } from 'mongoose';

interface FlightType extends Document {
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

const flightSchema = new Schema<FlightType>({
  airlinesName: {
    type: String,
    required: [true, 'Airlines name is required'],
    trim: true,
    lowercase: true,
  },
  arrivalAirportName: {
    type: String,
    required: [true, 'Arrival Airport name is required'],
    trim: true,
    lowercase: true,
  },
  departureAirportName: {
    type: String,
    required: [true, 'Departure Airport Name is required'],
    trim: true,
    lowercase: true,
  },
  flightNumber: {
    type: String,
    required: [true, 'Flight number is required'],
    trim: true,
    lowercase: true,
  },
  arrivalDate: {
    type: String,
    required: [true, 'Arrival date is required'],
    trim: true,
  },
  departureDate: {
    type: String,
    required: [true, 'Departure date is required'],
    trim: true,
  },
  duration: {
    type: String,
    required: [true, 'Flight Duration is required'],
    trim: true,
  },
  seatAvailability: {
    type: [String],
    required: [true, 'Seat Availability is required'],
  },
  baggage: {
    type: String,
    required: [true, 'Baggage field are required'],
  },
});

const Flight = model<FlightType>('Flight', flightSchema);
export default Flight;
