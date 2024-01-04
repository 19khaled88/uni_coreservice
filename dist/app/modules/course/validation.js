"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseZodValidation = void 0;
const zod_1 = require("zod");
const CreateCourseZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "title is required" }),
        code: zod_1.z.string({ required_error: 'code is required' }),
        credits: zod_1.z.number({ required_error: 'credits is reqquired' }),
        preRequisiteCourses: zod_1.z.array(zod_1.z.object({}), {
            required_error: ''
        }).optional()
    })
});
const CourseOrFacultyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        faculties: zod_1.z.array(zod_1.z.string(), {
            required_error: 'faculties are required'
        })
    })
});
exports.CourseZodValidation = {
    CourseOrFacultyZodSchema,
    CreateCourseZodSchema
};
