import { isValidEmail } from '../emailValidator.ts';

// Define the UserLoginDTO interface for user login
export interface UserLoginDTO {
  email: string;
  password: string;
}

export const validateUserLoginDTO = (dto: UserLoginDTO): object | null => {
  if (!dto.email || !dto.password) {
    return { success: false, message: 'All the fields are mandatory!' };
  }
  if (dto.password.length < 6) {
    return { success: false, message: 'Password too short!' };
  }
  if (!isValidEmail(dto.email)) {
    return { success: false, message: 'Invalid Eamil!' };
  }
  return null;
};
