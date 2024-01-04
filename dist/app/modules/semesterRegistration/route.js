"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const validation_1 = require("./validation");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const router = express_1.default.Router();
router.patch('/update-registered-semesters/:id', controller_1.semesterRegisterController.updateRegisteredSemester);
router.delete('/delete-registered-semesters/:id', controller_1.semesterRegisterController.deleteRegisteredSemester);
router.post('/register', (0, validateRequest_1.default)(validation_1.RegisterSemesterZodValidation.createSemesterZodSchema), controller_1.semesterRegisterController.registerSemester);
router.get('/all-registered-semesters', controller_1.semesterRegisterController.allRegisteredSemester);
exports.default = router;
