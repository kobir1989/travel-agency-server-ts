import { TourDTO } from '../../types/tourTypes.ts';

export const validateTourDTO = (dto?: TourDTO): object | null => {
  if (
    !dto?.title ||
    !dto?.description ||
    !dto?.discount ||
    !dto?.groupSize ||
    !dto?.startDate ||
    !dto?.endDate ||
    !dto?.images ||
    !dto?.isKidsFriendly ||
    !dto?.oldPrice ||
    !dto?.location ||
    !dto?.newPrice
  ) {
    return { success: false, message: 'All the fields are mendatory' };
  }

  return null;
};
