import { z } from "zod";

const createZodValidation = z.object({
  body: z.object({
    sectionName: z.string({ required_error: "Course id is required" }),
    offeredCourseId: z.string({
      required_error: "offiered course id required",
    }),
    maxCapacity: z.number({ required_error: "maximum capacity required" }),
  }),
});

export const OfferedCourseSectionZodValidation = {
  createZodValidation,
};
