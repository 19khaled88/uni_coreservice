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
router.get("/single/:id", controller_1.offeredCourseSectionController.offeredCourseSection);
router.delete("/delete/:id", controller_1.offeredCourseSectionController.offeredCourseSectionDelete);
router.patch("/update/:id", controller_1.offeredCourseSectionController.offeredCourseSectionUpdate);
router.post("/create", (0, validateRequest_1.default)(validation_1.OfferedCourseSectionZodValidation.createZodValidation), controller_1.offeredCourseSectionController.create);
router.get("/all", controller_1.offeredCourseSectionController.offeredCourseSections);
exports.default = router;
