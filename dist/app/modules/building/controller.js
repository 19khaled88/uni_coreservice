"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildingController = void 0;
const constants_1 = require("../../../shared/constants");
const pick_1 = __importDefault(require("../../../shared/pick"));
const service_1 = require("./service");
const constants_2 = require("./constants");
const http_status_1 = __importDefault(require("http-status"));
const createBuilding = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.buildingService.createBuilding(req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Successfully created building',
            result: response,
        });
        // next()
    }
    catch (error) {
        next(error);
    }
});
const allBuildings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paginationRes = (0, pick_1.default)(req.query, constants_1.paginationFields);
        const filter = (0, pick_1.default)(req.query, constants_2.filterFields);
        const response = yield service_1.buildingService.allBuildings(paginationRes, filter);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Successfully Retrieved building',
            meta: response === null || response === void 0 ? void 0 : response.meta,
            result: response === null || response === void 0 ? void 0 : response.data,
        });
        // next()
    }
    catch (error) {
        next(error);
    }
});
const singleBuilding = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.buildingService.singleBuilding(req.params.id);
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Single building retrieved',
                data: response,
            });
        }
        res.status(http_status_1.default.NOT_FOUND).json({
            success: false,
            message: 'Data not found',
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateBuilding = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.buildingService.updateBuilding(req.params.id, req.body);
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'building updated successfully for given ID',
                data: response,
            });
        }
        res.status(http_status_1.default.NOT_FOUND).json({
            success: false,
            message: 'Building not updated!!',
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteBuilding = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.buildingService.deleteBuilding(req.params.id);
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Building deleted successfully for given ID',
                data: response,
            });
        }
        else {
            res.status(http_status_1.default.NOT_FOUND).json({
                success: false,
                message: 'Building not deleted',
                data: null,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.buildingController = {
    createBuilding,
    allBuildings,
    singleBuilding,
    updateBuilding,
    deleteBuilding,
};
