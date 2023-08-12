import { Document, model, Schema } from 'mongoose';

export interface TourTypes extends Document {
  title: string;
  description: string;
  images: string[];
  location: string;
  startDate: string;
  endDate: string;
  newPrice: number;
  oldPrice: number;
  groupSize: string;
  isKidsFriendly: boolean;
  discount: number;
}

const tourSchema = new Schema<TourTypes>({
  title: {
    type: String,
    required: [true, 'Tour Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Tour Description is required'],
    trim: true,
  },
  images: {
    type: [String],
    required: [true, 'Tour images are required'],
  },
  location: {
    type: String,
    required: [true, 'Tour Location is required'],
  },
  startDate: {
    type: String,
    required: [true, 'Start Date is required'],
  },
  endDate: {
    type: String,
    required: [true, 'End Date is required'],
  },
  newPrice: {
    type: Number,
    required: [true, 'New Price is required'],
  },
  oldPrice: {
    type: Number,
  },
  groupSize: {
    type: String,
    required: [true, 'Tour Group Size is required'],
  },
  isKidsFriendly: {
    type: Boolean,
    required: [true, 'This field are required'],
  },
  discount: {
    type: Number,
  },
});

const Tour = model<TourTypes>('Tour', tourSchema);

export default Tour;
