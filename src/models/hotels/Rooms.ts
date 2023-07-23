import { Document, Schema, model } from 'mongoose';

interface RoomsTypes extends Document {
  roomType: string;
  discount: number;
  oldPrice: number;
  currentPrice: number;
  description: string;
  isAvailable: boolean;
  roomCapacity: number;
  hotelId: string;
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
      Type: Schema.Types.ObjectId,
      ref: 'Hotel',
      required: [true, 'Hotel id is required'],
    },
    images: {
      types: Array,
      required: [true, 'Provide al least one image url'],
    },
  },
  {
    timestamps: true,
  }
);

const RoomsModal = model<RoomsTypes>('Room', roomSchema);

export default RoomsModal;
