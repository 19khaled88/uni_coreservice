import { z } from "zod";

const createStudentZodSchema = z.object({
  body: z.object({
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

const updateStudentZodSchema = z.object({
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

export const StudentZodValidation = {
  createStudentZodSchema,
  updateStudentZodSchema,
};
