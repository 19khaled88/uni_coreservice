"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseZodValidation = void 0;
const zod_1 = require("zod");
const createZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        courseIds: zod_1.z.array(zod_1.z.string({
            required_error: 'Course id is required'
        }), {
            required_error: 'Course ids are required'
        }),
        academicDepartmentId: zod_1.z.string({ required_error: 'Academic department id required' }),
        semesterRegistrationId: zod_1.z.string({ required_error: 'Semester registration id required' })
    })
});
exports.OfferedCourseZodValidation = {
    createZodValidation
};
