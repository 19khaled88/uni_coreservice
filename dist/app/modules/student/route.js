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
router.get('/single-building/:id', controller_1.studentController.singleStudent);
router.put('/update-building/:id', (0, validateRequest_1.default)(validation_1.StudentZodValidation.updateStudentZodSchema), controller_1.studentController.updateStudent);
router.delete('/delete-building/:id', controller_1.studentController.deleteStudent);
router.post('/create', (0, validateRequest_1.default)(validation_1.StudentZodValidation.createStudentZodSchema), controller_1.studentController.createStudent);
router.get('/all-buildings', controller_1.studentController.allStudents);
exports.default = router;
