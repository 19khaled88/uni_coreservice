import { z } from "zod";
import { title } from "./interface";


const createFacultyZodSchema = z.object({
    body: z.object({
        title: z.enum(title as [string, ...string[]],{
            required_error: 'title  is required'
        }),
    })
})

const updateFacultyZodSchema = z.object({
    body: z.object({
        title: z.enum(title as [string, ...string[]],{
            required_error: 'title  is required'
        }).optional()
    })
})



export const AcademicFacultyZodValidation = {
    createFacultyZodSchema,
    updateFacultyZodSchema
}