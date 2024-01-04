"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const controller_1 = require("./controller");
const validation_1 = require("./validation");
const router = (0, express_1.default)();
router.get('/single-faculty/:id', controller_1.facultyController.singleFaculty);
router.post('/assign-to-course/:facultyId', (0, validateRequest_1.default)(validation_1.FacultyZodValidation.CourseOrFacultyZodSchema), controller_1.facultyController.facultyAssignToCourse);
router.delete('/delete-assigned-faculty/:facultyId', (0, validateRequest_1.default)(validation_1.FacultyZodValidation.CourseOrFacultyZodSchema), controller_1.facultyController.deleteAssignedfaculty);
router.put('/update-faculty/:id', (0, validateRequest_1.default)(validation_1.FacultyZodValidation.updateFacultyZodSchema), controller_1.facultyController.updateFaculty);
router.delete('/delete-faculty/:id', controller_1.facultyController.deleteFaculty);
router.post('/create', (0, validateRequest_1.default)(validation_1.FacultyZodValidation.createFacultyZodSchema), controller_1.facultyController.createFaculty);
router.get('/all-faculties', controller_1.facultyController.allFaculties);
exports.default = router;
