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
router.get('/single/:id', controller_1.offeredCourseController.offeredCourse);
router.patch('/update/:id', controller_1.offeredCourseController.offeredCourseUpdate);
router.delete('/delete/:id', controller_1.offeredCourseController.offeredCourseDelete);
router.post('/create', (0, validateRequest_1.default)(validation_1.OfferedCourseZodValidation.createZodValidation), controller_1.offeredCourseController.insertOfferedCourse);
router.get('/all', controller_1.offeredCourseController.offeredCourses);
exports.default = router;
