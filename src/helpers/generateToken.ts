import jwt from 'jsonwebtoken';

type Token = {
  userId: string;
  userRole?: string;
  duration: string;
  secret: string;
};

// Function to generate token
export const generateToken = ({
  userId,
  userRole,
  duration,
  secret,
}: Token): string => {
  const token = jwt.sign({ _id: userId, role: userRole }, secret, {
    expiresIn: duration,
  });
  return token;
};
