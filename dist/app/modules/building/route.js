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
router.get('/single-building/:id', controller_1.buildingController.singleBuilding);
router.put('/update-building/:id', (0, validateRequest_1.default)(validation_1.BuildingZodValidation.updateBuildingZodSchema), controller_1.buildingController.updateBuilding);
router.delete('/delete-building/:id', controller_1.buildingController.deleteBuilding);
router.post('/create', (0, validateRequest_1.default)(validation_1.BuildingZodValidation.createBuildingZodSchema), controller_1.buildingController.createBuilding);
router.get('/all-buildings', controller_1.buildingController.allBuildings);
exports.default = router;
