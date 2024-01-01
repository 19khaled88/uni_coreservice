"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterZodValidation = void 0;
const zod_1 = require("zod");
const createSemesterZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum(['Autumn', 'Summer', 'Fall'], {
            required_error: 'title  is required'
        }),
        year: zod_1.z.number({
            required_error: 'year  is required'
        }),
        code: zod_1.z.enum(['01', '02', '03'], {
            required_error: 'code is required'
        }),
        startMonth: zod_1.z.enum(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], {
            required_error: 'startMonth  is required'
        }),
        endMonth: zod_1.z.enum(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], {
            required_error: 'endMonth  is required'
        }),
    })
});
const updateSemesterZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum(['Autumn', 'Summer', 'Fall'], {
            required_error: 'title  is required'
        }).optional(),
        year: zod_1.z.number({
            required_error: 'year  is required'
        }).optional(),
        code: zod_1.z.enum(['01', '02', '03'], {
            required_error: 'code is required'
        }).optional(),
        startMonth: zod_1.z.enum(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], {
            required_error: 'startMonth  is required'
        }).optional(),
        endMonth: zod_1.z.enum(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], {
            required_error: 'endMonth  is required'
        }).optional(),
    })
});
exports.AcademicSemesterZodValidation = {
    createSemesterZodSchema,
    updateSemesterZodSchema
};
