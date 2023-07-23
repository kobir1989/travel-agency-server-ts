import { Document, model, Schema, Types } from 'mongoose';

export interface HotelBookingTypes extends Document {
  userId: Types.ObjectId;
  hotelId: Types.ObjectId;
  roomId: Types.ObjectId;
  checkInDate: string;
  checkOutDate: string;
  totalNights: number;
  totalPrice: number;
  numberOfGuests: number;
}

const hotelBookingSchema = new Schema<HotelBookingTypes>({
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: [true, 'User Id is required!'],
  // },
  hotelId: {
    type: Schema.Types.ObjectId,
    ref: 'HotelList',
    required: [true, 'Hotel Id is required!'],
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: [true, 'Room Id is required!'],
  },
  checkInDate: {
    type: String,
    required: [true, 'Check in date is Required'],
  },
  checkOutDate: {
    type: String,
    required: [true, 'Check out date is Required'],
  },
  totalNights: {
    type: Number,
    required: [true, 'Total nighths are required!'],
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price are required'],
  },
  numberOfGuests: {
    type: Number,
    requird: [true, 'Number of Guests are required'],
  },
});

const HotelBookingModel = model<HotelBookingTypes>(
  'HotelBooking',
  hotelBookingSchema
);

export default HotelBookingModel;
