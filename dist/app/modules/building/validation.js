"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingZodValidation = void 0;
const zod_1 = require("zod");
const createBuildingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title  is required'
        }),
    })
});
const updateBuildingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional()
    })
});
exports.BuildingZodValidation = {
    createBuildingZodSchema,
    updateBuildingZodSchema
};
