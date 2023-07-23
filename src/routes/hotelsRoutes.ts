import { Router } from 'express';
const hotelRoute = Router();
import {
  addNewHotel,
  getHotels,
  removeHotel,
  updateHotel,
} from '../controllers/hotelsControllers.ts';

hotelRoute.get('/hotels-list', getHotels);
hotelRoute.post('/add-new-hotel', addNewHotel);
hotelRoute.put('/edit/hotel/:hotelId', updateHotel);
hotelRoute.delete('/remove/hotel/:hotelId', removeHotel);

export default hotelRoute;
