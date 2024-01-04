"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSemesterZodValidation = void 0;
const zod_1 = require("zod");
const createSemesterZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        startDate: zod_1.z.string({ required_error: "Start date is required" }),
        endDate: zod_1.z.string({ required_error: "End date is required" }),
        status: zod_1.z.enum(["UPCOMMING", "ONGOING", "ENDED"], {
            required_error: "Statis  is required",
        }),
        minCredit: zod_1.z.number({ required_error: "Minimum credit is required" }),
        maxCredit: zod_1.z.number({ required_error: "Maximum credit is required" }),
        academicSemesterId: zod_1.z.string({ required_error: "Academic semester Id is required" })
    })
});
const updateSemesterZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        roomNumber: zod_1.z.string().optional(),
        floor: zod_1.z.string().optional(),
    })
});
exports.RegisterSemesterZodValidation = {
    createSemesterZodSchema,
    updateSemesterZodSchema
};
