import { Document, Schema, model } from 'mongoose';

interface HotelsListTypes extends Document {
  name: string;
  country: string;
  city: string;
  ratings: number;
  availableRoom: number;
  images: string[];
  HotelDescription: string;
}

const hotelListSchema = new Schema<HotelsListTypes>(
  {
    name: {
      type: String,
      required: [true, 'Hotle name is required'],
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    ratings: {
      type: Number,
      required: [true, 'Ratings is required'],
    },
    availableRoom: {
      type: Number,
      required: [true, 'Aailable Room is required'],
    },
    images: {
      type: [String],
      required: [true, 'Images is required'],
    },
    HotelDescription: {
      types: String,
      required: [true, 'Description is required'],
    },
  },
  {
    timestamps: true,
  }
);

const HotelsList = model<HotelsListTypes>('HotelList', hotelListSchema);

export default HotelsList;
