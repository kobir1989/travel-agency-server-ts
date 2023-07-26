import User from '../models/users/user.model.ts';
import bcrypt from 'bcrypt';
import errorResponse from '../helpers/errorResponse.ts';
import { Request, Response } from 'express';
import { envConfig } from '../config/envConfig.ts';
import { generateToken } from '../helpers/generateToken.ts';
import { validateUserSignupDTO } from '../utils/DTO-validators/validateUserSignup.ts';
import { validateUserLoginDTO } from '../utils/DTO-validators/validateUserLogin.ts';
import { UserLoginDTO, UserSignupDTO } from '../types/authTypes.ts';
import jwt from 'jsonwebtoken';

/****************************************************************************
 * Signup controller.
 * @Signup
 * @method POST
 * @param {Request} request - The HTTP request object.
 * @param {Response} response - The HTTP response object.
 * @returns {Promise<Response>}
 ***************************************************************************/

//signup controller
export const signup = async (req: Request, res: Response) => {
  try {
    const dto: UserSignupDTO = req.body;
    // Validate the incoming request payload
    const validationError = validateUserSignupDTO(dto);
    if (validationError) {
      return res.status(400).json(validationError);
    }

    //check user email unique or not
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser?.email === dto.email) {
      return res
        .status(400)
        .json({ success: false, message: 'User already exists!' });
    }

    // Encrypt password using bcrypt
    const encryptPassword = await bcrypt.hash(dto.password, 12);

    // Create new user and save it to DB
    const newUser = await User.create({
      name: dto.name,
      age: dto.age,
      gender: dto.gender,
      email: dto.email,
      password: encryptPassword,
    });

    //create access token
    const accessToken = generateToken({
      userId: newUser._id,
      email: newUser.email,
      userRole: newUser.role,
      duration: '1d',
      secret: envConfig.ACCESS_SECRET as string,
    });

    //create refresh token
    const refreshToken = generateToken({
      userId: newUser._id,
      duration: '7d',
      secret: envConfig.REFRESH_SECRET as string,
    });

    //send response with user paylod, accessToken and refresh Token
    return res.status(201).json({
      user: {
        name: newUser.name,
        age: newUser.age,
        email: newUser.email,
        gender: newUser.gender,
      },
      access: accessToken,
      refresh: refreshToken,
    });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'SIGN-UP-CONTROLLER');
  }
};

/****************************************************************************
 * Login Controller
 * @Login
 * @method POST
 * @param {Request} request - The HTTP request object.
 * @param {Response} response - The HTTP response object.
 * @returns {Promise<Response>}
 ***************************************************************************/
export const login = async (req: Request, res: Response) => {
  try {
    const dto: UserLoginDTO = req.body;
    const validationError = validateUserLoginDTO(dto);
    // Validate the incoming request payload
    if (validationError) {
      return res.status(400).json(validationError);
    }

    //get user form DB
    const getUser = await User.findOne({ email: dto.email });

    // Check if user is found
    if (!getUser) {
      return res
        .status(401)
        .json({ success: false, message: 'User not found' });
    }

    //compare password using bcrypt
    const comparePass = await bcrypt.compare(dto.password, getUser.password);
    console.log(comparePass);

    //send 401 response if password is incorrect
    if (!comparePass) {
      return res
        .status(401)
        .json({ success: false, message: 'Incorrect Password!' });
    }

    //create access token
    const accessToken = generateToken({
      userId: getUser._id,
      userRole: getUser.role,
      duration: '1d',
      secret: envConfig.ACCESS_SECRET as string,
    });

    //create refresh token
    const refreshToken = generateToken({
      userId: getUser._id,
      duration: '7d',
      secret: envConfig.REFRESH_SECRET as string,
    });

    //send responses with user payload, access token and refresh token
    return res.status(200).json({
      user: {
        name: getUser.name,
        age: getUser.age,
        email: getUser.email,
        gender: getUser.gender,
      },
      access: accessToken,
      refresh: refreshToken,
    });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'LOGIN');
  }
};

/****************************************************************************
 * Refresh Token Controller
 * @getRefreshToken
 * @method POST
 * @param {Request} request - The HTTP request object.
 * @param {Response} response - The HTTP response object.
 * @returns {Promise<Response>}
 ***************************************************************************/

interface TokenPayload {
  _id: string;
  role: string;
  email: string;
}

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken: string | undefined | null = req?.body?.refreshToken;
    //Check req.body has refreshToken
    if (!refreshToken) {
      return res.status(401).json({ success: false, message: 'Unauthorized!' });
    }

    //verify refresh token
    const verifyRefreshToken = jwt.verify(
      refreshToken,
      envConfig.REFRESH_SECRET as string
    ) as TokenPayload;

    //send 401 status if not valid or tempered
    if (!verifyRefreshToken) {
      return res.status(401).json({ success: false, message: 'Unauthorized!' });
    }

    //generate new access token
    const accessToken = generateToken({
      userId: verifyRefreshToken._id,
      userRole: verifyRefreshToken.role,
      duration: '1d',
      secret: envConfig.ACCESS_SECRET as string,
    });

    //send access token to client
    return res.status(201).json({ success: true, accessToken });
  } catch (error: unknown) {
    errorResponse(res, error as Error, 'GET-REFRESH-TOKEN');
  }
};
