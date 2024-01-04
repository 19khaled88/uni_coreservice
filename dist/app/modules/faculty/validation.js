"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyZodValidation = void 0;
const zod_1 = require("zod");
const createFacultyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        facultyId: zod_1.z.string({
            required_error: "faculty id is required",
        }),
        firstName: zod_1.z.string({
            required_error: "first name  is required",
        }),
        lastName: zod_1.z.string({
            required_error: "last name  is required",
        }),
        middleName: zod_1.z.string({
            required_error: "middle name is required",
        }),
        email: zod_1.z.string({
            required_error: "email  is required",
        }),
        contactNo: zod_1.z.string({
            required_error: "contact no  is required",
        }),
        gender: zod_1.z.enum(["male", "female"], {
            required_error: "gender  is required",
        }),
        bloodGroup: zod_1.z.enum(["O+", "O-", "AB+", "AB-", "B+", "B-", "A+", "A-"], {
            required_error: "blood group  is required",
        }),
    }),
});
const updateFacultyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
        middleName: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        gender: zod_1.z.enum(["male", "female"]).optional(),
        bloodGroup: zod_1.z
            .enum(["O+", "O-", "AB+", "AB-", "B+", "B-", "A+", "A-"])
            .optional(),
    }),
});
const CourseOrFacultyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        courses: zod_1.z.array(zod_1.z.string(), {
            required_error: 'Courses are required'
        })
    })
});
exports.FacultyZodValidation = {
    createFacultyZodSchema,
    updateFacultyZodSchema,
    CourseOrFacultyZodSchema
};
