import { Document, Schema, model } from 'mongoose';

export interface UserTypes extends Document {
  name: string;
  email: string;
  password: string;
  age: string;
  role: string;
  gender: string;
}

enum AuthRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

const userSchema = new Schema<UserTypes>({
  name: {
    type: String,
    required: [true, 'User name is Required'],
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, 'Email is Required'],
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is Required'],
    minlength: 6,
  },
  age: {
    type: String,
    required: [true, 'Age is Required'],
    trim: true,
  },
  role: {
    type: String,
    required: [true, 'User Role is Required'],
    enum: Object.values(AuthRole),
    default: AuthRole.USER,
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
  },
});

const User = model<UserTypes>('User', userSchema);

export default User;
