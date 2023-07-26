import jwt from 'jsonwebtoken';
import { GenrateTokens } from '../types/authTypes.ts';

// Function to generate token
export const generateToken = ({
  userId,
  userRole,
  duration,
  secret,
  email,
}: GenrateTokens): string => {
  const token = jwt.sign({ _id: userId, role: userRole, email }, secret, {
    expiresIn: duration,
  });
  return token;
};
