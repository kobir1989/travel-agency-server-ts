import { Router } from 'express';
import {
  addNewRoom,
  getRooms,
  removeRoom,
  updateRoom,
} from '../controllers/roomControllers.ts';

const roomRoutes = Router();

roomRoutes.get('/rooms/:hotelId', getRooms);
roomRoutes.post('/add-room', addNewRoom);
roomRoutes.put('/update-room/:roomId', updateRoom);
roomRoutes.delete('/remove-room/:roomId', removeRoom);

export default roomRoutes;
