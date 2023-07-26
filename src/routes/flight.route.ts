import { Router } from 'express';
import {
  addNewFlight,
  getFligths,
  removeFlight,
  updateFlight,
} from '../controllers/flght.controller.ts';
import { isAuthenticated } from '../middlewares/isAuthenticated.ts';

const flightRoutes = Router();

//get flights (open)
flightRoutes.get('/flights', getFligths);

//add new flight (Admin only)
flightRoutes.post('/add-new-flight', isAuthenticated, addNewFlight);

//update flights (Admin only)
flightRoutes.put('/update-flight/:flightId', isAuthenticated, updateFlight);

//delete flights (Admin only)
flightRoutes.delete('/remove-flight/:flightId', removeFlight);

export default flightRoutes;
