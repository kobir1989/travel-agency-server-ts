import { Router } from 'express';
import { addNewTour, getTours } from '../controllers/tour.controller.ts';

const tourRoutes = Router();

//Post tour (admin only)
tourRoutes.post('/add-new-tour', addNewTour);
tourRoutes.get('/tours', getTours);

export default tourRoutes;
