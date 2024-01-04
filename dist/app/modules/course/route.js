"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const validation_1 = require("./validation");
const router = express_1.default.Router();
router.post("/assign-to-faculty/:courseId", (0, validateRequest_1.default)(validation_1.CourseZodValidation.CourseOrFacultyZodSchema), controller_1.courseController.courseAssignToFaculty);
router.delete("/delete-assigned-course/:courseId", (0, validateRequest_1.default)(validation_1.CourseZodValidation.CourseOrFacultyZodSchema), controller_1.courseController.deleteAssignedCourse);
router.post("/create", (0, validateRequest_1.default)(validation_1.CourseZodValidation.CreateCourseZodSchema), controller_1.courseController.createCourse);
exports.default = router;
