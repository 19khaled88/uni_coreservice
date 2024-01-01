import { z } from "zod";


const createSemesterZodSchema = z.object({
    body: z.object({
        title: z.enum(['Autumn', 'Summer', 'Fall'] as [string, ...string[]],{
            required_error: 'title  is required'
        }),
        year: z.number({
            required_error: 'year  is required'
        }),
        code: z.enum( ['01', '02', '03'] as [string, ...string[]],{
            required_error: 'code is required'
        }),
        startMonth: z.enum(['January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' ,'November' ,'December'] as [string, ...string[]],{
            required_error: 'startMonth  is required'
        }),
        endMonth: z.enum(['January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' ,'November' ,'December'] as [string, ...string[]],{
            required_error: 'endMonth  is required'
        }),

    })
})

const updateSemesterZodSchema = z.object({
    body: z.object({
        title: z.enum(['Autumn', 'Summer', 'Fall'] as [string, ...string[]],{
            required_error: 'title  is required'
        }).optional(),
        year: z.number({
            required_error: 'year  is required'
        }).optional(),
        code: z.enum( ['01', '02', '03'] as [string, ...string[]],{
            required_error: 'code is required'
        }).optional(),
        startMonth: z.enum(['January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' ,'November' ,'December'] as [string, ...string[]],{
            required_error: 'startMonth  is required'
        }).optional(),
        endMonth: z.enum(['January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' ,'November' ,'December'] as [string, ...string[]],{
            required_error: 'endMonth  is required'
        }).optional(),

    })
})



export const AcademicSemesterZodValidation = {
    createSemesterZodSchema,
    updateSemesterZodSchema
}