import { Router } from 'express';
const hotelRoutes = Router();
import {
  addNewHotel,
  getHotels,
  removeHotel,
  updateHotel,
} from '../controllers/hotels.controller.ts';

hotelRoutes.get('/hotels-list', getHotels);
hotelRoutes.post('/add-new-hotel', addNewHotel); //Protected admin only
hotelRoutes.put('/edit/hotel/:hotelId', updateHotel); //Protected admin only
hotelRoutes.delete('/remove/hotel/:hotelId', removeHotel); //Protected admin only

export default hotelRoutes;
