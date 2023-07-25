import { Router } from 'express';
import {
  addNewFlight,
  getFligths,
  removeFlight,
  updateFlight,
} from '../controllers/flght.controller.ts';

const flightRoutes = Router();

flightRoutes.get('/flights', getFligths);
flightRoutes.post('/add-new-flight', addNewFlight); //Protected
flightRoutes.put('/update-flight/:flightId', updateFlight); //Protected
flightRoutes.delete('/remove-flight/:flightId', removeFlight); //Protected

export default flightRoutes;
