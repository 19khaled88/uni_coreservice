import { z } from "zod";

const createZodValidation = z.object({
  body: z.object({
    startTime: z.string({ required_error: "Start date is required" }),
    endTime: z.string({
      required_error: "End date id required",
    }),
    dayOfWeek: z.enum(
      [
        "SATURDAY",
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
      ] as [string, ...string[]],
      { required_error: "day of week must be required" }
    ),
    offeredCourseSectionId: z.string({
      required_error: "offered course id is required",
    }),
    semesterRegistrationId: z.string({
      required_error: "Semester registration id is required",
    }),
    roomId: z.string({
      required_error: "Room id is required",
    }),
    facultyId: z.string({
      required_error: "Faculty id is required",
    }),
  }),
});

export const ClassScheduleZodValidation = {
  createZodValidation,
};
