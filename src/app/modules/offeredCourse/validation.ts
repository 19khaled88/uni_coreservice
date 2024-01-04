import { z } from "zod";


const createZodValidation=z.object({
    body:z.object({
        courseIds:z.array(z.string({
            required_error:'Course id is required'
        }),{
            required_error:'Course ids are required'
        }),
        academicDepartmentId:z.string({required_error:'Academic department id required'}),
        semesterRegistrationId:z.string({required_error:'Semester registration id required'})
    })
})


export const OfferedCourseZodValidation ={
    createZodValidation
}