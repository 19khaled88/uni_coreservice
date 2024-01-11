"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseSectionZodValidation = void 0;
const zod_1 = require("zod");
const createZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        sectionName: zod_1.z.string({ required_error: "Course id is required" }),
        offeredCourseId: zod_1.z.string({
            required_error: "offiered course id required",
        }),
        maxCapacity: zod_1.z.number({ required_error: "maximum capacity required" }),
    }),
});
exports.OfferedCourseSectionZodValidation = {
    createZodValidation,
};
