import { z } from "zod";

const createFacultyZodSchema = z.object({
  body: z.object({
    facultyId: z.string({
      required_error: "faculty id is required",
    }),
    firstName: z.string({
      required_error: "first name  is required",
    }),
    lastName: z.string({
      required_error: "last name  is required",
    }),
    middleName: z.string({
      required_error: "middle name is required",
    }),
    email: z.string({
      required_error: "email  is required",
    }),
    contactNo: z.string({
      required_error: "contact no  is required",
    }),
    gender: z.enum(["male", "female"] as [string, ...string[]], {
      required_error: "gender  is required",
    }),
    bloodGroup: z.enum(
      ["O+", "O-", "AB+", "AB-", "B+", "B-", "A+", "A-"] as [
        string,
        ...string[],
      ],
      {
        required_error: "blood group  is required",
      }
    ),
  }),
});

const updateFacultyZodSchema = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    middleName: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
    gender: z.enum(["male", "female"] as [string, ...string[]]).optional(),
    bloodGroup: z
      .enum(["O+", "O-", "AB+", "AB-", "B+", "B-", "A+", "A-"] as [
        string,
        ...string[],
      ])
      .optional(),
  }),
});

const CourseOrFacultyZodSchema=z.object({
  body:z.object({
    courses:z.array(z.string(),{
      required_error:'Courses are required'
    })
  })
})
export const FacultyZodValidation = {
  createFacultyZodSchema,
  updateFacultyZodSchema,
  CourseOrFacultyZodSchema
};
