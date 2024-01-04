import { z } from "zod";


const createRoomZodSchema = z.object({
    body: z.object({
        roomNumber: z.string({
            required_error: 'room number  is required'
        }),
        floor: z.string({
            required_error: 'floor  is required'
        }),

    })
})

const updateRoomZodSchema = z.object({
    body: z.object({
        roomNumber: z.string().optional(),
        floor: z.string().optional(),

    })
})



export const RoomZodValidation = {
    createRoomZodSchema,
    updateRoomZodSchema
}