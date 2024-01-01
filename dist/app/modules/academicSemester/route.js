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
router.get('/single-semester/:id', controller_1.academicSemesterController.singleSemester);
router.put('/update-semester/:id', (0, validateRequest_1.default)(validation_1.AcademicSemesterZodValidation.updateSemesterZodSchema), controller_1.academicSemesterController.updateSemester);
router.delete('/delete-semester/:id', controller_1.academicSemesterController.deleteSemester);
router.post('/create', (0, validateRequest_1.default)(validation_1.AcademicSemesterZodValidation.createSemesterZodSchema), controller_1.academicSemesterController.createAcademicSememster);
router.get('/all-semesters', controller_1.academicSemesterController.allSemesters);
exports.default = router;
