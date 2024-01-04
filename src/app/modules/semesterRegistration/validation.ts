import { z } from "zod";


const createSemesterZodSchema = z.object({
    body: z.object({
        startDate:z.string({required_error:"Start date is required"}),
        endDate:z.string({required_error:"End date is required"}),
        
        status: z.enum(["UPCOMMING", "ONGOING","ENDED"] as [string, ...string[]], {
            required_error: "Statis  is required",
          }),
        minCredit:z.number({required_error:"Minimum credit is required"}),
        maxCredit:z.number({required_error:"Maximum credit is required"}),
       
        academicSemesterId:z.string({required_error:"Academic semester Id is required"})

    })
})

const updateSemesterZodSchema = z.object({
    body: z.object({
        roomNumber: z.string().optional(),
        floor: z.string().optional(),

    })
})



export const RegisterSemesterZodValidation = {
    createSemesterZodSchema,
    updateSemesterZodSchema
}