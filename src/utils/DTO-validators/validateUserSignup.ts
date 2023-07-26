import { isValidEmail } from '../emailValidator.ts';
import { UserSignupDTO } from '../../types/authTypes.ts';

export const validateUserSignupDTO = (dto: UserSignupDTO): object | null => {
  if (!dto.name || !dto.age || !dto.gender || !dto.email || !dto.password) {
    return { success: false, message: 'All fields are mandatory' };
  }

  if (dto.password.length < 6) {
    return { success: false, message: 'Password too short' };
  }
  if (!isValidEmail(dto.email)) {
    return { success: false, message: 'Invalid email!' };
  }
  return null; // No validation errors
};
