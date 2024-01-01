"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentZodValidation = void 0;
const zod_1 = require("zod");
const createDepartmentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title  is required'
        }),
        academicFaculty: zod_1.z.string({
            required_error: 'academic faculty referrence number required'
        })
    })
});
const updateDepartmentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title  is required'
        }).optional(),
        academicFaculty: zod_1.z.string({
            required_error: 'academic faculty referrence number required'
        }).optional()
    })
});
exports.AcademicDepartmentZodValidation = {
    createDepartmentZodSchema,
    updateDepartmentZodSchema
};
