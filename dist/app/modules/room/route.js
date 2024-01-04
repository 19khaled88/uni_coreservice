"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const controller_1 = require("./controller");
const validation_1 = require("./validation");
const router = (0, express_1.default)();
router.get('/single-room/:id', controller_1.roomController.singleRoom);
router.put('/update-room/:id', (0, validateRequest_1.default)(validation_1.RoomZodValidation.updateRoomZodSchema), controller_1.roomController.updateRoom);
router.delete('/delete-room/:id', controller_1.roomController.deleteRoom);
router.post('/create', (0, validateRequest_1.default)(validation_1.RoomZodValidation.createRoomZodSchema), controller_1.roomController.createRoom);
router.get('/all-rooms', controller_1.roomController.allRooms);
exports.default = router;
