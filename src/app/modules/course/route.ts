import express from "express";
import { courseController } from "./controller";
import validateRequest from "../../middleware/validateRequest";
import { CourseZodValidation } from "./validation";
const router = express.Router();

router.post(
  "/assign-to-faculty/:courseId",
  validateRequest(CourseZodValidation.CourseOrFacultyZodSchema),
  courseController.courseAssignToFaculty
);
router.delete(
  "/delete-assigned-course/:courseId",
  validateRequest(CourseZodValidation.CourseOrFacultyZodSchema),
  courseController.deleteAssignedCourse
);
router.post(
  "/create",
  validateRequest(CourseZodValidation.CreateCourseZodSchema),
  courseController.createCourse
);

export default router;
