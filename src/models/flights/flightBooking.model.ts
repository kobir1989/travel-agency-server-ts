import { Document, Schema, model, Types } from 'mongoose';

interface FlightBookingTypes extends Document {
  userId: Types.ObjectId;
  flightId: Types.ObjectId;
  paymentId: string;
  paymentType: string;
  numberOfPassangers: number;
  totalPrice: number;
  flightStatus: string;
}

enum FlightStatus {
  CONFIRMED = 'confirmed',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
}

const flightBookingSchema = new Schema<FlightBookingTypes>({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
  },
  flightId: {
    type: Schema.Types.ObjectId,
    require: [true, 'Flight id is required'],
  },
  paymentId: {
    type: String,
    required: [true, 'Payment id is requried'],
    unique: true,
  },
  numberOfPassangers: {
    type: Number,
    required: [true, 'Number of Passangers are required'],
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
  },
  flightStatus: {
    type: String,
    enum: Object.values(FlightStatus),
    default: FlightStatus.PENDING,
  },
});

const FlightBooking = model<FlightBookingTypes>(
  'FlightBooking',
  flightBookingSchema
);

export default FlightBooking;
