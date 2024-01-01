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
router.get('/single-faculty/:id', controller_1.academicFacultyController.singleFaculty);
router.put('/update-faculty/:id', (0, validateRequest_1.default)(validation_1.AcademicFacultyZodValidation.updateFacultyZodSchema), controller_1.academicFacultyController.updateFaculty);
router.delete('/delete-faculty/:id', controller_1.academicFacultyController.deleteFaculty);
router.post('/create-ac-faculty', (0, validateRequest_1.default)(validation_1.AcademicFacultyZodValidation.createFacultyZodSchema), controller_1.academicFacultyController.createAcademicFaculty);
router.get('/all-faculties', controller_1.academicFacultyController.allFaculties);
exports.default = router;
