import { Router } from 'express';
const authRoutes = Router();

authRoutes.post('/auth/login');
authRoutes.post('/auth/signup');

export default authRoutes;
