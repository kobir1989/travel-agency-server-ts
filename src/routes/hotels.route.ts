import { Router } from 'express';
const hotelRoutes = Router();
import {
  addNewHotel,
  getHotels,
  removeHotel,
  updateHotel,
} from '../controllers/hotels.controller.ts';
import { isAuthenticated } from '../middlewares/isAuthenticated.ts';

//get hotels (open)
hotelRoutes.get('/hotels-list', getHotels);

//add new hotel (Admin only)
hotelRoutes.post('/add-new-hotel', isAuthenticated, addNewHotel);

//update hotel (Admin only)
hotelRoutes.put('/edit/hotel/:hotelId', isAuthenticated, updateHotel);

//delete hotel (Admin only)
hotelRoutes.delete('/remove/hotel/:hotelId', removeHotel);

export default hotelRoutes;
