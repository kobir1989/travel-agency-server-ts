import errorResponse from '../helpers/errorResponse.ts';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { envConfig } from '../config/envConfig.ts';
import User from '../models/users/user.model.ts';
import { TokenPayload } from '../types/authTypes.ts';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: TokenPayload; // Replace 'User' with the actual type/interface for your user object
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = '';

    //check if req.headears has Bearer token (access token)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'You are not authorized!' });
    }
    //verify token also add type assertion as typescript can't inference the type of the tokenPayload

    const verifyToken = jwt.verify(
      token,
      envConfig.ACCESS_SECRET as string
    ) as TokenPayload;

    //get user form DB
    const user = await User.findById(verifyToken._id, '_id role email');
    //if user does not exists that means token has been tampered, send 401 response
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'You are not authorized!' });
    }
    //add user to request object
    req.user = user;
    next();
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'IS-AUTHENTICATED-MIDDLEWARE');
  }
};
