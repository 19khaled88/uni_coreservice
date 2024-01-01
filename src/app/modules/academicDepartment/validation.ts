import { z } from "zod";



const createDepartmentZodSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: 'title  is required'
        }),
        academicFaculty:z.string({
            required_error:'academic faculty referrence number required'
        })
    })
})

const updateDepartmentZodSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: 'title  is required'
        }).optional(),
        academicFaculty:z.string({
            required_error:'academic faculty referrence number required'
        }).optional()
    })
})



export const AcademicDepartmentZodValidation = {
    createDepartmentZodSchema,
    updateDepartmentZodSchema
}