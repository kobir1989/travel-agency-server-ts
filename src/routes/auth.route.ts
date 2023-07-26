import { Router } from 'express';
import { login, refreshToken, signup } from '../controllers/auth.controller.ts';

const authRoutes = Router();

authRoutes.post('/auth/login', login);
authRoutes.post('/auth/signup', signup);
//refresh token (protected)
authRoutes.post('/auth/refresh-token', refreshToken);

export default authRoutes;
