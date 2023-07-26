//rooms incoming request data types
export interface RoomDTO {
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
