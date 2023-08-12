//hotel incoming request data types
export interface HotelDTO {
  name: string;
  country: string;
  city: string;
  ratings: number;
  nearby: string;
  facilities: string;
  images: string[];
  description: string;
}
