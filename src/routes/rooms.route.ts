import { Router } from 'express';
import {
  addNewRoom,
  getRooms,
  removeRoom,
  updateRoom,
} from '../controllers/room.controller.ts';

const roomRoutes = Router();

roomRoutes.get('/rooms/:hotelId', getRooms);
roomRoutes.post('/add-room', addNewRoom); //Protected admin only
roomRoutes.put('/update-room/:roomId', updateRoom); //Protected admin only
roomRoutes.delete('/remove-room/:roomId', removeRoom); //Protected admin only

export default roomRoutes;
