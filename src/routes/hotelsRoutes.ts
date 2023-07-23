import { Router } from 'express';
const hotelRoutes = Router();
import {
  addNewHotel,
  getHotels,
  removeHotel,
  updateHotel,
} from '../controllers/hotelsControllers.ts';

hotelRoutes.get('/hotels-list', getHotels);
hotelRoutes.post('/add-new-hotel', addNewHotel);
hotelRoutes.put('/edit/hotel/:hotelId', updateHotel);
hotelRoutes.delete('/remove/hotel/:hotelId', removeHotel);

export default hotelRoutes;
