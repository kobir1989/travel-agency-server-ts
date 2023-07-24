export interface HotelDTO {
  name: string;
  country: string;
  city: string;
  ratings: number;
  availableRoom: string;
  images: string[];
  description: string;
}

export const validateHotelDTO = (dto: HotelDTO): object | null => {
  if (
    !dto.name ||
    !dto.country ||
    !dto.city ||
    !dto.ratings ||
    !dto.availableRoom ||
    !dto.images ||
    !dto.description
  ) {
    return { success: false, message: 'All the fields are mandatory!' };
  }
  return null;
};
