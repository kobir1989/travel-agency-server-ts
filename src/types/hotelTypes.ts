//hotel incoming request data types
export interface HotelDTO {
  name: string;
  country: string;
  city: string;
  ratings: number;
  availableRoom: string;
  images: string[];
  description: string;
}
