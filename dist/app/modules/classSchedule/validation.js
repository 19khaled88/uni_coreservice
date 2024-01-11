"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassScheduleZodValidation = void 0;
const zod_1 = require("zod");
const createZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        startTime: zod_1.z.string({ required_error: "Start date is required" }),
        endTime: zod_1.z.string({
            required_error: "End date id required",
        }),
        dayOfWeek: zod_1.z.enum([
            "SATURDAY",
            "SUNDAY",
            "MONDAY",
            "TUESDAY",
            "WEDNESDAY",
            "THURSDAY",
            "FRIDAY",
        ], { required_error: "day of week must be required" }),
        offeredCourseSectionId: zod_1.z.string({
            required_error: "offered course id is required",
        }),
        semesterRegistrationId: zod_1.z.string({
            required_error: "Semester registration id is required",
        }),
        roomId: zod_1.z.string({
            required_error: "Room id is required",
        }),
        facultyId: zod_1.z.string({
            required_error: "Faculty id is required",
        }),
    }),
});
exports.ClassScheduleZodValidation = {
    createZodValidation,
};
