import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { roomController } from './controller'
import { RoomZodValidation } from './validation'

const router = express()

router.get('/single-room/:id', roomController.singleRoom)
router.put(
  '/update-room/:id',
  validateRequest(RoomZodValidation.updateRoomZodSchema),
  roomController.updateRoom,
)
router.delete('/delete-room/:id', roomController.deleteRoom)
router.post(
  '/create',
  validateRequest(RoomZodValidation.createRoomZodSchema),
  roomController.createRoom,
)

router.get('/all-rooms', roomController.allRooms)

export default router
