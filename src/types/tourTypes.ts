export interface TourDTO {
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
