import { Router } from 'express';
import { login, refreshToken, signup } from '../controllers/auth.controller.ts';
// import { isAuthenticated } from '../middlewares/isAuthenticated.ts';
const authRoutes = Router();

authRoutes.post('/auth/login', login);
authRoutes.post('/auth/signup', signup);
authRoutes.post('/auth/refresh-token', refreshToken);

export default authRoutes;
