"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyZodValidation = void 0;
const zod_1 = require("zod");
const interface_1 = require("./interface");
const createFacultyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum(interface_1.title, {
            required_error: 'title  is required'
        }),
    })
});
const updateFacultyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum(interface_1.title, {
            required_error: 'title  is required'
        }).optional()
    })
});
exports.AcademicFacultyZodValidation = {
    createFacultyZodSchema,
    updateFacultyZodSchema
};
