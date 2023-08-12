import { HotelDTO } from '../../types/hotelTypes.ts';

export const validateHotelDTO = (dto: HotelDTO): object | null => {
  if (
    !dto.name ||
    !dto.country ||
    !dto.city ||
    !dto.ratings ||
    !dto.nearby ||
    !dto.facilities ||
    !dto.images ||
    !dto.description
  ) {
    return { success: false, message: 'All the fields are mandatory!' };
  }
  return null;
};
