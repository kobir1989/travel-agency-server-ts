//user login incoming request data types
export interface UserLoginDTO {
  email: string;
  password: string;
}

//user signup incoming request data types
export interface UserSignupDTO {
  name: string;
  age: number;
  gender: string;
  email: string;
  password: string;
}

//jwt token payload types
export interface TokenPayload {
  _id: string;
  role: string;
  email: string;
}

//Token
export type GenrateTokens = {
  userId: string;
  userRole?: string;
  duration: string;
  secret: string;
  email?: string;
};
