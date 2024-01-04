"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomZodValidation = void 0;
const zod_1 = require("zod");
const createRoomZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        roomNumber: zod_1.z.string({
            required_error: 'room number  is required'
        }),
        floor: zod_1.z.string({
            required_error: 'floor  is required'
        }),
    })
});
const updateRoomZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        roomNumber: zod_1.z.string().optional(),
        floor: zod_1.z.string().optional(),
    })
});
exports.RoomZodValidation = {
    createRoomZodSchema,
    updateRoomZodSchema
};
