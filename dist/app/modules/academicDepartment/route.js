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
router.get('/single-department/:id', controller_1.academicDepartmentController.singleDepartment);
router.put('/update-department/:id', (0, validateRequest_1.default)(validation_1.AcademicDepartmentZodValidation.updateDepartmentZodSchema), controller_1.academicDepartmentController.updateDepartment);
router.delete('/delete-department/:id', controller_1.academicDepartmentController.deleteDepartment);
router.post('/create-ac-department', (0, validateRequest_1.default)(validation_1.AcademicDepartmentZodValidation.createDepartmentZodSchema), controller_1.academicDepartmentController.createAcademicDepartment);
router.get('/all-departments', controller_1.academicDepartmentController.allDepartments);
exports.default = router;
