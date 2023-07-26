import { Document, Schema, model, Types } from 'mongoose';

export interface RoomsTypes extends Document {
  roomType: string;
  discount: number;
  oldPrice: number;
  currentPrice: number;
  description: string;
  isAvailable: boolean;
  roomCapacity: number;
  hotelId: Types.ObjectId;
  images: string[];
}

const roomSchema = new Schema<RoomsTypes>(
  {
    roomType: {
      type: String,
      required: [true, 'Room type is required'],
      trim: true,
    },
    discount: {
      type: Number,
    },
    oldPrice: {
      type: Number,
    },
    currentPrice: {
      type: Number,
      required: [true, 'Currrent Price is Required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    isAvailable: {
      type: Boolean,
      required: [true, 'Is Available, Provide a Boolean value'],
    },
    roomCapacity: {
      type: Number,
    },
    hotelId: {
      type: Schema.Types.ObjectId,
      ref: 'HotelList',
      required: [true, 'Hotel id is required'],
    },
    images: {
      type: [String],
      required: [true, 'Provide at least one image url'],
    },
  },
  {
    timestamps: true,
  }
);

const Rooms = model<RoomsTypes>('Rooms', roomSchema);

export default Rooms;
