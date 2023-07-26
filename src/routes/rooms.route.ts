import { Router } from 'express';
import {
  addNewRoom,
  getRooms,
  removeRoom,
  updateRoom,
} from '../controllers/room.controller.ts';

const roomRoutes = Router();

//get rooms (open)
roomRoutes.get('/rooms/:hotelId', getRooms);

//add new room (Admin only)
roomRoutes.post('/add-room', addNewRoom);

//update rooms (Admin only)
roomRoutes.put('/update-room/:roomId', updateRoom);

//delete rooms (Admin only)
roomRoutes.delete('/remove-room/:roomId', removeRoom);

export default roomRoutes;
