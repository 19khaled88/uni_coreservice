

import { z } from "zod";

const CreateCourseZodSchema=z.object({
    body:z.object({
        title:z.string({required_error:"title is required"}),
        code:z.string({required_error:'code is required'}),
        credits:z.number({required_error:'credits is reqquired'}),
        preRequisiteCourses:z.array(z.object({}),{
            required_error:''
        }).optional()
    })
})

const CourseOrFacultyZodSchema=z.object({
  body:z.object({
    faculties:z.array(z.string(),{
      required_error:'faculties are required'
    })
  })
})
export const CourseZodValidation = {
  CourseOrFacultyZodSchema,
  CreateCourseZodSchema
};
